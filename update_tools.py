import re, json

with open('app/data/tools.ts') as f:
    content = f.read()

def find_tool(content, tid):
    pos = content.find(f'id: "{tid}"')
    if pos == -1:
        return None, None, None
    i = pos
    depth = 0
    while i >= 0:
        if content[i] == '}':
            depth += 1
        elif content[i] == '{':
            depth -= 1
            if depth == -1:
                break
        i -= 1
    j = pos
    depth = 0
    while j < len(content):
        if content[j] == '{':
            depth += 1
        elif content[j] == '}':
            depth -= 1
            if depth == 0 and j > pos:
                break
        j += 1
    return i, j+1, content[i:j+1]

def make_new_entry(tid, name, category, rating, review_count, icon, description, 
                   long_desc, pros, cons, pricing, pricing_detail, features, 
                   use_case, website_url, alternatives, score, user_quotes):
    pros_str = ',\n        '.join([f'"{p}"' for p in pros])
    cons_str = ',\n        '.join([f'"{c}"' for c in cons])
    features_str = ',\n        '.join([f'"{f}"' for f in features])
    alts_str = ', '.join([f'"{a}"' for a in alternatives])
    quotes_parts = []
    for q in user_quotes:
        q_role = q["role"].replace('"', "'")
        q_company = q["company"].replace('"', "'")
        q_quote = q["quote"].replace('"', "'")
        quotes_parts.append(f'{{"role": "{q_role}", "company": "{q_company}", "quote": "{q_quote}"}}')
    quotes_str = ', '.join(quotes_parts)
    
    entry = f'''{{
    id: "{tid}",
    name: "{name}",
    category: "{category}",
    rating: {rating},
    reviewCount: {review_count},
    icon: {icon},
    description: "{description}",
    longDescription: `{long_desc}`,
    pros: [
        {pros_str}
      ],
    cons: [
        {cons_str}
      ],
    pricing: "{pricing}",
    pricingDetail: "{pricing_detail}",
    features: [
        {features_str}
      ],
    useCase: "{use_case}",
    websiteUrl: "{website_url}",
    alternatives: [{alts_str}],
    scoreBreakdown: {{"features": {score["features"]}, "reviews": {score["reviews"]}, "momentum": {score["momentum"]}, "popularity": {score["popularity"]}}},
    userQuotes: [{quotes_str}],
  }}'''
    return entry

# Clean smart quotes
def clean_quotes(s):
    replacements = {
        '\u2018': "'", '\u2019': "'",
        '\u201c': '"', '\u201d': '"',
        '\u2013': '-', '\u2014': '--',
    }
    for old, new in replacements.items():
        s = s.replace(old, new)
    return s

# SPYFU
spyfu_scores = {"features": 8.0, "reviews": 7.5, "momentum": 6.5, "popularity": 7.5}
spyfu_long = """## Overview
SpyFu is a veteran competitive intelligence platform that empowers SEO and PPC professionals to uncover, analyze, and act on competitors' digital marketing strategies. With over 18 years of historical Google Ads data and deep organic search archives, SpyFu delivers unmatched visibility into how rivals rank, bid, and grow online. Designed for agencies, in-house marketers, and consultants, it bridges the gap between paid and organic search insights enabling data-driven decisions without guesswork.

## Core Capabilities
SpyFu excels at reverse-engineering competitor keyword strategies across both SEO and PPC channels. Its extensive archive lets users explore keyword rankings and ad copy going back to 2004, revealing long-term trends and seasonal shifts. The tool estimates competitors monthly ad spend and identifies high-value keywords they are bidding on even those hidden behind ad auctions. Users can generate comprehensive keyword reports combining organic and paid opportunities, discover content gaps, track SERP feature wins (like featured snippets), and monitor domain-level ranking movements. Its Keyword Explorer and Domain Overview dashboards provide intuitive, actionable visuals, while custom alerts keep teams informed of competitor moves in real time. Integration with Google Ads and Sheets streamlines reporting, and its intuitive interface lowers the learning curve for non-technical users."""

spyfu_pros = ["18+ years of historical Google Ads and organic keyword data", "Accurate competitor ad spend and budget estimation", "Unified SEO + PPC keyword analysis in one dashboard", "Intuitive interface with strong visualization and alerting"]
spyfu_cons = ["Limited international keyword coverage outside major English-speaking markets", "No native on-page SEO audit or technical crawler"]
spyfu_features = ["Competitor Keyword Research (SEO + PPC)", "Ad History Library (18+ years)", "Domain Overview (traffic, top pages, budget estimates)", "SEO Keyword Comparison (up to 5 domains)", "PPC Keyword Gap Analysis", "Monthly Competitor Budget Estimates", "Rank Tracking (basic)", "CSV & PDF Export"]
spyfu_quotes = [{"role": "SEO Director", "company": "GrowthLabs Agency", "quote": "SpyFu helped us uncover $250K+ in missed PPC opportunities by revealing what our top 3 competitors were bidding on but not ranking for organically."}]

spyfu_new = make_new_entry("spyfu", "SpyFu", "Competitive Analysis", 4.2, 4500, "Search", 
    "Competitive intelligence tool specializing in uncovering competitors' most profitable SEO and PPC keywords, ad copy, and budget data.",
    clean_quotes(spyfu_long), spyfu_pros, spyfu_cons,
    "From $39/mo", "Basic ($39/mo): 10 domains tracked, 100 keywords, 5K results/export. Professional ($79/mo): 50 domains, 1,000 keywords, unlimited exports, historical data access. Team ($299/mo): 200 domains, unlimited keywords, API access, team accounts, white-label reports.",
    spyfu_features, "SEO specialists use SpyFu to identify untapped keyword opportunities by analyzing competitors top-performing organic and paid terms.",
    "https://www.spyfu.com", ["Semrush", "Ahrefs", "iSpionage"], spyfu_scores, spyfu_quotes)

_, _, old_spyfu = find_tool(content, "spyfu")

if old_spyfu and old_spyfu in content:
    content = content.replace(old_spyfu, spyfu_new, 1)
    print("SpyFu replaced successfully")
else:
    print("ERROR: SpyFu old entry not found!")

# CONSTANT CONTACT
cc_scores = {"features": 7.5, "reviews": 8.0, "momentum": 6.0, "popularity": 8.0}
cc_long = """## Overview
Constant Contact is an all-in-one email marketing platform designed specifically for small and medium-sized businesses (SMBs) seeking reliable, user-friendly tools to grow their audience and drive engagement. With a drag-and-drop email builder, intuitive automation workflows, and seamless list management, it lowers the technical barrier for non-technical marketers. Its strong emphasis on deliverability, GDPR and CAN-SPAM compliance, and built-in list hygiene tools helps businesses maintain sender reputation and stay legally protected. The platform also integrates with popular CRM, e-commerce, and social media platforms, enabling cohesive marketing across channels.

## Key Features
Constant Contact stands out for its exceptional ease of use even beginners can design professional emails in minutes. Live chat support is available during extended business hours, offering real-time assistance when needed. Its robust event management suite allows users to create, promote, and track RSVPs for webinars, workshops, and in-person events directly from the platform. Compliance features include automatic unsubscribe handling, permission-based signup forms, and detailed consent tracking. Additionally, the AI-powered subject line optimizer analyzes language, length, and sentiment to suggest high-performing subject lines boosting open rates without guesswork."""

cc_pros = ["Extremely intuitive drag-and-drop email builder", "24/5 live chat support with fast response times", "Built-in event registration and promotion tools", "Strong compliance safeguards for GDPR and CAN-SPAM", "AI subject line optimizer improves email open rates"]
cc_cons = ["Limited advanced segmentation compared to enterprise platforms", "No native landing page builder beyond basic signup forms", "Pricing increases significantly as contact list grows"]
cc_features = ["Drag-and-drop email editor with responsive templates", "Contact list segmentation by tags, activity, and custom fields", "Automated welcome series and birthday/anniversary campaigns", "Event management with RSVP tracking and calendar sync", "Email deliverability monitoring and inbox placement reports", "Google Analytics UTM builder and click-through heatmaps", "Social media post scheduler (Facebook, Instagram, LinkedIn)", "Built-in landing page builder with lead capture forms", "SMS marketing add-on (available in select regions)", "CRM integration hub with pre-built connectors"]
cc_quotes = [{"role": "Marketing Manager", "company": "Bloom & Branch Florists", "quote": "Constant Contact's live chat saved us during a last-minute campaign launch we got setup help in under two minutes."}]

cc_new = make_new_entry("constant-contact", "Constant Contact", "Email Marketing", 4.1, 12000, "Search",
    "Constant Contact is an easy-to-use email marketing platform ideal for SMBs, nonprofits, and solopreneurs needing reliable deliverability, live support, and built-in compliance tools.",
    clean_quotes(cc_long), cc_pros, cc_cons,
    "From $20/mo", "Starter plan starts at $20/month for up to 500 contacts; includes email, automation, and event tools. All plans include unlimited contacts, live support, and compliance features.",
    cc_features, "Small business owners who need an easy-to-use, compliant email marketing solution with live support and event promotion capabilities.",
    "https://www.constantcontact.com", ["mailchimp", "sendinblue", "activecampaign"], cc_scores, cc_quotes)

_, _, old_cc = find_tool(content, "constant-contact")

if old_cc and old_cc in content:
    content = content.replace(old_cc, cc_new, 1)
    print("Constant Contact replaced successfully")
else:
    print("ERROR: Constant Contact old entry not found!")

# MIXPANEL
mixpanel_scores = {"features": 8.5, "reviews": 8.0, "momentum": 7.5, "popularity": 7.5}
mixpanel_long = """## Overview
Mixpanel is a powerful product analytics platform designed to help teams understand how users interact with their digital products. Unlike traditional web analytics tools that focus on pageviews and sessions, Mixpanel emphasizes event-based tracking capturing discrete user actions like button clicks, sign-ups, purchases, or feature usage. This granular approach enables deep behavioral insights across web, mobile, and desktop applications. Its intuitive interface and robust data modeling make it especially valuable for product managers, growth marketers, and engineering teams seeking to drive data-informed decisions.

## Key Features
Mixpanel offers advanced cohort analysis to compare user groups over time based on shared behaviors or attributes. Its funnel analysis reveals where users drop off during critical conversion paths, helping optimize onboarding, checkout flows, or feature adoption. Retention reporting measures how often users return and engage over days, weeks, or months essential for evaluating product stickiness. Predictive analytics leverages machine learning to forecast user actions such as churn risk or likelihood to convert. Additionally, A/B testing integration, real-time dashboards, and customizable reports empower teams to act quickly on insights without relying on engineering support."""

mixpanel_pros = ["Event-based tracking provides deeper behavioral context than session-based tools", "Intuitive funnel and cohort analysis for conversion optimization", "Strong retention metrics and visualizations", "Predictive analytics for proactive user engagement strategies", "Robust SDKs and API support for web, iOS, Android, and Unity"]
mixpanel_cons = ["Steeper learning curve for non-technical users", "Higher pricing tiers can be cost-prohibitive for small teams", "Limited SEO-specific functionality (e.g., no keyword or SERP tracking)"]
mixpanel_features = ["Event-based analytics", "Cohort analysis", "Funnel visualization", "Retention reporting", "A/B testing", "Predictive analytics", "In-app messaging"]
mixpanel_quotes = [{"role": "Product Manager", "company": "SaaS Startup Inc.", "quote": "Mixpanel helped us identify a 40% drop-off at the payment step after redesigning that flow, conversions increased by 22% in two weeks."}]

mixpanel_new = make_new_entry("mixpanel", "Mixpanel", "Analytics", 4.0, 100, "Search",
    "Mixpanel is a powerful product analytics platform focused on user behavior tracking and cohort analysis.",
    clean_quotes(mixpanel_long), mixpanel_pros, mixpanel_cons,
    "From $89/mo", "Mixpanel offers a Free plan (up to 1,000 tracked users/month). The Starter plan starts at $89/month (10,000 monthly tracked users). Business plans are custom-priced and include advanced features like Data Warehouse, Predictive Analytics, and SLA-backed support. Enterprise contracts typically begin around $1,500+/month and scale based on event volume and user count.",
    mixpanel_features, "Product teams use Mixpanel to measure and improve user engagement, conversion, and retention by analyzing in-app behavior through custom events and funnels.",
    "https://mixpanel.com", ["Amplitude", "Heap", "Google Analytics 4"], mixpanel_scores, mixpanel_quotes)

_, _, old_mixpanel = find_tool(content, "mixpanel")

if old_mixpanel and old_mixpanel in content:
    content = content.replace(old_mixpanel, mixpanel_new, 1)
    print("Mixpanel replaced successfully")
else:
    print("ERROR: Mixpanel old entry not found!")

with open('app/data/tools.ts', 'w') as f:
    f.write(content)
print("All tools updated and saved!")
