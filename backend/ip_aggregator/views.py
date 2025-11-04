from __future__ import annotations

import itertools
from ipaddress import IPv4Network, IPv6Network, collapse_addresses
from typing import Iterable, List, Union

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .API.serializers import IPAggregatorSerializer

Network = Union[IPv4Network, IPv6Network]


def _summarize_network(network: Network) -> dict:
    summary = {
        "cidr": str(network),
        "network_address": str(network.network_address),
        "broadcast_address": str(network.broadcast_address),
        "netmask": str(network.netmask),
        "hostmask": str(network.hostmask),
        "num_addresses": network.num_addresses,
    }

    usable_hosts = network.num_addresses
    if network.num_addresses > 2:
        # IPv6 exposes the same arithmetic helpers, so we can treat both families equally.
        first_host = network.network_address + 1
        last_host = network.broadcast_address - 1
        summary["first_host"] = str(first_host)
        summary["last_host"] = str(last_host)
        usable_hosts = network.num_addresses - 2
    elif network.num_addresses == 2:
        summary["first_host"] = str(network.network_address)
        summary["last_host"] = str(network.broadcast_address)
    summary["usable_hosts"] = usable_hosts
    return summary


def _format_network(network: Network, output_format: str) -> dict | str:
    summary = _summarize_network(network)

    if output_format == "cidr":
        return summary["cidr"]
    if output_format == "mask":
        return {
            "cidr": summary["cidr"],
            "netmask": summary["netmask"],
            "hostmask": summary["hostmask"],
        }
    if output_format == "range":
        return {
            "cidr": summary["cidr"],
            "start": summary.get("first_host", summary["network_address"]),
            "end": summary.get("last_host", summary["broadcast_address"]),
        }
    if output_format == "b-n":
        return {
            "cidr": summary["cidr"],
            "network": summary["network_address"],
            "broadcast": summary["broadcast_address"],
        }
    if output_format == "hta":
        hosts_preview = [str(host) for host in itertools.islice(network.hosts(), 10)]
        preview_only = summary["usable_hosts"] > len(hosts_preview)
        result = {
            "cidr": summary["cidr"],
            "total_hosts": summary["usable_hosts"],
            "hosts_preview": hosts_preview,
            "preview_only": preview_only,
        }
        if preview_only:
            result["first_host"] = summary.get("first_host")
            result["last_host"] = summary.get("last_host")
        return result
    if output_format == "zbb":
        width = network.max_prefixlen
        return {
            "cidr": summary["cidr"],
            "network_binary": format(int(network.network_address), f"0{width}b"),
            "broadcast_binary": format(int(network.broadcast_address), f"0{width}b"),
            "netmask_binary": format(int(network.netmask), f"0{width}b"),
        }
    return summary["cidr"]


def _build_response(validated_data: dict) -> dict:
    networks: Iterable[Network] = validated_data["ip_addresses"]
    aggregated: List[Network] = list(collapse_addresses(networks))
    output_format = validated_data["output_format"]

    response: dict = {
        "output_format": output_format,
        "total_networks": len(aggregated),
        "formatted_results": [_format_network(network, output_format) for network in aggregated],
        "aggregated_networks": [_summarize_network(network) for network in aggregated],
    }

    if validated_data.get("why_blocked"):
        response["why_blocked"] = validated_data["why_blocked"]
    if validated_data.get("asn_code"):
        response["asn_code"] = validated_data["asn_code"]

    return response


class IPAggregatorView(APIView):
    """Handle POST requests for aggregating IP address data."""

    def post(self, request, *args, **kwargs):
        serializer = IPAggregatorSerializer(data=request.data)
        if serializer.is_valid():
            return Response(_build_response(serializer.validated_data), status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IPAddressListView(APIView):
    """Return aggregated information for IP addresses supplied via query parameters."""

    def get(self, request, *args, **kwargs):
        ip_addresses = request.query_params.get("ip_addresses")
        if not ip_addresses:
            return Response(
                {
                    "output_format": request.query_params.get("output_format", "cidr"),
                    "total_networks": 0,
                    "formatted_results": [],
                    "aggregated_networks": [],
                    "message": "Provide the 'ip_addresses' query parameter to aggregate data.",
                },
                status=status.HTTP_200_OK,
            )

        payload = {
            "ip_addresses": ip_addresses,
            "output_format": request.query_params.get("output_format", "cidr"),
        }
        if "why_blocked" in request.query_params:
            payload["why_blocked"] = request.query_params["why_blocked"]
        if "asn_code" in request.query_params:
            payload["asn_code"] = request.query_params["asn_code"]

        serializer = IPAggregatorSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        return Response(_build_response(serializer.validated_data), status=status.HTTP_200_OK)
