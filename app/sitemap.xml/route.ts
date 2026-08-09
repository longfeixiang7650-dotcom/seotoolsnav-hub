import { MetadataRoute } from "next";

const BLOG_SLUGS = [
  "10-seo-mistakes-killing-traffic-2026",
  "ahrefs-vs-semrush-vs-moz-2026",
  "ahrefs-vs-semrush-vs-moz-agency-seo-tools-2026",
  "ai-overviews-generative-search-seo-2026",
  "ai-seo-automation-tools-2026",
  "ai-seo-content-clustering-topic-authority-2026",
  "backlink-analysis-tools-comparison-2026-ahrefs-moz-semrush",
  "behavioral-analytics-seo-conversion-2026",
  "content-optimization-tools-comparison-2026-surfer-frase-clearscope-marketmuse",
  "core-web-vitals-optimization-guide-2026",
  "ecommerce-seo-strategy-2026-product-page-optimization",
  "eeat-signals-content-authority-seo-2026",
  "enterprise-seo-platforms-comparison-2026",
  "enterprise-seo-tool-stack-2026",
  "free-seo-tools-2026-guide",
  "ga4-vs-matomo-vs-plausible-2026",
  "google-algorithm-updates-2026-impact-seo-strategy",
  "how-to-do-a-complete-seo-audit-in-2026",
  "internal-linking-strategy-2026-definitive-guide",
  "international-seo-multilingual-website-hreflang-ccs-geotargeting-2026",
  "keyword-research-guide-2026",
  "link-building-strategies-2026",
  "link-building-strategies-2026-proven-tactics",
  "local-seo-small-business-2026",
  "local-seo-strategy-guide-2026",
  "match-seo-tools-to-specific-jobs-2026",
  "on-page-seo-2026-advanced-techniques",
  "programmatic-seo-automation-strategies",
  "schema-markup-implementation-guide-2026",
  "semrush-vs-ahrefs-detailed-comparison-2026",
  "seo-analytics-reporting-tools-2026-measure-what-matters",
  "seo-automation-tools-2026-ai-workflows",
  "seo-automation-tools-2026-ai-workflows-review",
  "seo-automation-tools-comparison-2026-ai-workflows",
  "seo-automation-tools-workflows-2026",
  "seo-complete-guide-2026",
  "seo-content-optimization-entity-based-strategy-2026",
  "seo-content-optimization-guide-2026",
  "seo-content-refresh-historically-optimized-2026",
  "seo-content-strategy-2026",
  "seo-crawler-tools-comparison-screaming-frog-sitebulb-invicti",
  "seo-for-ai-generated-content-2026",
  "seo-kpi-dashboard-2026",
  "seo-ranking-factors-2026",
  "seo-tool-integrations-apis-workflow-2026",
  "seo-tools-comparison-2026",
  "seo-tools-free-vs-paid-2026",
  "seo-trends-2026",
  "technical-seo-audit-checklist-2026",
  "technical-seo-audit-checklist-2026-practical-walkthrough",
  "technical-seo-audit-checklist-2026-tools-methodology",
  "technical-seo-audit-checklist-step-by-step-2026",
  "technical-seo-audit-guide-crawl-analyze-fix-2026",
  "technical-seo-audit-showdown-screaming-frog-sitebulb-semrush-2026",
  "technical-seo-fundamentals-2026-core-web-vitals-inp",
  "top-seo-tools-keyword-research-2026",
  "video-seo-2026-youtube-ranking-guide",
  "voice-search-optimization-strategies-2026",
  "winning-featured-snippets-zero-click-search-2026",
  "seo-split-testing-tools-2026",
  "image-seo-optimization-guide-2026",
  "internal-linking-audit-playbook-2026",
] as const;

const TOOL_SLUGS = [
  "semrush",
  "ahrefs",
  "moz",
  "kwfinder",
  "google-search-console",
  "screaming-frog",
  "spyfu",
  "google-keyword-planner",
  "surfer-seo",
  "ubersuggest",
  "answer-public",
  "se-ranking",
  "marketmuse",
  "frase",
  "majestic",
  "buzzsumo",
  "semrush-backlink",
  "ahrefs-backlink",
  "moz-link-explorer",
  "contentstudio",
  "linkresearchtools",
  "hootsuite",
  "buffer",
  "mailchimp",
  "constant-contact",
  "sprout-social",
  "later",
  "sendinblue",
  "hubspot-marketing-hub",
  "meetedgar",
  "activecampaign",
  "google-ads",
  "adespresso",
  "google-analytics",
  "hotjar",
  "mixpanel",
  "amplitude",
  "microsoft-advertising",
  "kissmetrics",
  "wordstream-advisor",
  "clearscope",
] as const;

const CATEGORY_SLUGS = [
  "analytics",
    "backlink-analysis",
    "content-marketing",
    "email-marketing",
    "keyword-research",
    "ppc-and-advertising",
    "seo-tools",
    "social-media-management",
  "match-seo-tools-to-specific-jobs-2026",
] as const;

export async function GET() {
  const baseUrl = "https://seotoolsnav.net";

  const urls: string[] = [];

  urls.push(`<url><loc>${baseUrl}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/disclosure</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);

  for (const slug of CATEGORY_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/category/${slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }

  for (const slug of BLOG_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/blog/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }

  for (const slug of TOOL_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/tools/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
