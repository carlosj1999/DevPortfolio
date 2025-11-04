from django.urls import path

from .views import ChatBotView

app_name = "bot"

urlpatterns = [
    path("chat/", ChatBotView.as_view(), name="chat"),
]