from django.contrib import admin
from .models import *
from .forms import CustomUserChangeForm, CustomUserCreationfrom
from django.contrib.auth.admin import UserAdmin

@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationfrom
    form = CustomUserChangeForm

    model = CustomUser

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "created_at")
    search_fields = ("title", "user__username")

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("chat", "user", "role", "timestamp")
    search_fields = ("chat__title", "user__username", "content")