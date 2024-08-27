# pretrain/urls.py
from django.urls import path
from .views import get_llm_response

urlpatterns = [
    path('get-llm-response/', get_llm_response, name='get_llm_response'),
   
]
