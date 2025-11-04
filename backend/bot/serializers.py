from rest_framework import serializers


class MessageSerializer(serializers.Serializer):
    role = serializers.CharField()
    content = serializers.CharField()


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField()
    history = serializers.ListField(
        child=MessageSerializer(),
        required=False,
        allow_empty=True,
    )

    def validate_history(self, value):
        sanitized = []
        for item in value:
            role = item.get("role", "").strip() or "user"
            content = item.get("content", "")
            if not isinstance(content, str):
                raise serializers.ValidationError("Each history entry must include a string content field.")
            sanitized.append({"role": role, "content": content})
        return sanitized