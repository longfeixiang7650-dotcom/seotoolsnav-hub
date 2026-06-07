import { MetadataRoute } from "next";

const BLOG_SLUGS = [
  "keyword-research-guide-2026",
  "best-seo-tools-2026",
];

const TOOL_SLUGS = [
  "semrush", "ahrefs", "moz", "google-search-console", "google-keyword-planner",
  "screaming-frog", "majestic", "se-ranking", "ubersuggest", "kwfinder",
  "keywordtool-io", "surfer-seo", "clearscope", "marketmuse", "frase-io",
  "answer-the-public", "spyfu", "similarweb", "serpstat", "mangools",
  "linkody", "cognitive-seo", "sitebulb", "deepcrawl", "woorank",
  "seoptimer", "niche-relevant", "buzzsumo", "ranktracker", "accu-rank",
  "small-seo-tools", "seo-review-tools", "xml-sitemaps", "redirect-checker",
  "dareboost", "gtmetrix", "webpagetest", "google-pagespeed-insights",
  "pingdom", "litmus", "hunter-io", "mail-tester", "copyscape",
  "sucuri", "wordfence", "sematext", "open-site-explorer",
  "google-tag-assistant", "ahrefs-webmaster-tools", "google-trends",
]

export async function GET() {
  const baseUrl = "https://seotoolsnav.net";

  const staticPages = [
    { url: `${baseUrl}`, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.5 },
    { url: `${baseUrl}/privacy`, priority: 0.4 },
    { url: `${baseUrl}/terms`, priority: 0.4 },
    { url: `${baseUrl}/disclosure`, priority: 0.3 },
    { url: `${baseUrl}/faq`, priority: 0.6 },
  ];

  const toolPages = TOOL_SLUGS.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    priority: 0.8,
  }));

  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...toolPages, ...blogPages];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
