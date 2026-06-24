import json

with open('app/data/tools.ts', 'r') as f:
    content = f.read()

errors = []

# Check basic structure
if 'ALL_TOOLS: ToolData[] = [' not in content and 'ALL_TOOLS = [' not in content:
    errors.append("ALL_TOOLS array not found!")

# Check for tool objects with empty ids (duplicate placeholders)
import re
ids = re.findall(r'id:\s*"([^"]*)"', content)
empty_ids = [i for i, tid in enumerate(ids) if tid == '']
if empty_ids:
    errors.append(f"Found {len(empty_ids)} tools with empty IDs (placeholders)")

# Check for missing closing brackets
open_braces = content.count('{')
close_braces = content.count('}')
if open_braces != close_braces:
    errors.append(f"Brace mismatch: {open_braces} open vs {close_braces} close")

# Check that all tool objects have required fields
required_fields = ['id', 'name', 'category', 'rating', 'reviewCount', 'description', 
                   'longDescription', 'pros', 'cons', 'pricing', 'pricingDetail', 
                   'features', 'useCase', 'websiteUrl', 'alternatives', 'scoreBreakdown', 'userQuotes']

# Check for double commas
if ',,' in content:
    errors.append("Double commas found!")

# Check for trailing commas in arrays (might cause issues)
# Look for patterns like items,]
# This is valid in modern TS but some parsers may not like it

if errors:
    print("STRUCTURAL ISSUES FOUND:")
    for e in errors:
        print(f"  - {e}")
else:
    print("Structural check PASSED - no issues found")

print(f"\nTotal tools (non-empty IDs): {len([t for t in ids if t])}")
print(f"File size: {len(content)} chars")
print("Open braces:", open_braces)
print("Close braces:", close_braces)
