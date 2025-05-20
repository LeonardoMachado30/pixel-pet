from PIL import Image
import os
import shutil

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def process_sprite(input_file, output_dir, frame_width, frame_height, num_frames):
    ensure_dir(output_dir)
    
    # Open the sprite sheet
    with Image.open(input_file) as img:
        # Process each frame
        for i in range(num_frames):
            # Calculate the position of the frame
            left = i * frame_width
            # Crop the frame
            frame = img.crop((left, 0, left + frame_width, frame_height))
            # Save the frame
            frame.save(os.path.join(output_dir, f'frame{i + 1}.png'))

def main():
    # Get the base directory
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(base_dir, 'src', 'assets')
    cat_dir = os.path.join(assets_dir, 'cat')
    
    # Clean up existing frames
    for dir_name in ['running', 'scratching', 'sleeping', 'wall-scratching']:
        dir_path = os.path.join(cat_dir, dir_name)
        if os.path.exists(dir_path):
            shutil.rmtree(dir_path)
    
    if os.path.exists(os.path.join(cat_dir, 'stop.png')):
        os.remove(os.path.join(cat_dir, 'stop.png'))
    
    # Create directories
    for dir_name in ['running', 'scratching', 'sleeping', 'wall-scratching']:
        ensure_dir(os.path.join(cat_dir, dir_name))
    
    # Process running animation (138x100, 2 frames)
    process_sprite(
        os.path.join(assets_dir, 'cat-running.png'),
        os.path.join(cat_dir, 'running'),
        138, 100, 2
    )
    
    # Process scratching animation (97x100, 2 frames)
    process_sprite(
        os.path.join(assets_dir, 'cat-scratch.png'),
        os.path.join(cat_dir, 'scratching'),
        97, 100, 2
    )
    
    # Process sleeping animation (150x100, 2 frames)
    process_sprite(
        os.path.join(assets_dir, 'cat-sleeping.png'),
        os.path.join(cat_dir, 'sleeping'),
        150, 100, 2
    )
    
    # Process wall-scratching animation (150x165, 2 frames)
    process_sprite(
        os.path.join(assets_dir, 'wall-scratching.png'),
        os.path.join(cat_dir, 'wall-scratching'),
        150, 165, 2
    )
    
    # Copy stop frame
    shutil.copy2(
        os.path.join(assets_dir, 'cat-stop.png'),
        os.path.join(cat_dir, 'stop.png')
    )
    
    print('Sprite processing completed successfully!')

if __name__ == '__main__':
    main() 