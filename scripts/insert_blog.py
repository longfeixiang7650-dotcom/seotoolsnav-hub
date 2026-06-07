#!/usr/bin/env python3
"""Insert generated blog post into blog-posts.ts"""
import json, sys

site = sys.argv[1]  # "seotoolsnav-hub" or "datatoolsnav-hub"

with open(f'/tmp/{site}_new_blog.json') as f:
    blog = json.load(f)

blog_file = f'/home/edi/{site}/app/data/blog-posts.ts'
with open(blog_file) as f:
    content = f.read()

# Generate TS for the blog entry
def esc(s):
    return str(s).replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${') if s else ""

ts_entry = f""",
{{
    slug: "{esc(blog.get('slug'))}",
    title: "{esc(blog.get('title'))}",
    excerpt: "{esc(blog.get('excerpt'))}",
    content: `{esc(blog.get('content'))}`,
    author: "{esc(blog.get('author'))}",
    authorRole: "{esc(blog.get('authorRole'))}",
    date: "{esc(blog.get('date'))}",
    category: "{esc(blog.get('category'))}",
    readTime: {blog.get('readTime', 10)},
    tags: [{', '.join(f'"{esc(t)}"' for t in blog.get('tags', []))}]
}}
"""

# Insert before the closing ]; of BLOG_POSTS
insert_pos = content.rfind('];')
if insert_pos > 0:
    content = content[:insert_pos] + ts_entry + content[insert_pos:]

with open(blog_file, 'w') as f:
    f.write(content)

print(f"✅ Inserted into {blog_file}")

# Now update sitemap
sitemap_file = f'/home/edi/{site}/app/sitemap.xml/route.ts'
with open(sitemap_file) as f:
    sm_content = f.read()

# Find BLOG_SLUGS array and add new slug
slug = blog.get('slug', '')
slug_line = f'  "{slug}",'

blog_slugs_end = sm_content.find("] as const;", sm_content.find("BLOG_SLUGS"))
if blog_slugs_end > 0 and slug not in sm_content:
    # Find where to insert (before the closing bracket)
    insert_pos2 = sm_content.rfind('"', 0, blog_slugs_end) 
    insert_pos2 = sm_content.rfind('\n', 0, insert_pos2)
    sm_content = sm_content[:insert_pos2+1] + slug_line + sm_content[insert_pos2+1:]
    with open(sitemap_file, 'w') as f:
        f.write(sm_content)
    print(f"✅ Updated sitemap with slug: {slug}")
else:
    print(f"⚠️ Slug already in sitemap or not found")

print("Done!")
