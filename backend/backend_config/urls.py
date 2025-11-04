from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html"), name="home"),
    path("admin/", admin.site.urls),
    path('ip_aggregator/', include('ip_aggregator.urls', namespace='ip_aggregator')),
    path('privnote/', include('privnote.urls', namespace='privnote')),
    path('shortener/', include('shortener.urls', namespace='shortener')),
]

