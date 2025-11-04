from django.urls import include, path

app_name = "ip_aggregator"

urlpatterns = [
    path("api/", include("ip_aggregator.API.urls_api")),
]
