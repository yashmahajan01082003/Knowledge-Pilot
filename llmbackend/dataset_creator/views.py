from django.shortcuts import render
import os
import re
import markdown
import pandas as pd
from datasets import Dataset, load_from_disk
from bs4 import BeautifulSoup
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import HttpResponse, Http404


def parse_markdown_file(file_path):
    """Read and parse a markdown file to extract plain text and split into data points."""
    with open(file_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
        sections = re.split(r'\n# ', md_text)
        
        data_points = []
        for section in sections:
            if section.strip():
                if not section.startswith('# '):
                    section = '# ' + section
                html = markdown.markdown(section)
                soup = BeautifulSoup(html, 'html.parser')
                text = soup.get_text()
                data_points.append({"text": text})
    
    return data_points

def create_dataset_from_markdown(file_path, output_file):
    """Create a pretraining dataset from a markdown file."""
    data_points = parse_markdown_file(file_path)
    dataset = Dataset.from_pandas(pd.DataFrame(data_points))
    dataset.save_to_disk(output_file)
    print(f"Dataset saved to {output_file}")

def load_dataset(output_file):
    """Load the dataset from the specified file."""
    dataset = load_from_disk(output_file)
    return dataset

@api_view(['POST'])
def upload_markdown_and_create_dataset(request):
    if 'markdown_file' not in request.FILES:
        return Response({"error": "No markdown file provided"}, status=400)

    markdown_file = request.FILES['markdown_file']
    file_name = os.path.splitext(markdown_file.name)[0]
    output_directory = 'pretrainingdataset'
    output_file = os.path.join(output_directory, file_name)

    # Ensure the output directory exists
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Save the uploaded Markdown file temporarily
    temp_md_file_path = os.path.join(output_directory, markdown_file.name)
    with open(temp_md_file_path, 'wb+') as temp_md_file:
        for chunk in markdown_file.chunks():
            temp_md_file.write(chunk)

    # Create the dataset from the Markdown file
    create_dataset_from_markdown(temp_md_file_path, output_file)

    # Clean up the temporary Markdown file
    os.remove(temp_md_file_path)

    return Response({"message": "Dataset created successfully", "dataset_name": file_name}, status=201)

@api_view(['GET'])
def download_arrow_file(request, dataset_name):
    dataset_directory = 'pretrainingdataset'
    folder_path = os.path.join(dataset_directory, dataset_name)
    
    # Check if folder exists
    if not os.path.isdir(folder_path):
        raise Http404("Dataset folder does not exist")
    
    # Find the .arrow file in the folder
    arrow_files = [f for f in os.listdir(folder_path) if f.endswith('.arrow')]
    
    if not arrow_files:
        raise Http404("No .arrow file found in the dataset folder")
    
    # Assume we want to serve the first .arrow file found
    arrow_file_name = arrow_files[0]
    arrow_file_path = os.path.join(folder_path, arrow_file_name)
    
    # Check if the .arrow file exists
    if not os.path.exists(arrow_file_path):
        raise Http404("Dataset .arrow file not found")
    
    # Open the .arrow file and prepare the response
    with open(arrow_file_path, 'rb') as arrow_file:
        response = HttpResponse(arrow_file.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{arrow_file_name}"'
        return response