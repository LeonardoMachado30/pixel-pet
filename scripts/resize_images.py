from PIL import Image
import os

def resize_image(input_path, output_path, size):
    with Image.open(input_path) as img:
        resized_img = img.resize(size, Image.Resampling.LANCZOS)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        resized_img.save(output_path)

# Define the resizing operations
operations = [
    ('src/assets/cat/running/frame1.png', 'src/assets/cat/resized/running/frame1.png', (138, 100)),
    ('src/assets/cat/running/frame2.png', 'src/assets/cat/resized/running/frame2.png', (138, 100)),
    ('src/assets/cat/scratching/frame1.png', 'src/assets/cat/resized/scratching/frame1.png', (194, 200)),
    ('src/assets/cat/scratching/frame2.png', 'src/assets/cat/resized/scratching/frame2.png', (194, 200)),
    ('src/assets/cat/wall-scratching/frame1.png', 'src/assets/cat/resized/wall-scratching/frame1.png', (300, 330)),
    ('src/assets/cat/wall-scratching/frame2.png', 'src/assets/cat/resized/wall-scratching/frame2.png', (300, 330)),
    ('src/assets/cat/sleeping/frame1.png', 'src/assets/cat/resized/sleeping/frame1.png', (300, 200)),
    ('src/assets/cat/sleeping/frame2.png', 'src/assets/cat/resized/sleeping/frame2.png', (300, 200)),
    ('src/assets/cat/stop.png', 'src/assets/cat/resized/stop.png', (200, 240)),
    ('src/assets/cat/cat-alert.png', 'src/assets/cat/resized/cat-alert.png', (198, 220)),
]

# Process each image
for input_path, output_path, size in operations:
    try:
        resize_image(input_path, output_path, size)
        print(f"Resized {input_path} to {size}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}") 