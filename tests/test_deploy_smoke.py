"""Mocked smoke checks for deploy.sh; run with: python3 tests/test_deploy_smoke.py."""

import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class DeploySmokeTest(unittest.TestCase):
    def run_deploy(self, curl_code="200", dirty=False, backup=True):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        work = Path(temp.name)
        project = work / "project"
        mocks = work / "bin"
        project.mkdir()
        mocks.mkdir()
        (project / "backend/frontend_dist").mkdir(parents=True)
        if backup:
            (project / "backend/db.sqlite3").write_text("test")
        (project / "backend/frontend_dist/index.html").write_text(
            '<script src="/static/assets/index-test.js"></script>'
        )
        if backup:
            (project / ".env").write_text("DJANGO_SECRET_KEY=test\n")
        shutil.copy(ROOT / "deploy.sh", project / "deploy.sh")

        scripts = {
            "docker": """#!/usr/bin/env bash
printf '%s\\n' "$*" >> "$DEPLOY_TEST_LOG"
if [[ "$1 $2" == "compose version" ]]; then exit 0; fi
if [[ "$1" == "inspect" ]]; then
  [[ "$*" == *com.docker.compose.service* ]] && printf 'backend\\n' || printf 'gunicorn\\n'
fi
""",
            "git": """#!/usr/bin/env bash
case "$1" in
  rev-parse) printf 'old-sha\\n' ;;
  log) printf 'old-sha current\\n' ;;
  rev-list) printf '0\\n' ;;
  status) [[ -n "${DEPLOY_TEST_DIRTY:-}" ]] && printf ' M backend/app.py\\n' ;;
  fetch|merge) ;;
esac
""",
            "df": """#!/usr/bin/env bash
printf 'Filesystem 1024-blocks Used Available Capacity Mounted on\\n/dev/mock 1 1 1000000 1%% /\\n'
""",
            "curl": """#!/usr/bin/env bash
if [[ "$*" == *'%{http_code}'* ]]; then
  printf '%s\\n' "${DEPLOY_TEST_CURL_CODE:-200}"
else
  printf '<script src="/static/assets/index-test.js"></script>\\n'
fi
""",
            "sleep": "#!/usr/bin/env bash\n:\n",
        }
        for name, content in scripts.items():
            path = mocks / name
            path.write_text(content)
            path.chmod(0o755)

        log = work / "commands.log"
        env = os.environ | {
            "PATH": f"{mocks}:{os.environ['PATH']}",
            "PROJECT_ROOT": str(project),
            "BACKUP_DIR": str(work / "backups"),
            "DEPLOY_TEST_LOG": str(log),
            "DEPLOY_TEST_CURL_CODE": curl_code,
            "DEPLOY_TEST_DIRTY": "1" if dirty else "",
            "HEALTH_RETRIES": "1",
            "HEALTH_DELAY": "0",
        }
        result = subprocess.run(
            ["bash", str(project / "deploy.sh")], text=True, capture_output=True, env=env
        )
        return result, log.read_text()

    def test_retry_builds_before_one_off_tasks_and_recreates(self):
        result, commands = self.run_deploy()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("already up to date - continuing deployment", result.stdout)
        self.assertLess(commands.index("compose build backend"), commands.index("migrate --noinput"))
        self.assertLess(commands.index("migrate --noinput"), commands.index("collectstatic --noinput"))
        self.assertLess(commands.index("collectstatic --noinput"), commands.index("compose up -d --no-deps --force-recreate backend"))

    def test_health_die_prints_single_updated_rollback_command(self):
        result, _ = self.run_deploy("500")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(result.stderr.count("!! Deploy failed"), 1, result.stderr)
        self.assertIn("docker compose up -d --build --force-recreate --no-deps backend", result.stderr)

    def test_retry_refuses_dirty_bind_mounted_source(self):
        result, commands = self.run_deploy(dirty=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Working tree is dirty", result.stderr)
        self.assertNotIn("compose build backend", commands)

    def test_retry_without_a_backup_succeeds(self):
        result, _ = self.run_deploy(backup=False)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("0 backup(s) retained", result.stdout)


if __name__ == "__main__":
    unittest.main()
