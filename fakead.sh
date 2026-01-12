#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check for ImageMagick
if command -v magick &> /dev/null; then
    CMD="magick"
elif command -v convert &> /dev/null; then
    CMD="convert"
else
    echo "Error: ImageMagick (magick or convert) is not installed."
    exit 1
fi

show_help() {
    echo "Usage: $0 <input_file_or_dir> [output_file_or_dir]"
    echo ""
    echo "Examples:"
    echo "  Single file: $0 raw_duck.jpg cooked_duck.jpg"
    echo "  Directory:   $0 ./raw_images ./src/assets/"
    echo ""
    echo "Description:"
    echo "  Applies 'Deep Fried' effects to images for the FakeAd component."
    echo "  Target dimensions: 300x200 (matches FakeAd.astro)"
}

if [ -z "$1" ]; then
    show_help
    exit 1
fi

INPUT="$1"
OUTPUT="$2"

# Function to apply the effect
process_image() {
    local in_file="$1"
    local out_file="$2"

    echo -e "Fryin' ${GREEN}$in_file${NC} -> $out_file"

    $CMD "$in_file" \
      -resize 300x200^ \
      -gravity center -extent 300x200 \
      -modulate 150,200,100 \
      -colorspace RGB \
      -sigmoidal-contrast 5,0% \
      -sharpen 0x2 \
      -quality 40 \
      -posterize 6 \
      "$out_file"
}

# Check if input is directory
if [ -d "$INPUT" ]; then
    if [ -z "$OUTPUT" ]; then
        echo "Error: Output directory required when input is a directory."
        exit 1
    fi

    # Create output directory if it doesn't exist
    mkdir -p "$OUTPUT"

    # Find and process images
    find "$INPUT" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.avif" \) | while read -r img; do
        filename=$(basename "$img")
        name="${filename%.*}"
        # Convert to jpg for consistency, or keep extension? Let's use jpg for the 'fried' artifact look.
        process_image "$img" "$OUTPUT/${name}.jpg"
    done

# Check if input is a file
elif [ -f "$INPUT" ]; then
    if [ -z "$OUTPUT" ]; then
        echo "Error: Output filename required for single file mode."
        exit 1
    fi
    process_image "$INPUT" "$OUTPUT"

else
    echo "Error: Input '$INPUT' not found."
    exit 1
fi

echo "Done!"
