from django.urls import path

from ip_aggregator.views import IPAddressListView, IPAggregatorView

urlpatterns = [
    path("ipaggregator/", IPAggregatorView.as_view(), name="ip-aggregator"),
    path("ipaddresses/", IPAddressListView.as_view(), name="ip-address-list"),
]
