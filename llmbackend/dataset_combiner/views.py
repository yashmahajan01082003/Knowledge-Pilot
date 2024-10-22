import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datasets import load_from_disk, concatenate_datasets

@api_view(['POST'])
def combine_datasets_api(request):
    base_directory = request.data.get('base_directory')
    
    pretraining_dataset_dir = os.path.join(base_directory, "pretrainingdataset")
    
    if not os.path.exists(pretraining_dataset_dir):
        return Response({"error": f"No 'pretrainingdataset' folder found in {base_directory}"}, status=400)
    
    datasets = []
    for dataset_name in os.listdir(pretraining_dataset_dir):
        dataset_path = os.path.join(pretraining_dataset_dir, dataset_name)
        if os.path.isdir(dataset_path):
            try:
                dataset = load_from_disk(dataset_path)
                datasets.append(dataset)
            except Exception as e:
                return Response({"error": f"Failed to load dataset from {dataset_path}: {str(e)}"}, status=500)
    
    if len(datasets) == 0:
        return Response({"error": "No datasets found to combine."}, status=400)

    combined_dataset = concatenate_datasets(datasets)
    
    combined_set_directory = os.path.join(base_directory, 'combinedSet')
    os.makedirs(combined_set_directory, exist_ok=True)
    output_file = os.path.join(combined_set_directory, 'combined_dataset')
    
    combined_dataset.save_to_disk(output_file)
    
    return Response({"message": "Datasets combined successfully.", "output_path": output_file})
