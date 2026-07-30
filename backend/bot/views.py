import logging
from pathlib import Path

from django.conf import settings
from django.utils.translation import gettext_lazy as _
from openai import APIConnectionError, APIError, AuthenticationError, OpenAI, RateLimitError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .serializers import ChatRequestSerializer

logger = logging.getLogger(__name__)

# Bounds the cost of any single reply.
MAX_REPLY_TOKENS = 600


class ChatBotThrottle(AnonRateThrottle):
    """Rate limit the public chat endpoint so it can't be used to burn API credits."""

    scope = "chatbot"


class ChatBotView(APIView):
    """Proxy chat requests to the configured OpenAI model."""

    authentication_classes = []
    permission_classes = []
    throttle_classes = [ChatBotThrottle]

    def post(self, request, *args, **kwargs):
        serializer = ChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data

        if not settings.OPENAI_API_KEY:
            return Response(
                {"detail": _("OpenAI API key is not configured.")},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        messages = []

        personal_info = self._load_personal_info()
        if personal_info:
            messages.append(
                {
                    "role": "system",
                    "content": (
                        "You are an assistant for Carlos's portfolio site.\n"
                        "Use the personal profile below to answer questions about him.\n"
                        "RULES:\n"
                        "- Always write answers in plain text only. Do NOT use Markdown formatting like **bold**, or headings (#).\n"
                        "- Keep answers concise: at most a short paragraph or a few list items.\n"
                        "- When you list several items, put each one on its own line separated by a newline character.\n"
                        "- Separate paragraphs with a blank line so the answer is easy to scan.\n"
                        "- When listing skills, write them as simple sentences or comma-separated lists.\n"
                        "- Fix any grammar in the user's question, but answer with correct, natural English.\n"
                        "- When referencing URLs from the profile, present them as plain text "
                        "  (for example, 'GitHub: https://github.com/carlosj1999').\n\n"
                        "PERSONAL PROFILE:\n"
                        f"{personal_info}"
                    ),
                }
            )

        messages.extend(list(validated.get("history", [])))
        messages.append({"role": "user", "content": validated["message"]})

        try:
            completion = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=messages,
                max_tokens=MAX_REPLY_TOKENS,
                timeout=30,
            )
        except AuthenticationError:
            return Response(
                {"detail": _("Authentication with OpenAI failed. Please verify the API key.")},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except RateLimitError:
            return Response(
                {"detail": _("OpenAI rate limit reached. Please try again soon.")},
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )
        except (APIConnectionError, APIError) as exc:
            # Log the detail server-side; don't expose internals to the caller.
            logger.exception("OpenAI request failed: %s", exc)
            return Response(
                {"detail": _("Communication with OpenAI failed.")},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        choice = completion.choices[0]
        assistant_message = getattr(choice, "message", None)
        reply = getattr(assistant_message, "content", "") if assistant_message else ""

        # Only the reply goes back — `messages` holds the system prompt and profile.
        return Response({"reply": reply}, status=status.HTTP_200_OK)

    @staticmethod
    def _load_personal_info() -> str:
        """Load the personal profile content from the configured file, if available."""

        info_file = getattr(settings, "BOT_PERSONAL_INFO_FILE", "")
        if not info_file:
            return ""

        try:
            path = Path(info_file)
        except TypeError:
            return ""

        try:
            if path.exists():
                return path.read_text(encoding="utf-8").strip()
        except OSError:
            return ""

        return ""