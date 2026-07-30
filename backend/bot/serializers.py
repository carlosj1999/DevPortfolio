from rest_framework import serializers

# Caps keep a single request from ballooning the OpenAI bill.
MAX_MESSAGE_LENGTH = 2000
MAX_CONTENT_LENGTH = 4000
MAX_HISTORY_ENTRIES = 20

ALLOWED_ROLES = {"user", "assistant"}


class MessageSerializer(serializers.Serializer):
    role = serializers.CharField(max_length=32)
    content = serializers.CharField(max_length=MAX_CONTENT_LENGTH)


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=MAX_MESSAGE_LENGTH)
    history = serializers.ListField(
        child=MessageSerializer(),
        required=False,
        allow_empty=True,
        max_length=MAX_HISTORY_ENTRIES,
    )

    def validate_history(self, value):
        sanitized = []
        for item in value:
            role = item.get("role", "").strip().lower() or "user"
            # Never let a caller inject their own system prompt.
            if role not in ALLOWED_ROLES:
                role = "user"
            content = item.get("content", "")
            if not isinstance(content, str):
                raise serializers.ValidationError("Each history entry must include a string content field.")
            sanitized.append({"role": role, "content": content})
        return sanitized
