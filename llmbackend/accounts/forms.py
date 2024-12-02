from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationfrom(UserCreationForm):
    model= CustomUser
    fields= ("email",)


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model=CustomUser
        fields=("email",)