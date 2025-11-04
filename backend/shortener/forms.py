from typing import Any
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomSignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']  # Username and password fields only

    def __init__(self, *args, **kwargs):
        super(CustomSignupForm, self).__init__(*args, **kwargs)
        # Ensure no other unwanted fields are added
        unwanted_fields = ['password_base_authentication', 'password_authentication_enabled']
        for field in unwanted_fields:
            if field in self.fields:
                del self.fields[field]