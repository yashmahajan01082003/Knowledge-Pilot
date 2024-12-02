import uuid
from django.db import models
from django.conf import settings  # Import settings to access the CustomUser model
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email=models.EmailField(unique=True)
    profile_image = models.URLField(max_length=255, blank=True, null=True)
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]

    def __str__(self)-> str:
        return self.email

class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.user.username}"

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    role = models.CharField(max_length=50, choices=[('user', 'User'), ('assistant', 'Assistant')])
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role} - {self.timestamp}"
