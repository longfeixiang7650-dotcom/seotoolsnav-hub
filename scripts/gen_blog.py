#!/usr/bin/env python3
"""Generate a blog post for seotoolsnav-hub."""
import json, re

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

prompt = """You are an expert SEO content writer for SEO Tools Nav (seotoolsnav.net), a site that reviews and compares SEO tools.

Write a complete blog post in G2.com style. Use structure #3 (Deep Review) from this list:
- Structure #3: Deep Review — tool introduction, hands-on experience (first-person), feature breakdown, pros/cons, pricing analysis, competitor comparison, who it's for, summary

TOPIC: "Google Analytics 4 vs Matomo vs Plausible vs Adobe Analytics — Which Web Analytics Platform Is Right for Your SEO Strategy in 2026?"

Requirements:
- Title: "Google Analytics 4 vs Matomo vs Plausible vs Adobe Analytics: Which Web Analytics Platform Fits Your SEO Strategy in 2026?"
- Length: 2500-5000 characters in the content field (keep under 5000)
- Slug: "ga4-vs-matomo-vs-plausible-2026"
- Excerpt: 100-150 characters
- Author: "Andrew Kim" 
- Author Role: "SEO Tools Navigation Hub"
- Date: "2026-06-10"
- Category: "Analytics"
- Read time: 6-8 minutes
- Tags: ["Google Analytics 4", "Matomo", "Plausible Analytics", "Adobe Analytics", "Web Analytics 2026", "SEO Analytics", "Privacy-First Analytics"]

Content rules:
- MUST be factual and well-researched
- Reference real G2 ratings where applicable, citing "Ratings sourced from G2"
- Compare all 4 tools fairly
- Include at least one comparison table
- Include FAQ section (3-4 questions)
- Include final recommendation
- English only
- No ${} anywhere in the content
- No Chinese characters
- Content length between 2500-5000 chars

Return ONLY the content field (the markdown blog text between the backticks). No other output."""

response = client.chat.completions.create(
    model="qwen-plus",
    messages=[
        {"role": "system", "content": "You are an expert SEO content writer. Output ONLY the blog post markdown content. No explanations, no JSON, no code fences."},
        {"role": "user", "content": prompt}
    ],
    max_tokens=4096,
    temperature=0.8
)

content = response.choices[0].message.content

# Clean up any code fences
content = re.sub(r'^```(?:markdown)?\s*', '', content)
content = re.sub(r'\s*```$', '', content)
content = content.strip()

print(f"Blog content generated: {len(content)} characters")
print("---FIRST 100 CHARS---")
print(content[:100])
print("---LAST 100 CHARS---")
print(content[-100:])

with open('/home/edi/seotoolsnav-hub/tmp_blog_content.txt', 'w') as f:
    f.write(content)

print(f"\nSaved to tmp_blog_content.txt")
