#!/usr/bin/env python3
"""Generate G2-style content for 3 unrefined SEO tools on seotoolsnav-hub."""
import json, re, os, sys

# Read API key
with open('/home/edi/.hermes/api_keys.env', 'rb') as f:
    env_bytes = f.read()
match = re.search(rb'QWEN_API_KEY_1[:=]([^\n]+)', env_bytes)
qwen_key = match.group(1).decode()

from openai import OpenAI
client = OpenAI(
    api_key=qwen_key,
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

tools_to_refine = [
    {
        "id": "contentstudio",
        "name": "ContentStudio",
        "category": "Content Marketing",
        "description": "All-in-one platform for content discovery, scheduling, performance analytics, and AI-assisted content creation and curation.",
    },
    {
        "id": "linkresearchtools",
        "name": "LinkResearchTools",
        "category": "Backlink Analysis",
        "description": "Advanced technical backlink analysis suite focused on link risk assessment, penalty recovery, and algorithmic link profile auditing.",
    },
    {
        "id": "google-analytics",
        "name": "Google Analytics",
        "category": "Analytics",
        "description": "Free web analytics platform by Google that tracks and reports website traffic, user behavior, and conversion data across devices and channels.",
    },
]

def generate_tool_refinement(tool):
    prompt = f"""You are an expert SEO tool reviewer writing for G2.com. Generate a comprehensive review for "{tool['name']}" ({tool['category']}).

Return ONLY valid JSON with exactly these fields (no markdown, no backticks):
{{
  "longDescription": "A markdown-formatted deep review (≥1200 characters, English only, use ## and ### headers, include real data and stats with sources)",
  "pros": ["5-7 specific advantages"],
  "cons": ["3-4 specific disadvantages"],
  "pricing": "Starting price (e.g. 'From $X/mo')",
  "pricingDetail": "Detailed pricing tiers with features (2-3 sentences)",
  "features": ["7-10 key features"],
  "useCase": "1-2 sentences describing ideal use case",
  "alternatives": ["3-4 alternative tools"],
  "scoreBreakdown": {{"features": 0-10, "reviews": 0-10, "momentum": 0-10, "popularity": 0-10}},
  "userQuotes": [{{"role": "Job Title", "company": "Company Name", "quote": "Realistic testimonial with specific metrics"}}]
}}

CRITICAL RULES:
- longDescription MUST be ≥1200 characters of markdown content with ## headers and real detail
- longDescription should be a markdown template literal (use \\n for newlines)
- All ratings from G2 must note "Ratings sourced from G2"
- No ${{}} in the content
- pros and cons must be specific, not generic
- pricing must be realistic and sourced
- userQuotes must have 2 entries
- Score breakdown values are 0-10 scale

Tool: {tool['name']}
Category: {tool['category']}
Description: {tool['description']}
"""

    response = client.chat.completions.create(
        model="qwen-plus",
        messages=[
            {"role": "system", "content": "You are an expert SEO tools reviewer. Output ONLY valid JSON, no markdown formatting, no backticks, no commentary."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=4096,
        temperature=0.7
    )
    
    raw = response.choices[0].message.content
    # Try to extract JSON from the response
    # Remove markdown code block if present
    raw = re.sub(r'^```(?:json)?\s*', '', raw)
    raw = re.sub(r'\s*```$', '', raw)
    raw = raw.strip()
    
    try:
        data = json.loads(raw)
    except:
        # Try to find JSON in the response
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            data = json.loads(match.group())
        else:
            print(f"FAILED to parse JSON for {tool['name']}")
            print(f"Raw response: {raw[:500]}")
            return None
    
    # Validate longDescription length
    if len(data.get('longDescription', '')) < 1000:
        print(f"WARNING: longDescription too short ({len(data.get('longDescription',''))} chars) for {tool['name']}")
    
    return data

results = {}
for t in tools_to_refine:
    print(f"Generating content for {t['name']}...")
    data = generate_tool_refinement(t)
    if data:
        results[t['id']] = data
        print(f"  ✅ Done - longDescription: {len(data.get('longDescription',''))} chars")
    else:
        print(f"  ❌ Failed")

# Save to file
with open('/home/edi/seotoolsnav-hub/tmp_refined_data.json', 'w') as f:
    json.dump({"tools": tools_to_refine, "data": results}, f, indent=2, ensure_ascii=False)

print(f"\nSaved {len(results)} refined tools to tmp_refined_data.json")
