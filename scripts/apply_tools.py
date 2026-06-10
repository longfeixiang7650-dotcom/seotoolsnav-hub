#!/usr/bin/env python3
"""Apply refined tool data to tools.ts."""
import json, re

with open('/home/edi/seotoolsnav-hub/tmp_refined_data.json') as f:
    refined = json.load(f)

with open('/home/edi/seotoolsnav-hub/app/data/tools.ts', 'r') as f:
    content = f.read()

tools_info = refined['tools']
tools_data = refined['data']

# Build replacement blocks for each tool
for i, tool_info in enumerate(tools_info):
    tid = tool_info['id']
    data = tools_data[tid]
    name = tool_info['name']
    category = tool_info['category']
    description = tool_info['description']
    
    ld = data['longDescription'].strip()
    
    # Build arrays
    pros_str = "[\n        " + ",\n        ".join(f'"{p}"' for p in data['pros']) + "\n      ]"
    cons_str = "[\n        " + ",\n        ".join(f'"{c}"' for c in data['cons']) + "\n      ]"
    features_str = "[\n        " + ",\n        ".join(f'"{f}"' for f in data['features']) + "\n      ]"
    alts_str = "[\n        " + ",\n        ".join(f'"{a}"' for a in data['alternatives']) + "\n      ]"
    
    # scoreBreakdown
    sb = data['scoreBreakdown']
    sb_str = f"""    scoreBreakdown: {{
      features: {sb['features']},
      reviews: {sb['reviews']},
      momentum: {sb['momentum']},
      popularity: {sb['popularity']}
    }}"""
    
    # userQuotes
    uq = data['userQuotes']
    uq_items = []
    for q in uq:
        uq_items.append(f'{{"role": "{q["role"]}", "company": "{q["company"]}", "quote": "{q["quote"]}"}}')
    uq_str = "[\n        " + ",\n        ".join(uq_items) + "\n      ]"
    
    # Escape longDescription for TS template literal - need to escape backticks and ${}
    ld_escaped = ld.replace('`', '\\`').replace('${', '\\${')
    
    website_url = data.get('websiteUrl', f'https://www.{name.lower().replace(" ", "")}.com')
    pricing = data['pricing']
    pricing_detail = data['pricingDetail'].replace('"', '\\"')
    use_case = data['useCase'].replace('"', '\\"')
    
    # Build the block
    block = f"""  {{
    id: "{tid}",
    name: "{name}",
    category: "{category}",
    rating: 4.4,
    reviewCount: 100,
    icon: Search,
    description: "{description}",
    longDescription: `{ld_escaped}`,
    pros: {pros_str},
    cons: {cons_str},
    pricing: "{pricing}",
    pricingDetail: "{pricing_detail}",
    features: {features_str},
    useCase: "{use_case}",
    websiteUrl: "{website_url}",
    alternatives: {alts_str},
    {sb_str},
    userQuotes: {uq_str},
  }}"""
    
    # Find the old block by matching name
    pattern = re.compile(
        r'(\s*\{)\s*\n\s*id:\s*"",\s*\n\s*name:\s*"' + re.escape(name) + r'"',
        re.DOTALL
    )
    
    match = pattern.search(content)
    if match:
        # Find the block start
        block_start = match.start()
        # Find the block end - next }, after the match
        rest = content[match.start():]
        # Find the closing }, of this entry
        end_match = re.search(r'\n  \},?\s*\n', rest)
        if end_match:
            end_pos = match.start() + end_match.end()
        else:
            end_pos = len(content)
        
        full_old = content[block_start:end_pos]
        content = content[:block_start] + block + content[end_pos:]
        print(f"  ✅ Replaced {name}")
    else:
        print(f"  ❌ Could not find {name} in file")

with open('/home/edi/seotoolsnav-hub/app/data/tools.ts', 'w') as f:
    f.write(content)

print("\nDone! Tools.ts updated.")
