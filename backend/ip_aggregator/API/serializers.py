from rest_framework import serializers

class IPAggregatorSerializer(serializers.Serializer):
    ip_addresses = serializers.CharField()
    output_format = serializers.ChoiceField(choices=[
        ('cidr', 'CIDR'),
        ('mask', 'Mask'),
        ('range', 'Range'),
        ('b-n', 'B-N'),
        ('hta', 'HTA'),
        ('zbb', 'ZBB'),
    ])
    why_blocked = serializers.CharField(required=False)
    asn_code = serializers.CharField(required=False)
    
    def validate_ip_addresses(self, value):
        # Add validation for proper IP address format if necessary
        return value