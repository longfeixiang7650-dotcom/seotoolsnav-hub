import json

# Load the blog post
with open('/tmp/blog_post.json', 'r') as f:
    post = json.load(f)

# Replace backticks with single quotes
post['content'] = post['content'].replace('`', "'")

# Replace smart/curly quotes with ASCII
post['content'] = post['content'].replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"').replace('\u2014', '--').replace('\u00d7', 'x')

# Escape ${ to prevent template literal interpolation (if any remain)
post['content'] = post['content'].replace('${', '\\${')

# Ensure excerpt has no double quotes
post['excerpt'] = post['excerpt'].replace('"', "'")

# Verify no backticks remain
assert '`' not in post['content'], "Backticks still present!"
assert '${' in post['content'] or '\\${' in post['content'] or '${' not in post['content'], "Check dollar-brace"
# Actually verify: if there are unescaped ${ patterns, fix them
import re
# Find any ${ that's NOT preceded by backslash
matches = [(m.start(), m.group()) for m in re.finditer(r'(?<!\\)\$\{', post['content'])]
if matches:
    print(f"Found {len(matches)} unescaped ${{ patterns, fixing...")
    post['content'] = post['content'].replace('${', '\\${')

# Save cleaned version
with open('/tmp/blog_post_clean.json', 'w') as f:
    json.dump(post, f, indent=2)

print(f"Cleaned blog post: '{post['title']}'")
print(f"Slug: {post['slug']}")
print(f"Excerpt: {post['excerpt']}")
print(f"Content length: {len(post['content'])} chars, ~{len(post['content'].split())} words")
print(f"Read time: {post['readTime']} min")
print(f"Category: {post['category']}")
print(f"Tags: {', '.join(post['tags'])}")
print(f"Backticks in content: {'Yes' if '`' in post['content'] else 'No'}")
print(f"Smart quotes in content: {'Yes' if '\u2018' in post['content'] or '\u2019' in post['content'] or '\u201c' in post['content'] else 'No'}")
