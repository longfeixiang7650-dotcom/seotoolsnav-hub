"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are SEO tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO tools are software platforms that help analyze, optimize, and track a website's search engine performance. They automate tasks like keyword research, competitor analysis, site audits, backlink monitoring, and rank tracking — saving hours of manual work. Popular tools include Google Search Console for organic performance data, Ahrefs for backlink analysis, Semrush for comprehensive SEO and paid search, and Moz for domain authority scoring. Modern SEO tools also surface technical issues like slow page speed, broken links, and duplicate content that hurt rankings.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need multiple SEO tools or is one enough?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single all-in-one platform like Semrush or Ahrefs covers keyword research, backlink analysis, rank tracking, and site audits — enough for most small to mid-size businesses. However, specialists often layer niche tools on top: Screaming Frog for deep technical crawls, Surfer SEO for on-page content optimization, and Google Search Console for free first-party data. Using multiple tools helps cross-validate data, but if you're just starting out, one comprehensive tool plus Google Search Console is sufficient.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between on-page and off-page SEO tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On-page SEO tools analyze and optimize elements on your own website — meta tags, headings, content structure, internal links, and page speed. Examples include Yoast SEO (WordPress plugin), Surfer SEO (content scoring), and PageSpeed Insights (Google's performance checker). Off-page SEO tools focus on external factors that influence authority and trust, primarily backlink analysis and competitor link research. Ahrefs and Majestic specialize in off-page signals like link profiles, while Semrush bridges both worlds. You need both sets of tools for a complete SEO strategy.",
      },
    },
    {
      "@type": "Question",
      name: "Are free SEO tools effective?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free SEO tools are highly effective for foundational tasks but come with limits. Google Search Console and Google Analytics 4 (GA4) are essential and free — they provide click-through rates, query data, and user behavior insights at no cost. AnswerThePublic reveals question-based keywords, and Ubersuggest offers limited keyword data. The trade-off: free tiers cap daily searches (often 3–10 queries), lack historical data, and skip advanced features like API access or white-label reporting. For serious SEO, invest in a paid tool like Semrush or Ahrefs, but start with free tools to learn the basics.",
      },
    },
    {
      "@type": "Question",
      name: "Which SEO tool is best for keyword research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For keyword research, Semrush and Ahrefs lead the pack. Semrush's Keyword Magic Tool generates thousands of related keywords with difficulty scores, volume trends, and SERP features — ideal for building content clusters. Ahrefs' Keywords Explorer provides click metrics (how many clicks a #1 result actually gets), which is invaluable for estimating traffic potential. Low-cost alternatives include KWFinder by Mangools (intuitive UI, good for local SEO) and Google Keyword Planner (free, but limited to AdWords data). The best choice depends on your budget and whether you need global or local keyword data.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I run an SEO audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a comprehensive SEO audit monthly — that's the sweet spot for catching technical issues like broken links, crawl errors, and duplicate content before they impact rankings. Tools like Semrush's Site Audit or Ahrefs' Web Audit can be scheduled to run automatically on a weekly or bi-weekly basis for larger sites. For content audits (analyzing underperforming pages for improvement), do a deeper review quarterly. After major site changes (redesigns, migrations, or domain changes), run an audit immediately. Small sites can get away with quarterly full audits, but monthly is safer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between SEO and SEM tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO (Search Engine Optimization) tools focus on organic, unpaid traffic — improving rankings through content, technical fixes, and backlinks. SEM (Search Engine Marketing) tools manage paid advertising campaigns, including Google Ads bid management, ad copy testing, and PPC keyword analysis. Semrush is unique in offering both: its SEO toolkit handles rank tracking and site audits, while its PPC toolkit manages ad spend and competitor ad research. Google Ads Editor is pure SEM. Most businesses need separate strategies and tools for each, though integrated platforms help align organic and paid efforts.",
      },
    },
    {
      "@type": "Question",
      name: "Can SEO tools guarantee a #1 Google ranking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No legitimate SEO tool can guarantee a #1 ranking — and any provider that promises this is misleading you. Google's algorithm considers over 200 ranking factors including competitor activity, user engagement signals, and ever-changing updates (like the helpful content update). SEO tools provide data-driven recommendations and competitive insights, but execution, quality content, and domain authority ultimately determine rankings. Think of tools as your GPS — they show the route, but you still have to drive. Focus on consistent improvements rather than chasing guarantees.",
      },
    },
    {
      "@type": "Question",
      name: "How do backlink analysis tools work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Backlink analysis tools like Ahrefs, Moz Link Explorer, and Majestic maintain massive link indexes by continuously crawling the web. When you enter a URL, they reveal every external site linking to it, the anchor text used, the authority (Domain Rating in Ahrefs, Domain Authority in Moz, Trust Flow in Majestic), and whether links are dofollow or nofollow. You can analyze competitor backlink profiles to find link-building opportunities, identify toxic links to disavow, and track new and lost backlinks over time. The bigger the tool's index, the more accurate the analysis.",
      },
    },
    {
      "@type": "Question",
      name: "What SEO metrics matter most for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small businesses should focus on a handful of actionable metrics. Organic traffic and conversion rate (from Google Analytics 4) tell you if your SEO is driving real business value. Keyword position tracking (via Semrush or Ahrefs) shows whether you're gaining visibility for money terms. Core Web Vitals (LCP, FID, CLS) — measured by Google Search Console — affect rankings directly. Backlink growth rate (new referring domains per month) is a leading indicator of authority building. Ignore vanity metrics like total backlinks and focus on conversions and local pack visibility if you serve a specific geographic area.",
      },
    },
    {
      "@type": "Question",
      name: "Are all-in-one SEO platforms worth the cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All-in-one platforms like Semrush (starts at $129.95/month) and Ahrefs (starts at $129/month) offer excellent value if you use multiple features — keyword research, site audits, rank tracking, competitor analysis, and backlink monitoring under one roof. The cost is 2–3x a niche tool like KWFinder ($49/month) or Screaming Frog (free with paid upgrade), but you avoid juggling five separate subscriptions and dealing with fragmented data. For agencies and serious in-house marketers, the consolidation and workflow integration justify the premium. For hobby sites, niche tools are more cost-effective.",
      },
    },
    {
      "@type": "Question",
      name: "How do content marketing tools differ from SEO tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Content marketing tools focus on creating, distributing, and measuring content performance — examples include HubSpot (editorial calendar and lead gen), CoSchedule (content organization), and Grammarly (writing polish). SEO tools focus on optimizing that content for search engines. However, the lines blur: Surfer SEO sits at the intersection, scoring content against top-ranking pages for specific keywords. Semrush's SEO Content Template suggests word count, readability, and related terms based on SERP analysis. For best results, use content tools to plan and produce, then SEO tools to optimize and measure organic performance.",
      },
    },
  ],
};

const FAQ_ITEMS = [
  {
    question: "What are SEO tools?",
    answer:
      "SEO tools are software platforms that help analyze, optimize, and track a website's search engine performance. They automate tasks like keyword research, competitor analysis, site audits, backlink monitoring, and rank tracking — saving hours of manual work. Popular tools include Google Search Console for organic performance data, Ahrefs for backlink analysis, Semrush for comprehensive SEO and paid search, and Moz for domain authority scoring. Modern SEO tools also surface technical issues like slow page speed, broken links, and duplicate content that hurt rankings.",
  },
  {
    question: "Do I need multiple SEO tools or is one enough?",
    answer:
      "A single all-in-one platform like Semrush or Ahrefs covers keyword research, backlink analysis, rank tracking, and site audits — enough for most small to mid-size businesses. However, specialists often layer niche tools on top: Screaming Frog for deep technical crawls, Surfer SEO for on-page content optimization, and Google Search Console for free first-party data. Using multiple tools helps cross-validate data, but if you're just starting out, one comprehensive tool plus Google Search Console is sufficient.",
  },
  {
    question: "What's the difference between on-page and off-page SEO tools?",
    answer:
      "On-page SEO tools analyze and optimize elements on your own website — meta tags, headings, content structure, internal links, and page speed. Examples include Yoast SEO (WordPress plugin), Surfer SEO (content scoring), and PageSpeed Insights (Google's performance checker). Off-page SEO tools focus on external factors that influence authority and trust, primarily backlink analysis and competitor link research. Ahrefs and Majestic specialize in off-page signals like link profiles, while Semrush bridges both worlds. You need both sets of tools for a complete SEO strategy.",
  },
  {
    question: "Are free SEO tools effective?",
    answer:
      "Free SEO tools are highly effective for foundational tasks but come with limits. Google Search Console and Google Analytics 4 (GA4) are essential and free — they provide click-through rates, query data, and user behavior insights at no cost. AnswerThePublic reveals question-based keywords, and Ubersuggest offers limited keyword data. The trade-off: free tiers cap daily searches (often 3–10 queries), lack historical data, and skip advanced features like API access or white-label reporting. For serious SEO, invest in a paid tool like Semrush or Ahrefs, but start with free tools to learn the basics.",
  },
  {
    question: "Which SEO tool is best for keyword research?",
    answer:
      "For keyword research, Semrush and Ahrefs lead the pack. Semrush's Keyword Magic Tool generates thousands of related keywords with difficulty scores, volume trends, and SERP features — ideal for building content clusters. Ahrefs' Keywords Explorer provides click metrics (how many clicks a #1 result actually gets), which is invaluable for estimating traffic potential. Low-cost alternatives include KWFinder by Mangools (intuitive UI, good for local SEO) and Google Keyword Planner (free, but limited to AdWords data). The best choice depends on your budget and whether you need global or local keyword data.",
  },
  {
    question: "How often should I run an SEO audit?",
    answer:
      "Run a comprehensive SEO audit monthly — that's the sweet spot for catching technical issues like broken links, crawl errors, and duplicate content before they impact rankings. Tools like Semrush's Site Audit or Ahrefs' Web Audit can be scheduled to run automatically on a weekly or bi-weekly basis for larger sites. For content audits (analyzing underperforming pages for improvement), do a deeper review quarterly. After major site changes (redesigns, migrations, or domain changes), run an audit immediately. Small sites can get away with quarterly full audits, but monthly is safer.",
  },
  {
    question: "What is the difference between SEO and SEM tools?",
    answer:
      "SEO (Search Engine Optimization) tools focus on organic, unpaid traffic — improving rankings through content, technical fixes, and backlinks. SEM (Search Engine Marketing) tools manage paid advertising campaigns, including Google Ads bid management, ad copy testing, and PPC keyword analysis. Semrush is unique in offering both: its SEO toolkit handles rank tracking and site audits, while its PPC toolkit manages ad spend and competitor ad research. Google Ads Editor is pure SEM. Most businesses need separate strategies and tools for each, though integrated platforms help align organic and paid efforts.",
  },
  {
    question: "Can SEO tools guarantee a #1 Google ranking?",
    answer:
      "No legitimate SEO tool can guarantee a #1 ranking — and any provider that promises this is misleading you. Google's algorithm considers over 200 ranking factors including competitor activity, user engagement signals, and ever-changing updates (like the helpful content update). SEO tools provide data-driven recommendations and competitive insights, but execution, quality content, and domain authority ultimately determine rankings. Think of tools as your GPS — they show the route, but you still have to drive. Focus on consistent improvements rather than chasing guarantees.",
  },
  {
    question: "How do backlink analysis tools work?",
    answer:
      "Backlink analysis tools like Ahrefs, Moz Link Explorer, and Majestic maintain massive link indexes by continuously crawling the web. When you enter a URL, they reveal every external site linking to it, the anchor text used, the authority (Domain Rating in Ahrefs, Domain Authority in Moz, Trust Flow in Majestic), and whether links are dofollow or nofollow. You can analyze competitor backlink profiles to find link-building opportunities, identify toxic links to disavow, and track new and lost backlinks over time. The bigger the tool's index, the more accurate the analysis.",
  },
  {
    question: "What SEO metrics matter most for small businesses?",
    answer:
      "Small businesses should focus on a handful of actionable metrics. Organic traffic and conversion rate (from Google Analytics 4) tell you if your SEO is driving real business value. Keyword position tracking (via Semrush or Ahrefs) shows whether you're gaining visibility for money terms. Core Web Vitals (LCP, FID, CLS) — measured by Google Search Console — affect rankings directly. Backlink growth rate (new referring domains per month) is a leading indicator of authority building. Ignore vanity metrics like total backlinks and focus on conversions and local pack visibility if you serve a specific geographic area.",
  },
  {
    question: "Are all-in-one SEO platforms worth the cost?",
    answer:
      "All-in-one platforms like Semrush (starts at $129.95/month) and Ahrefs (starts at $129/month) offer excellent value if you use multiple features — keyword research, site audits, rank tracking, competitor analysis, and backlink monitoring under one roof. The cost is 2–3x a niche tool like KWFinder ($49/month) or Screaming Frog (free with paid upgrade), but you avoid juggling five separate subscriptions and dealing with fragmented data. For agencies and serious in-house marketers, the consolidation and workflow integration justify the premium. For hobby sites, niche tools are more cost-effective.",
  },
  {
    question: "How do content marketing tools differ from SEO tools?",
    answer:
      "Content marketing tools focus on creating, distributing, and measuring content performance — examples include HubSpot (editorial calendar and lead gen), CoSchedule (content organization), and Grammarly (writing polish). SEO tools focus on optimizing that content for search engines. However, the lines blur: Surfer SEO sits at the intersection, scoring content against top-ranking pages for specific keywords. Semrush's SEO Content Template suggests word count, readability, and related terms based on SERP analysis. For best results, use content tools to plan and produce, then SEO tools to optimize and measure organic performance.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ Schema structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
              FAQ
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#8BA3BE] max-w-xl mx-auto leading-relaxed">
              Everything you need to know about SEO and marketing tools — from choosing the right
              platforms to understanding audits, backlinks, keyword research, and industry best practices.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#162440] transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[#F0F4F8] font-medium pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-[#8BA3BE] leading-relaxed text-sm border-t border-[#1E3A5F] pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-[#8BA3BE] text-sm">
              Still have questions?{" "}
              <a
                href="/contact"
                className="text-[#3B82F6] hover:underline font-medium"
              >
                Contact our team
              </a>{" "}
              and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
