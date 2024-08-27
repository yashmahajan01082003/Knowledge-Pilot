from django.urls import path
from .views import upload_markdown_and_create_dataset, download_arrow_file

urlpatterns = [
    path('upload/', upload_markdown_and_create_dataset, name='upload_markdown_and_create_dataset'),
    path('download/<str:dataset_name>/', download_arrow_file, name='download_arrow_file'),
]
