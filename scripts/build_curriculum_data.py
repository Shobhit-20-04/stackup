import json
import os
import re
import urllib.parse

# Load existing topics for preservation
with open('./scripts/existing_curriculum.json', 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

existing_by_id = {}
existing_by_clean_title = {}

for sec_key, sec in existing_data.items():
    for cat in sec['categories']:
        for t in cat['topics']:
            existing_by_id[t['id']] = t
            clean_title = re.sub(r'[^a-zA-Z0-9]', '', t['title']).lower()
            existing_by_clean_title[clean_title] = t

def get_yt_url(title, cat_name):
    query = f"{title} {cat_name} lecture tutorial"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

def slugify(text):
    s = text.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_-]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s

def make_topic(t_id, title, desc, cat_name, difficulty, minutes, companies, takeaways, notes, questions):
    # Check if we can inherit or merge with existing topic
    clean = re.sub(r'[^a-zA-Z0-9]', '', title).lower()
    existing = existing_by_id.get(t_id) or existing_by_clean_title.get(clean)
    
    yt_url = get_yt_url(title, cat_name)
    
    if existing:
        return {
            "id": t_id,
            "slug": slugify(title),
            "title": title,
            "description": existing.get("description", desc),
            "estimatedMinutes": existing.get("estimatedMinutes", minutes),
            "difficulty": difficulty or existing.get("difficulty", "Medium"),
            "companyTags": existing.get("companyTags", companies),
            "keyTakeaways": existing.get("keyTakeaways", takeaways),
            "youtube_url": yt_url,
            "notesMarkdown": existing.get("notesMarkdown", notes),
            "questions": existing.get("questions", questions)
        }
    
    return {
        "id": t_id,
        "slug": slugify(title),
        "title": title,
        "description": desc,
        "estimatedMinutes": minutes,
        "difficulty": difficulty,
        "companyTags": companies,
        "keyTakeaways": takeaways,
        "youtube_url": yt_url,
        "notesMarkdown": notes,
        "questions": questions
    }

def format_ts_category(export_name, cat_id, cat_slug, cat_title, cat_desc, cat_icon, topics):
    json_topics = json.dumps(topics, indent=2)
    return f"""import type {{ SectionCategory }} from './types';

export const {export_name}: SectionCategory = {{
  id: {json.dumps(cat_id)},
  slug: {json.dumps(cat_slug)},
  title: {json.dumps(cat_title)},
  description: {json.dumps(cat_desc)},
  icon: {json.dumps(cat_icon)},
  topics: {json_topics}
}};
"""

print("Base builder helper ready.")
