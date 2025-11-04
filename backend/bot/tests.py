import os
import tempfile
from types import SimpleNamespace
from unittest import mock

from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class ChatBotViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("bot:chat")

    def test_missing_api_key_returns_service_unavailable(self):
        response = self.client.post(self.url, {"message": "Hello"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)
        self.assertIn("detail", response.data)

    @mock.patch("bot.views.OpenAI")
    def test_successful_chat_response(self, mock_openai):
        assistant_response = "Hello from the assistant"
        mock_completion = SimpleNamespace(
            choices=[SimpleNamespace(message=SimpleNamespace(content=assistant_response))]
        )
        mock_openai.return_value.chat.completions.create.return_value = mock_completion

        with tempfile.NamedTemporaryFile("w", delete=False) as tmp:
            tmp.write("Name: Test User")
            info_path = tmp.name

        try:
            with override_settings(
                OPENAI_API_KEY="test",
                OPENAI_MODEL="gpt-test",
                BOT_PERSONAL_INFO_FILE=info_path,
            ):
                response = self.client.post(
                    self.url,
                    {"message": "Hi", "history": [{"role": "system", "content": "You are helpful."}]},
                    format="json",
                )
        finally:
            os.unlink(info_path)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["reply"], assistant_response)
        self.assertEqual(response.data["model"], "gpt-test")
        self.assertEqual(len(response.data["messages"]), 4)
        self.assertEqual(response.data["messages"][0]["role"], "system")
        self.assertIn("Name: Test User", response.data["messages"][0]["content"])
        mock_openai.assert_called_once_with(api_key="test")
        mock_openai.return_value.chat.completions.create.assert_called_once()

    @mock.patch("bot.views.OpenAI")
    def test_missing_personal_info_file_is_ignored(self, mock_openai):
        assistant_response = "Response"
        mock_completion = SimpleNamespace(
            choices=[SimpleNamespace(message=SimpleNamespace(content=assistant_response))]
        )
        mock_openai.return_value.chat.completions.create.return_value = mock_completion

        with override_settings(
            OPENAI_API_KEY="test",
            OPENAI_MODEL="gpt-test",
            BOT_PERSONAL_INFO_FILE="/tmp/does-not-exist.txt",
        ):
            response = self.client.post(
                self.url,
                {"message": "Hi"},
                format="json",
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["messages"]), 2)
        self.assertEqual(response.data["messages"][0]["role"], "user")