import json
import os
import re
import urllib.parse

# Load existing topics for preservation
with open('./scripts/existing_curriculum.json', 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

existing_by_id = {}
existing_by_title = {}

for sec_key, sec in existing_data.items():
    for cat in sec['categories']:
        for t in cat['topics']:
            existing_by_id[t['id']] = t
            clean_title = re.sub(r'[^a-zA-Z0-9]', '', t['title']).lower()
            existing_by_title[clean_title] = t

def get_yt_url(title, cat_name):
    query = f"{title} {cat_name} lecture tutorial"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

def slugify(text):
    s = text.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_-]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s

print("Helper setup complete. Existing topics count:", len(existing_by_id))
