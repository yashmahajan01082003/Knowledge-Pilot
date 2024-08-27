from django.urls import path
from .views import markdown_conversion

urlpatterns = [
    path('markdownconversion/', markdown_conversion, name='markdown-conversion'),
]
