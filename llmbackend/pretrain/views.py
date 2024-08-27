from django.shortcuts import render
import os
import requests
from django.http import JsonResponse
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

def get_llm_response(request):
    if request.method == "POST" and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        
        # Save the uploaded file
        file_path = default_storage.save('uploaded_files/' + uploaded_file.name, ContentFile(uploaded_file.read()))
        
        # Path to the saved file
        file_path = os.path.join(settings.MEDIA_ROOT, file_path)

        # Hugging Face API URL for pre-training
        url = "https://api-inference.huggingface.co/models/mp9991/1bitllmuploadd"

        # Headers including the API token
        headers = {
            "Authorization": f"Bearer {settings.HUGGINGFACE_API_TOKEN}"
            # Do not set Content-Type here; requests will handle it
        }

        # Open the file and prepare for the POST request
        with open(file_path, 'rb') as file:
            files = {'file': file}
            
            try:
                # Make the POST request to Hugging Face for pre-training
                response = requests.post(url, headers=headers, files=files)
                response.raise_for_status()  # Raise an exception for HTTP errors
                
                # Return the API response to the front-end
                return JsonResponse(response.json(), safe=False)
            except requests.RequestException as e:
                return JsonResponse({"error": str(e)}, status=500)

        # Clean up uploaded file
        os.remove(file_path)
        
    return JsonResponse({"error": "Invalid request method or file not provided"}, status=400)

