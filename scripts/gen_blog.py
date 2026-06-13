#!/usr/bin/env python3
"""Generate blog post about SEO Ranking Factors 2026 and append to blog-posts.ts"""
import json
import re
import os
import urllib.request

# Read API key
env_path = os.path.expanduser("~/.hermes/api_keys.env")
API_KEY = None
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line.startswith("QWEN_API_KEY_1="):
            API_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1"
MODEL = "qwen-plus"

prompt = """Write a comprehensive blog post about SEO Ranking Factors in 2026. Title: "SEO Ranking Factors 2026: What Actually Matters for Google Rankings"

Generate and return ONLY valid JSON with these fields:
{
  "slug": "seo-ranking-factors-2026",
  "title": "SEO Ranking Factors 2026: What Actually Matters for Google Rankings",
  "excerpt": "A data-backed analysis of the most important Google ranking factors in 2026, from EEAT and Core Web Vitals to AI-generated content signals, topical authority, and entity-based SEO.",
  "content": "Full markdown blog post with ## headings, specific data points, statistics, and actionable insights. Cover: EEAT evolution, Core Web Vitals impact, topical authority/clusters, entity-based SEO, AI content detection, user engagement signals, backlink quality vs quantity, mobile-first indexing, structured data, and brand signals. At least 1500 words. Use ## for main headings.",
  "author": "SEOToolsNav Team",
  "authorRole": "SEO Research Team",
  "date": "2026-06-13",
  "category": "SEO Strategy",
  "readTime": 12,
  "tags": ["SEO", "Ranking Factors", "Google Algorithm", "EEAT", "Core Web Vitals", "Topical Authority", "Entity SEO", "2026 SEO Trends"]
}

Rules:
- content field uses markdown with ## headings
- content must be comprehensive, 1500+ words
- Include specific data and statistics where possible
- All in English
- No markdown fences around the JSON output
"""

payload = {
    "model": MODEL,
    "messages": [
        {"role": "system", "content": "You are an expert SEO content writer. Output ONLY valid JSON, no markdown fences, no extra text."},
        {"role": "user", "content": prompt}
    ],
    "temperature": 0.7,
    "max_tokens": 8192,
}

req = urllib.request.Request(
    f"{BASE_URL}/chat/completions",
    data=json.dumps(payload).encode(),
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    method="POST",
)

resp = urllib.request.urlopen(req, timeout=180)
result = json.loads(resp.read())
content_text = result["choices"][0]["message"]["content"]

# Clean potential markdown fences
content_text = re.sub(r'^```(?:json)?\s*', '', content_text.strip())
content_text = re.sub(r'\s*```$', '', content_text)

data = json.loads(content_text)

# Build the blog entry
content_md = data["content"]
# Escape backticks
content_md = content_md.replace("`", "\\`")

entry = f"""  {{
    slug: "{data["slug"]}",
    title: "{data["title"]}",
    excerpt: "{data["excerpt"]}",
    content: `{content_md}`,
    author: "{data["author"]}",
    authorRole: "{data["authorRole"]}",
    date: "{data["date"]}",
    category: "{data["category"]}",
    readTime: {data["readTime"]},
    tags: {json.dumps(data["tags"], ensure_ascii=False)},
  }},
"""

# Read existing file
with open("app/data/blog-posts.ts") as f:
    existing = f.read()

# Find the last entry and insert before ]; (closing bracket)
# The file ends with: "}," then newline then "];"
# Find the last ]; and insert before it
last_bracket = existing.rfind("];")
if last_bracket >= 0:
    # Find the last ,\n before ];
    before_last = existing.rfind(",\n", 0, last_bracket)
    if before_last >= 0:
        new_content = existing[:before_last+1] + "\n" + entry + "\n];"
    else:
        new_content = existing[:last_bracket] + ",\n" + entry + "\n];"
else:
    new_content = existing + "\n" + entry

with open("app/data/blog-posts.ts", "w") as f:
    f.write(new_content)

print(f"✅ Blog post added: {data['title']}")
print(f"   Slug: {data['slug']}")
print(f"   Content length: {len(content_md)} chars")
print(f"   Tags: {', '.join(data['tags'])}")
