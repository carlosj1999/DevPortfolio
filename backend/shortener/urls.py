from django.urls import path
from shortener import views
from django.contrib.auth import views as auth_views

app_name = 'shortener'

urlpatterns = [
    path('', views.shorten_url, name='shorten_url'),
    path('user-links/', views.user_links, name='user_links'),
    path('login/', auth_views.LoginView.as_view(template_name="registration/login.html"), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', views.signup, name='signup'),
    path('<str:short_code>/', views.redirect_url, name='redirect_url'),
]
