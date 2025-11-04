import ipaddress
import re

from rest_framework import serializers


class IPAggregatorSerializer(serializers.Serializer):
    ip_addresses = serializers.CharField()
    output_format = serializers.ChoiceField(
        choices=[
            ("cidr", "CIDR"),
            ("mask", "Mask"),
            ("range", "Range"),
            ("b-n", "B-N"),
            ("hta", "HTA"),
            ("zbb", "ZBB"),
        ]
    )
    why_blocked = serializers.CharField(required=False, allow_blank=True)
    asn_code = serializers.CharField(required=False, allow_blank=True)

    def validate_ip_addresses(self, value: str):
        """Return the parsed IP networks supplied by the user."""

        tokens = [token for token in re.split(r"[\s,\n]+", value.strip()) if token]
        if not tokens:
            raise serializers.ValidationError("Provide at least one IP address or network.")

        networks = []
        errors = []
        for token in tokens:
            try:
                networks.append(ipaddress.ip_network(token, strict=False))
            except ValueError as exc:
                errors.append(f"{token}: {exc}")

        if errors:
            raise serializers.ValidationError("Invalid IP entries - " + "; ".join(errors))

        return networks
