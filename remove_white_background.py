#!/usr/bin/env python3
"""
Script to remove white backgrounds from images and save as PNG with transparency
"""

import os
from PIL import Image, ImageDraw
import sys

def remove_white_background(input_path, output_path):
    """
    Remove white background from an image and save as PNG with transparency
    """
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Create a new transparent image
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # If pixel is white or near-white, make it transparent
            if item[0] > 200 and item[1] > 200 and item[2] > 200:
                new_data.append((255, 255, 255, 0))  # Transparent
            else:
                new_data.append(item)
        
        # Create new image with transparent background
        new_img = Image.new('RGBA', img.size, (255, 255, 255, 0))
        new_img.putdata(new_data)
        
        # Save as PNG
        new_img.save(output_path, 'PNG')
        print(f"Processed: {input_path} -> {output_path}")
        return True
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False

def main():
    star_folder = "/Users/sophiehuth/mysite/static/star folder"
    output_folder = "/Users/sophiehuth/mysite/static/star_transparent"
    
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Process all JPG files in the star folder
    processed_count = 0
    for filename in os.listdir(star_folder):
        if filename.lower().endswith(('.jpg', '.jpeg')):
            input_path = os.path.join(star_folder, filename)
            # Change extension to .png for output
            output_filename = os.path.splitext(filename)[0] + '.png'
            output_path = os.path.join(output_folder, output_filename)
            
            if remove_white_background(input_path, output_path):
                processed_count += 1
    
    print(f"\nDone! Processed {processed_count} images.")
    print(f"Transparent images saved to: {output_folder}")
    
    # Update the sandbox.html file to use the new transparent images
    update_sandbox_html(output_folder)

def update_sandbox_html(transparent_folder):
    sandbox_file = "/Users/sophiehuth/mysite/sandbox.html"
    
    try:
        with open(sandbox_file, 'r') as f:
            content = f.read()
        
        # Replace all star folder image paths with transparent versions
        content = content.replace('static/star folder/', 'static/star_transparent/')
        content = content.replace('.jpg', '.png')
        
        with open(sandbox_file, 'w') as f:
            f.write(content)
        
        print(f"Updated {sandbox_file} to use transparent images")
    except Exception as e:
        print(f"Error updating sandbox.html: {e}")

if __name__ == "__main__":
    main()
