from django.urls import path
from .views import combine_datasets_api

urlpatterns = [
    path('dataset_combiner/', combine_datasets_api, name='combine_datasets_api'),
]
