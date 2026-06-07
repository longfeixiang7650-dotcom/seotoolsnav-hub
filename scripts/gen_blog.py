#!/usr/bin/env python3
"""Add blog posts to seotoolsnav-hub"""
import urllib.request, json, re, sys

key = None
with open('/home/edi/.hermes/api_keys.env') as f:
    for line in f:
        if line.startswith('QWEN_API_KEY_1='):
            key = line.strip().split('=', 1)[1]
            break

site = sys.argv[1]  # "seotoolsnav-hub" or "datatoolsnav-hub"

API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

if site == "seotoolsnav-hub":
    prompt = """Generate EXACTLY 1 SEO blog post as a JSON object for a site called "SEO Tools Nav".

Fields: slug, title, excerpt, content (full markdown article, 2500+ words with H2 sections, comparison tables, bullet points, FAQ), author, authorRole, date, category, readTime(int), tags(string array).

The blog should be: "Technical SEO Audit Checklist 2026: A Step-by-Step Guide to Optimizing Your Site"

This should be a comprehensive, in-depth guide covering: crawlability, indexability, site structure, schema markup, Core Web Vitals, mobile optimization, log file analysis, canonicalization, hreflang, XML sitemaps, robots.txt, JavaScript SEO issues, and tools to use for each step.

Author: "Mike Zhang", authorRole: "Technical SEO Specialist", category: "SEO Tools"

Return ONLY a valid JSON object, no other text."""

elif site == "datatoolsnav-hub":
    prompt = """Generate EXACTLY 1 data analytics blog post as a JSON object for a site called "Data Tools Nav".

Fields: slug, title, excerpt, content (full markdown article, 2500+ words with H2 sections, comparison tables, bullet points, FAQ), author, authorRole, date, category, readTime(int), tags(string array).

The blog should be: "Data Engineering Pipeline 2026: Top ETL and Data Integration Tools Compared"

This should be a comprehensive guide covering: ETL vs ELT vs Reverse ETL, comparing tools like Airbyte, Fivetran, Stitch, dbt, Apache Airflow, Prefect, Dagster, Matillion, Talend, Informatica. Include a comparison table, architecture considerations, cloud warehouse integration (Snowflake, BigQuery, Redshift), real-time vs batch processing, and pricing models.

Author: "David Park", authorRole: "Data Engineering Analyst", category: "Data Pipelines"

Return ONLY a valid JSON object, no other text."""

payload = json.dumps({
    "model": "qwen-plus",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 9000,
    "temperature": 0.8,
}).encode('utf-8')

req = urllib.request.Request(API_URL, data=payload, method='POST')
req.add_header('Authorization', f'Bearer {key}')
req.add_header('Content-Type', 'application/json')

resp = urllib.request.urlopen(req, timeout=300)
result = json.loads(resp.read().decode())
content = result['choices'][0]['message']['content']

# Extract JSON
json_match = re.search(r'\{[^{}]*"slug"[^{}]*\}', content, re.DOTALL)
if not json_match:
    json_match = re.search(r'\{.*"title".*\}', content, re.DOTALL)

if json_match:
    blog = json.loads(json_match.group())
    with open(f'/tmp/{site}_new_blog.json', 'w') as f:
        json.dump(blog, f, indent=2)
    print(f"✅ Generated blog: {blog.get('title', '?')}")
    print(f"   Slug: {blog.get('slug', '?')}")
else:
    print("❌ Could not extract JSON")
    print(content[:500])
