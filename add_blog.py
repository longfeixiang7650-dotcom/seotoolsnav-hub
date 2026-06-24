import json

with open('/tmp/blog_post_clean.json', 'r') as f:
    post = json.load(f)

# Build the blog post entry text
# Use list concatenation format as required (NO f-strings)

title = post['title']
excerpt = post['excerpt']
content = post['content']
slug = post['slug']
category = post['category']
tags = post['tags']
readTime = post['readTime']
date = "2026-06-25"
author = "Marcus Chen"
authorRole = "Senior Technical SEO Strategist"

# Build the entry string using concatenation
entry = []
entry.append("  {\n")
entry.append('    slug: "' + slug + '",\n')
entry.append('    title: "' + title + '",\n')
entry.append('    excerpt: "' + excerpt + '",\n')
entry.append('    content: `' + content + '`,\n')
entry.append('    author: "' + author + '",\n')
entry.append('    authorRole: "' + authorRole + '",\n')
entry.append('    date: "' + date + '",\n')
entry.append('    category: "' + category + '",\n')
entry.append('    readTime: ' + str(readTime) + ',\n')

# Tags as array
tag_str = ", ".join(['"' + t + '"' for t in tags])
entry.append('    tags: [' + tag_str + ']\n')

entry.append("  },\n")

entry_text = "".join(entry)

# Verify no stray issues
assert '`' not in slug and '`' not in title and '`' not in excerpt, "Backtick in metadata!"
# Check for double commas
if ',,' in entry_text:
    print("WARNING: Double comma found!")
    entry_text = entry_text.replace(',,', ',')

print("Entry to insert:")
print(entry_text[:200])
print("...")
print("Length:", len(entry_text))

# Now read and modify the blog-posts.ts
with open('app/data/blog-posts.ts', 'r') as f:
    content = f.read()

# Insert before the last line (]); 
last_close = content.rfind('\n];')
if last_close > 0:
    content = content[:last_close+1] + '\n' + entry_text + content[last_close+1:]
else:
    print("ERROR: Could not find closing ];")
    exit(1)

with open('app/data/blog-posts.ts', 'w') as f:
    f.write(content)

# Verify
with open('app/data/blog-posts.ts', 'r') as f:
    c = f.read()
    
# Check for double commas
if ',,' in c:
    print("ERROR: Double comma found in file!")
else:
    print("No double commas - OK")
    
# Check slug is present
if slug in c:
    print(f"Slug '{slug}' found in file - OK")
else:
    print(f"ERROR: Slug '{slug}' not found!")

# Count total blog posts
count = c.count('slug:')
print(f"Total blog posts (slug count): {count}")

print("Blog post added successfully!")
