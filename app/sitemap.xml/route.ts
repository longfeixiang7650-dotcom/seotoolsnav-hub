import { MetadataRoute } from "next";

const BLOG_SLUGS = ["technical-seo-audit-checklist-2026", "keyword-research-guide-2026", "seo-trends-2026",
  "seo-content-strategy-2026", "seo-tools-comparison-2026",
  "ga4-vs-matomo-vs-plausible-2026", "ahrefs-vs-semrush-vs-moz-2026",
  "seo-content-optimization-entity-based-strategy-2026",
  "seo-ranking-factors-2026", "technical-seo-audit-checklist-step-by-step-2026",
  "local-seo-small-business-2026", "seo-content-optimization-guide-2026",
  "link-building-strategies-2026",
  "seo-complete-guide-2026",
  "seo-automation-tools-workflows-2026",
  "seo-kpi-dashboard-2026",
  "on-page-seo-2026-advanced-techniques",
  "technical-seo-fundamentals-2026-core-web-vitals-inp",
  "semrush-vs-ahrefs-detailed-comparison-2026",
  "ai-seo-automation-tools-2026",
  "10-seo-mistakes-killing-traffic-2026",
  "top-seo-tools-keyword-research-2026",
  "ai-seo-content-clustering-topic-authority-2026"] as const;

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
