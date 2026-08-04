#!/usr/bin/env python3
"""Generate a high-quality E-E-A-T blog post via Qwen for seotoolsnav-hub."""
import json, re, urllib.request

API_KEY = open('/tmp/qwen_key.txt').read().strip()
BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1"
MODEL = "qwen-plus"

def call_api(prompt):
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are an experienced SEO strategist and growth analytics leader who writes authoritative, first-person E-E-A-T blog posts. Output ONLY valid JSON, no markdown fences."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 4000,
    }
    proxy = urllib.request.ProxyHandler({'http': 'http://127.0.0.1:7890', 'https': 'http://127.0.0.1:7890'})
    opener = urllib.request.build_opener(proxy)
    req = urllib.request.Request(
        f"{BASE_URL}/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    resp = opener.open(req, timeout=240)
    result = json.loads(resp.read())
    content = result["choices"][0]["message"]["content"]
    content = re.sub(r'^```(?:json)?\s*', '', content.strip())
    content = re.sub(r'\s*```$', '', content)
    return json.loads(content)

prompt = """Write a single high-authority SEO/marketing analytics blog article in English.

TOPIC: "Using Behavioral Analytics to Turn Organic Traffic Into Revenue" - how SEO practitioners go beyond click and impression data by layering event-based product analytics (Mixpanel, Amplitude, Heap) and session tools (Hotjar, Microsoft Clarity) on top of Google Search Console and GA4 to identify where organic users convert, drop off, and churn - and what to do with those insights.

AUDIENCE: professional SEOs, marketing analytics managers, and growth teams.

STYLE: first-person, authoritative E-E-A-T. Include a short personal/anecdotal opening tied to a real outcome, concrete numbered frameworks/checklists, specific tools and metrics, and a decisive closing. You are "Lara Vasquez, former lead growth analyst at a Series-C SaaS company". Use markdown with ## H2 headings and occasional ### H3. Aim for 950-1250 words.

Return ONLY valid JSON with exactly these fields:
{
  "title": "A concise, click-worthy title under 70 characters",
  "slug": "behavioral-analytics-seo-conversion-2026",
  "excerpt": "A 2-3 sentence summary (~200-300 chars) that previews the thesis and value",
  "content": "The full markdown article body. Use \\n for newlines in the JSON string, ## for H2 section headings, ### for H3. NO inline backticks anywhere in the content. No literal ${ sequences.",
  "readTime": integer minutes
}

AUTHOR CONSTANTS (leave exactly as is):
author = "Lara Vasquez"
authorRole = "Growth Analytics Consultant, ex-Databricks"
category = "Analytics & Measurement"
date = "2026-08-05"
tags = [three to five relevant tag strings, e.g. "Behavioral Analytics", "Conversion Optimization", "Product Analytics", "SEO Measurement", "Funnel Analysis"]

Rules:
- no backticks in content text
- no ${ } string interpolation in content
- readTime must roughly match word count (900-1400 words roughly 8-13 min)
- Output JSON ONLY."""

data = call_api(prompt)
print("API returned keys:", list(data.keys()))
print("title:", data.get("title"))
print("slug:", data.get("slug"))
print("excerpt len:", len(data.get("excerpt", "")))
words = len(data.get("content", "").split())
print("content words:", words)
print("readTime:", data.get("readTime"))
# apply constants
data["author"] = "Lara Vasquez"
data["authorRole"] = "Growth Analytics Consultant, ex-Databricks"
data["category"] = "Analytics & Measurement"
data["date"] = "2026-08-05"
# validate no backticks / no ${ in content
c = data.get("content", "")
print("has backtick:", "`" in c)
print("has dollar-brace:", "${" in c)
data["tags"] = data.get("tags", ["Behavioral Analytics","Conversion Optimization","Product Analytics","SEO Measurement","Funnel Analysis"])
with open("/tmp/new_blog.json", "w") as f:
    json.dump(data, f, ensure_ascii=False)
print("saved /tmp/new_blog.json")
