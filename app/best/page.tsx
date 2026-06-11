import type { Metadata } from "next";
import Link from "next/link";
import { ALL_TOOLS } from "@/data/tools";
import {
  Star,
  ChevronRight,
  Sparkles,
  Search,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category)));

function slugify(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export const metadata: Metadata = {
  title: "Best SEO & Marketing Tools 2026 — Expert Comparisons",
  description:
    "Discover the best SEO tools, keyword research platforms, backlink analysis software, content marketing tools, and more. Expert comparisons with verified reviews and pricing.",
  keywords: [
    "best SEO tools 2026",
    "top marketing tools",
    "SEO software comparison",
    "best keyword research tools",
    "backlink analysis tools",
    "content marketing platforms",
  ],
  openGraph: {
    title: "Best SEO & Marketing Tools in 2026 — Expert Picks",
    description:
      "Compare top-rated SEO and marketing platforms side-by-side. Detailed reviews, verified user ratings, and transparent pricing — all in one place.",
  },
};

export default function BestPage() {
  // Build category stats
  const categoryStats = ALL_CATEGORIES.map((cat) => {
    const tools = ALL_TOOLS.filter((t) => t.category === cat).sort(
      (a, b) => b.rating - a.rating
    );
    const topTool = tools[0];
    const avgRating =
      tools.reduce((sum, t) => sum + t.rating, 0) / tools.length;
    return {
      category: cat,
      slug: slugify(cat),
      toolCount: tools.length,
      avgRating: avgRating,
      topTool: topTool,
    };
  }).sort((a, b) => b.toolCount - a.toolCount);

  const totalTools = ALL_TOOLS.length;
  const totalCategories = ALL_CATEGORIES.length;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                {totalCategories} Categories · {totalTools} Tools Compared
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Best Software Tools{" "}
              <span className="gradient-text">in 2026</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Independent, data-driven comparisons of the best SEO and marketing
              platforms. Browse by category, compare features and pricing, and
              find the perfect tool for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryStats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best/${cat.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-6 card-hover hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                      Best {cat.category} Software
                    </h2>
                    <p className="text-sm text-slate-500">
                      {cat.toolCount} tools compared · Avg rating{" "}
                      {cat.avgRating.toFixed(1)}/5
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Top pick */}
                {cat.topTool && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <span className="text-xs text-slate-700">
                      <span className="font-semibold">Top Pick:</span>{" "}
                      {cat.topTool.name}{" "}
                      <span className="text-slate-400">
                        ({cat.topTool.rating}/5)
                      </span>
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1 text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                  View Comparison <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Quick List */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            All Reviewed Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {ALL_TOOLS.sort((a, b) => b.rating - a.rating).map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">
                    {tool.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-slate-600">
                    {tool.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Use our search to find the perfect tool for your specific needs,
              or browse all categories.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-colors"
            >
              <Search className="w-4 h-4" /> Browse All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
