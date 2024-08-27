from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import subprocess

def fine_tune_view(request):
    if request.method == "POST" and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        
        # Save the uploaded file
        file_path = default_storage.save('uploaded_files/' + uploaded_file.name, ContentFile(uploaded_file.read()))
        file_path = os.path.join(settings.MEDIA_ROOT, file_path)
        
        # Path to your fine-tuning script
        fine_tune_script = os.path.join(settings.BASE_DIR, 'fine_tuning', 'fine_tune_model.py')

        # Execute the fine-tuning script with the uploaded file
        result = subprocess.run(
            ['python', fine_tune_script, file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Clean up uploaded file
        os.remove(file_path)
        
        # Check if the script executed successfully
        if result.returncode == 0:
            return JsonResponse({"message": "Model fine-tuned successfully!"})
        else:
            return JsonResponse({"error": result.stderr}, status=500)
    
    return JsonResponse({"error": "Invalid request method or file not provided"}, status=400)
