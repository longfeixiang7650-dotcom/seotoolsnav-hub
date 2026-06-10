#!/usr/bin/env python3
"""Generate a shorter blog post for seotoolsnav-hub."""
import json, re

with open('/home/edi/.hermes/api_keys.env', 'rb') as f:
    env_bytes = f.read()
match = re.search(rb'QWEN_API_KEY_1[:=]([^\n]+)', env_bytes)
qwen_key = match.group(1).decode()

from openai import OpenAI
client = OpenAI(
    api_key=qwen_key,
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

prompt = """You are an expert SEO content writer for SEO Tools Nav (seotoolsnav.net).

Write a blog post in G2.com deep review style (Structure #3).

TOPIC: "Google Analytics 4 vs Matomo vs Plausible vs Adobe Analytics — Which Web Analytics Platform Is Right for Your SEO Strategy in 2026?"

Requirements:
- Content length: 2800-3500 characters (strict)
- English only
- No ${{}} anywhere
- Include a comparison table
- Include FAQ section (3 questions)
- Include final recommendation
- Cite real G2 ratings where possible ("Ratings sourced from G2")
- Be factual and specific

Write ONLY the blog body content. No title, no excerpt, no author info - just the markdown content body."""

response = client.chat.completions.create(
    model="qwen-plus",
    messages=[
        {"role": "system", "content": "You are an expert SEO content writer. Output ONLY the blog markdown body. Strictly keep under 3500 characters."},
        {"role": "user", "content": prompt}
    ],
    max_tokens=4096,
    temperature=0.8
)

content = response.choices[0].message.content
content = re.sub(r'^```(?:markdown)?\s*', '', content)
content = re.sub(r'\s*```$', '', content)
content = content.strip()

print(f"Blog content: {len(content)} characters")
print("---FIRST 100---")
print(content[:100])

with open('/home/edi/seotoolsnav-hub/tmp_blog_content.txt', 'w') as f:
    f.write(content)
