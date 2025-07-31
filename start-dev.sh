#!/bin/bash

# Navigate to the correct directory
cd "$(dirname "$0")"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Make sure you're in the evangeline-portfolio directory."
    exit 1
fi

# Start the development server
echo "Starting development server..."
npm run dev 