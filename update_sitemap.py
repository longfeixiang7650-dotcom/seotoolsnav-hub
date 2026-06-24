import json

with open('app/sitemap.xml/route.ts', 'r') as f:
    content = f.read()

# Add the new slug to BLOG_SLUGS
old_str = "  \"on-page-seo-2026-advanced-techniques\"] as const;"
new_str = "  \"on-page-seo-2026-advanced-techniques\",\n  \"technical-seo-fundamentals-2026-core-web-vitals-inp\"] as const;"

if old_str in content:
    content = content.replace(old_str, new_str)
    with open('app/sitemap.xml/route.ts', 'w') as f:
        f.write(content)
    print("Sitemap updated successfully!")
else:
    print("ERROR: Could not find the old string!")
    # Try to find alternatives
    if "on-page-seo-2026-advanced-techniques" in content:
        print("Found the slug text but with different format")
        # Do it differently
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'on-page-seo-2026-advanced-techniques' in line:
                print(f"Line {i}: {line}")
                lines[i] = line.replace('"] as const;', '",')
                lines.insert(i+1, '  "technical-seo-fundamentals-2026-core-web-vitals-inp"] as const;')
                break
        content = '\n'.join(lines)
        with open('app/sitemap.xml/route.ts', 'w') as f:
            f.write(content)
        print("Sitemap updated via alternative method!")

# Verify
with open('app/sitemap.xml/route.ts', 'r') as f:
    c = f.read()
if 'technical-seo-fundamentals-2026-core-web-vitals-inp' in c:
    print("New slug found in sitemap - OK")
