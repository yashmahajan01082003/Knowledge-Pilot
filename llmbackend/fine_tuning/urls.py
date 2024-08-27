from django.urls import path
from .views import fine_tune_view

urlpatterns = [
    path('fine-tune/', fine_tune_view, name='fine_tune_model'),
]
