import json
import os
import urllib.parse

# Load existing curriculum
with open('./scripts/existing_curriculum.json', 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

# Index existing topics by id and normalized title
existing_by_id = {}
existing_by_title = {}

for sec_key, sec in existing_data.items():
    for cat in sec['categories']:
        for t in cat['topics']:
            existing_by_id[t['id']] = t
            existing_by_title[t['title'].strip().lower()] = t

def get_yt_url(title, cat_name):
    query = f"{title} {cat_name} lecture tutorial"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

print(f"Loaded {len(existing_by_id)} existing topics.")
