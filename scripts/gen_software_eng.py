import json
import urllib.parse

def make_yt_url(title, subject="Software Engineering GATE"):
    q = f"{title} {subject} lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(q)}"

with open("scripts/existing_curriculum.json", encoding="utf-8") as f:
    existing = json.load(f)

categories_to_export = {}
for cat in existing["core-cs"]["categories"]:
    if cat["id"] in ["oops", "system-design", "swe-git"]:
        cat_copy = dict(cat)
        for t in cat_copy["topics"]:
            if "youtube_url" not in t or not t["youtube_url"]:
                subject_name = cat_copy["title"]
                t["youtube_url"] = make_yt_url(t["title"], subject_name)
        categories_to_export[cat["id"]] = cat_copy

ts_content = f"""import type {{ SectionCategory }} from './types';

export const OOPS_CATEGORY: SectionCategory = {json.dumps(categories_to_export['oops'], indent=2)};

export const SYSTEM_DESIGN_CATEGORY: SectionCategory = {json.dumps(categories_to_export['system-design'], indent=2)};

export const SWE_GIT_CATEGORY: SectionCategory = {json.dumps(categories_to_export['swe-git'], indent=2)};
"""

with open("src/lib/data/curriculum/software-engineering.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated Software Engineering modules (OOPs: {len(categories_to_export['oops']['topics'])}, System Design: {len(categories_to_export['system-design']['topics'])}, SWE/Git: {len(categories_to_export['swe-git']['topics'])}) successfully!")
