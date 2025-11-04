from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path('ip_aggregator/', include('ip_aggregator.urls', namespace='ip_aggregator')),
    path('privnote/', include('privnote.urls', namespace='privnote')),
    path('shortener/', include('shortener.urls', namespace='shortener')),
]

