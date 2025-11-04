from django.urls import include, path
from django.views.generic import TemplateView

app_name = "ip_aggregator"

urlpatterns = [
    path("", TemplateView.as_view(template_name="ip_aggregator/index.html"), name="index"),
    path("api/", include("ip_aggregator.API.urls_api")),
]
