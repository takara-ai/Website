import os
import json
import re
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
    Analyze the following blog post content and assign relevant tags from the provided list.
    You must assign tags for each category: Industry, Modality, Difficulty Level, Technique, and Specialised Topics.

    Blog post content:
    {content}

    Available tags for each category:
    {json.dumps(tags, indent=2)}

    INSTRUCTIONS:
    1. Assign at least one tag for each category.
    2. For Difficulty Level, assign exactly one tag.
    3. For Technique, be generous and assign multiple tags that are relevant or related to the content.
    4. For other categories, assign multiple tags if relevant.
    5. Only use tags from the provided list.

    Return your answer in this JSON format:
    {{
        "industry": ["Tag1", "Tag2"],
        "modality": ["Tag3", "Tag4"],
        "difficultyLevel": ["Tag5"],
        "technique": ["Tag6", "Tag7", "Tag8", "Tag9"],
        "specialisedTopics": ["Tag10", "Tag11"]
    }}
    
    Remember to be particularly generous with Technique tags, including any that are relevant or related to the content.
    """

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are an AI assistant specialized in analyzing blog posts and assigning relevant tags. You have a deep understanding of various AI techniques and can identify even loosely related techniques in the content."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,  # Slightly increased for more variety in tag selection
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
                validated_tags[category] = [tag for tag in relevant_tags[category] if tag in tags[category]]
                if not validated_tags[category]:
                    print(f"Warning: No valid tags assigned for category '{category}'. Model suggested: {relevant_tags[category]}")
            else:
                print(f"Warning: No tags assigned for category '{category}'")
        
        if "difficultyLevel" in validated_tags and len(validated_tags["difficultyLevel"]) > 1:
            print(f"Warning: Multiple difficulty levels assigned. Using the first one: {validated_tags['difficultyLevel'][0]}")
            validated_tags["difficultyLevel"] = [validated_tags["difficultyLevel"][0]]
        elif "difficultyLevel" not in validated_tags or not validated_tags["difficultyLevel"]:
            print("Warning: No valid difficulty level assigned. Defaulting to 'Intermediate'.")
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
            frontmatter = match.group(1)
            for category, tag_list in relevant_tags.items():
                frontmatter = re.sub(f"{category}:.*\n", "", frontmatter)  # Remove existing category
                frontmatter += f"\n{category}: {json.dumps(tag_list)}"
            new_content = f"---\n{frontmatter.strip()}\n---\n" + content[match.end():]
        else:
            # If no frontmatter, create a new one
            frontmatter = "---\n"
            for category, tag_list in relevant_tags.items():
                frontmatter += f"{category}: {json.dumps(tag_list)}\n"
            frontmatter += "---\n"
            new_content = frontmatter + content

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