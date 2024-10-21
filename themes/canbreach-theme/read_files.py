import os

def read_directory_contents(start_path, output_file):
    """
    Recursively reads all files in directories and subdirectories,
    writing their paths and contents to a single output file.
    
    Args:
        start_path (str): Starting directory path
        output_file (str): Path to the output text file
    """
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(start_path):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    # Try to read the file
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        # Write the file path as title
                        outfile.write(f"File: {file_path}\n\n")
                        
                        # Write the file contents
                        outfile.write(infile.read())
                        
                        # Write separator
                        outfile.write("\n\n---\n\n")
                except Exception as e:
                    # Handle files that can't be read as text
                    outfile.write(f"File: {file_path}\n")
                    outfile.write(f"Could not read file: {str(e)}\n")
                    outfile.write("\n---\n\n")

# Get the current directory where the Python script is located
current_dir = os.path.dirname(os.path.abspath(__file__))

# Create the output file in the same directory
output_file = os.path.join(current_dir, 'directory_contents.txt')

# Run the function
read_directory_contents(current_dir, output_file)