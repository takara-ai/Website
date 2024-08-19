import logging
import os
import random
import time
from datasets import load_dataset
from tqdm import tqdm

def process_dataset(dataset_config, gallery_dir, base_dir):
    dataset_name = dataset_config['name']
    num_images = dataset_config['num_images']
    logging.info(f"Processing dataset: {dataset_name}, images to select: {num_images}")

    output_dir = os.path.join(gallery_dir, dataset_name)
    logging.info(f"Output directory: {output_dir}")
    
    if os.path.exists(output_dir):
        clear_directory(output_dir)
    else:
        os.makedirs(output_dir)
        logging.info(f"Created output directory: {output_dir}")

    logging.info(f"Loading dataset: {dataset_name}")
    start_time = time.time()
    dataset = load_dataset(dataset_name, revision="refs/convert/parquet", split="train", streaming=True)
    load_time = time.time() - start_time
    logging.info(f"Dataset {dataset_name} loaded in {load_time:.2f} seconds")
    
    buffer_size = min(num_images * 10, 1000)
    logging.info(f"Buffer size: {buffer_size}")
    buffer = []
    
    logging.info("Filling buffer with examples")
    start_time = time.time()
    for i, example in tqdm(enumerate(dataset), total=buffer_size, desc=f"Filling buffer for {dataset_name}"):
        if len(buffer) < buffer_size:
            buffer.append(example)
        else:
            if random.random() < buffer_size / (buffer_size + 1):
                replace_index = random.randint(0, buffer_size - 1)
                buffer[replace_index] = example
        
        if len(buffer) >= buffer_size:
            break
    
    buffer_time = time.time() - start_time
    logging.info(f"Buffer filled with {len(buffer)} examples in {buffer_time:.2f} seconds")
    
    logging.info(f"Selecting {num_images} images from buffer")
    selected_images = random.sample(buffer, min(num_images, len(buffer)))
    
    gallery_images = []
    for i, example in tqdm(enumerate(selected_images, 1), total=len(selected_images), desc=f"Processing images for {dataset_name}"):
        image_filename = f"{example['seed']}.png"
        image_path = os.path.join(output_dir, image_filename)
        example['image'].save(image_path)
        
        gallery_images.append({
            'image_url': f'/assets/images/gallery/{dataset_name}/{image_filename}',
            'positive_prompt': example['positive_prompt'],
        })
    
    logging.info(f"Processed {len(gallery_images)} images for {dataset_name}")
    return gallery_images

def clear_directory(directory):
    logging.info(f"Clearing directory: {directory}")
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            logging.error(f'Failed to delete {file_path}. Reason: {e}')
    logging.info(f"Cleared directory: {directory}")