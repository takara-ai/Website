import os
import json
import re
import yaml
from groq import Groq
from typing import Dict, List
from dotenv import load_dotenv
import tiktoken
import argparse
from datetime import datetime

load_dotenv()

def load_tags(json_file: str) -> Dict[str, List[str]]:
    with open(json_file, 'r') as f:
        return json.load(f)

def count_tokens(text: str) -> int:
    encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")  # This should work for most models
    return len(encoding.encode(text))

def find_relevant_tags(content: str, tags: Dict[str, List[str]]) -> Dict[str, List[str]]:
    client = Groq(api_key=os.getenv("GROQ_KEY"))

    prompt = f"""
    You are tasked with analyzing blog post content to assign relevant tags from the provided list. You must ensure accuracy by selecting tags that are well-aligned with the text.

    Blog post content:
    {content}

    Available tags for each category (in JSON format):
    {json.dumps(tags, indent=2)}

    INSTRUCTIONS:
    1. Carefully read the blog post and assign tags that accurately reflect its content for each of the following categories: 
       - Industry
       - Modality
       - difficultyLevel
       - Technique
       - Specialised Topics
    2. **Industry**: Assign multiple tags if applicable, but ensure they are relevant to the industry discussed in the content.
    3. **Modality**: Assign multiple tags if the content spans more than one modality (e.g., vision, language, audio).
    4. **difficultyLevel**: Assign exactly one difficultyLevel tag (Beginner, Intermediate, Advanced) based on the overall complexity of the blog post.
    5. **Technique**: Be generous in assigning multiple technique-related tags, even for loosely related methods or concepts mentioned in the post.
    6. **Specialised Topics**: Assign multiple tags only if the post delves into niche areas.

    Important Notes:
    - Ensure all tags come from the provided list.
    - Be particularly careful with the difficultyLevel; assign only one tag based on the depth and technical difficulty of the content.

    Return your answer in this JSON format:
    {{
        "industry": ["Tag1", "Tag2"],
        "modality": ["Tag3", "Tag4"],
        "difficultyLevel": ["Tag5"],
        "technique": ["Tag6", "Tag7", "Tag8"],
        "specialisedTopics": ["Tag9", "Tag10"]
    }}
    
    Example of how to assign tags:
    - If the post is about AI models used in healthcare, you might assign: 
      "industry": ["Healthcare", "Technology"]
    - For a post discussing LLMs and image generation: 
      "modality": ["Vision", "Image Generation", "Multimodal"]
    """

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "JSON You are an AI assistant expert in analyzing content and assigning the most accurate and relevant tags based on various AI techniques, industries, and modalities."},
            {"role": "user", "content": prompt}
        ],
        temperature=0,  # Lower for higher accuracy and reduced randomness
        max_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )

    try:
        relevant_tags = json.loads(completion.choices[0].message.content)
        print("DEBUG: Raw model response:", relevant_tags)

        validated_tags = {}
        for category in tags.keys():
            if category in relevant_tags and relevant_tags[category]:
                # Filter tags that are valid from the provided list
                validated_tags[category] = [tag for tag in relevant_tags[category] if tag in tags[category]]
                if not validated_tags[category]:
                    print(f"Warning: No valid tags assigned for category '{category}'. Model suggested: {relevant_tags[category]}")
            else:
                print(f"Warning: No tags assigned for category '{category}'")
        
        # Ensure only one difficultyLevel is assigned
        if "difficultyLevel" in validated_tags and len(validated_tags["difficultyLevel"]) > 1:
            print(f"Warning: Multiple difficultyLevels assigned. Using the first one: {validated_tags['difficultyLevel'][0]}")
            validated_tags["difficultyLevel"] = [validated_tags["difficultyLevel"][0]]
        elif "difficultyLevel" not in validated_tags or not validated_tags["difficultyLevel"]:
            print("Warning: No valid difficultyLevel assigned. Defaulting to 'Intermediate'.")
            validated_tags["difficultyLevel"] = ["Intermediate"]

        return validated_tags
    except json.JSONDecodeError:
        print("Error: Could not parse the API response as JSON.")
        print("DEBUG: Raw API response:", completion.choices[0].message.content)
        return {}

       
def update_frontmatter(file_path: str, tags: Dict[str, List[str]]) -> None:
    with open(file_path, 'r+') as f:
        content = f.read()
        token_count = count_tokens(content)
        print(f"The blog post contains approximately {token_count} tokens.")
        
        relevant_tags = find_relevant_tags(content, tags)
        
        # Check if the file already has a frontmatter
        frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
        match = re.match(frontmatter_pattern, content, re.DOTALL)
        
        if match:
            # If frontmatter exists, update it
            frontmatter = yaml.safe_load(match.group(1))
            frontmatter['tags'] = relevant_tags
            new_frontmatter = yaml.dump(frontmatter, default_flow_style=False, sort_keys=False)
            new_content = f"---\n{new_frontmatter}---\n" + content[match.end():]
        else:
            # If no frontmatter, create a new one
            frontmatter = {'tags': relevant_tags}
            new_frontmatter = yaml.dump(frontmatter, default_flow_style=False, sort_keys=False)
            new_content = f"---\n{new_frontmatter}---\n" + content

        # Write the updated content back to the file
        f.seek(0)
        f.write(new_content)
        f.truncate()

    print(f"Processed: {file_path}")
    print("Relevant tags:", relevant_tags)

def load_processed_files(record_file: str) -> set:
    if os.path.exists(record_file):
        with open(record_file, 'r') as f:
            return set(json.load(f))
    return set()

def save_processed_files(record_file: str, processed_files: set):
    with open(record_file, 'w') as f:
        json.dump(list(processed_files), f)

def process_markdown_files(directory: str, tags: Dict[str, List[str]], record_file: str, override: bool):
    processed_files = load_processed_files(record_file)
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md') and file not in ('index.md', '_index.md'):
                file_path = os.path.join(root, file)
                if override or file_path not in processed_files:
                    update_frontmatter(file_path, tags)
                    processed_files.add(file_path)
                else:
                    print(f"Skipping already processed file: {file_path}")
    
    save_processed_files(record_file, processed_files)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process markdown files and update frontmatter with relevant tags.")
    parser.add_argument("--override", action="store_true", help="Override previously processed files")
    args = parser.parse_args()

    tags_file = "tags.json"  # Assume the JSON is saved in this file
    blog_directory = "env/content/open source/prompt-engineering"  # Replace with your actual blog posts directory
    record_file = "processed_files.json"  # File to keep track of processed files
    
    # Check if GROQ_KEY is set
    if not os.getenv("GROQ_KEY"):
        raise ValueError("GROQ_KEY not found in .env file. Please set it and try again.")
    
    tags = load_tags(tags_file)
    process_markdown_files(blog_directory, tags, record_file, args.override)
    print("All markdown files have been processed and tagged.")