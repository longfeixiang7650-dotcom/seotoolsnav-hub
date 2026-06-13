#!/usr/bin/env python3
"""Refine stub tools by directly replacing blocks in tools.ts"""
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

def call_api(prompt):
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a professional SEO tool reviewer. Output ONLY valid JSON, no markdown fences, no extra text."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 4096,
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
    resp = urllib.request.urlopen(req, timeout=120)
    result = json.loads(resp.read())
    content_text = result["choices"][0]["message"]["content"]
    content_text = re.sub(r'^```(?:json)?\s*', '', content_text.strip())
    content_text = re.sub(r'\s*```$', '', content_text)
    return json.loads(content_text)

with open("app/data/tools.ts") as f:
    content = f.read()

# ====== Define the 3 tools to refine ======
tools_to_refine = [
    {
        "name": "Google Ads",
        "category": "PPC & Advertising",
        "new_id": "google-ads",
        "website_url": "https://ads.google.com",
    },
    {
        "name": "Sendinblue",
        "category": "Email Marketing", 
        "new_id": "sendinblue",
        "website_url": "https://www.sendinblue.com",
    },
]

# Mixpanel is already done

for tool in tools_to_refine:
    name = tool["name"]
    category = tool["category"]
    print(f"\n=== Refining: {name} ===")
    
    prompt = f"""Generate a comprehensive SEO/marketing tool review for "{name}" in the "{category}" category.

Return ONLY valid JSON with these fields:
{{
  "description": "Short one-sentence description (max 150 chars)",
  "longDescription": "Comprehensive markdown with ## Overview, ## Key Features, ## Ideal For sections. 3-5 paragraphs with specific data.",
  "pros": ["pro1", "pro2", "pro3", "pro4", "pro5"],
  "cons": ["con1", "con2", "con3"],
  "pricing": "Short pricing string",
  "pricingDetail": "Detailed pricing (2-3 sentences)",
  "features": ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
  "useCase": "One sentence ideal use case",
  "alternatives": ["alt1", "alt2", "alt3"],
  "scoreBreakdown": {{"features": 8.0, "reviews": 8.0, "momentum": 7.5, "popularity": 8.0}},
  "userQuotes": [{{"role": "Title1", "company": "Company1", "quote": "Quote1"}}, {{"role": "Title2", "company": "Company2", "quote": "Quote2"}}]
}}

Rules:
- longDescription uses ## headings, markdown
- All in English, factual
- pros: 5 items, cons: 3 items
- features: 5-7 items
- userQuotes: 2 realistic quotes
"""

    try:
        data = call_api(prompt)
        data["id"] = tool["new_id"]
        data["websiteUrl"] = tool["website_url"]
        
        # Build the replacement entry
        long_desc = data["longDescription"]
        # Escape any backticks inside longDescription
        long_desc = long_desc.replace("`", "\\`")
        
        entry = f"""  {{
    id: "{data["id"]}",
    name: "{name}",
    category: "{category}",
    rating: 4.0,
    reviewCount: 100,
    icon: Search,
    description: "{data["description"]}",
    longDescription: `{long_desc}`,
    pros: {json.dumps(data["pros"], ensure_ascii=False)},
    cons: {json.dumps(data["cons"], ensure_ascii=False)},
    pricing: "{data["pricing"]}",
    pricingDetail: "{data["pricingDetail"]}",
    features: {json.dumps(data["features"], ensure_ascii=False)},
    useCase: "{data["useCase"]}",
    websiteUrl: "{data["websiteUrl"]}",
    alternatives: {json.dumps(data["alternatives"], ensure_ascii=False)},
    scoreBreakdown: {json.dumps(data["scoreBreakdown"], ensure_ascii=False)},
    userQuotes: {json.dumps(data["userQuotes"], ensure_ascii=False)},
  }}"""
        
        # Find the stub block and replace it
        # Pattern: from "  {" (with id: "") to "  },"
        pattern = r'(  \{\s*\n\s*id: "",\s*\n\s*name: "' + re.escape(name) + r'",.*?\n  \},)'
        
        match = re.search(pattern, content, re.DOTALL)
        if match:
            old_block = match.group(1)
            content = content.replace(old_block, entry, 1)
            print(f"✅ Replaced {name}")
        else:
            print(f"❌ Could not find stub block for {name}")
            # Print what we're looking for
            print(f"   Pattern: {pattern[:80]}...")
            
    except Exception as e:
        print(f"❌ Error for {name}: {e}")
        import traceback
        traceback.print_exc()

# Write back
with open("app/data/tools.ts", "w") as f:
    f.write(content)

print("\n=== Done ===")
