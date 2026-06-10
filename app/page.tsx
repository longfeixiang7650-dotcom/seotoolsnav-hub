"use client";

import { useState, useMemo } from "react";
import { Search, Star, ArrowUpRight, ChevronRight, BookOpen, BarChart3, Users, Zap } from "lucide-react";
import Link from "next/link";

// Tools data for static rendering on homepage
const ALL_TOOLS = [
  { id: "semrush", name: "Semrush", category: "SEO Tools", rating: 4.6, reviews: 14200, description: "All-in-one SEO toolkit for keyword research, competitive analysis, and site audits." },
  { id: "ahrefs", name: "Ahrefs", category: "SEO Tools", rating: 4.5, reviews: 9800, description: "Industry-standard backlink analysis and keyword research platform." },
  { id: "moz", name: "Moz Pro", category: "SEO Tools", rating: 4.3, reviews: 7600, description: "Comprehensive SEO software suite with domain authority metrics." },
  { id: "screaming-frog", name: "Screaming Frog", category: "Technical SEO", rating: 4.6, reviews: 3200, description: "Powerful website crawler for technical SEO audits." },
  { id: "google-search-console", name: "Google Search Console", category: "SEO Tools", rating: 4.7, reviews: 28500, description: "Free Google tool for monitoring search performance and indexing." },
  { id: "surfer-seo", name: "Surfer SEO", category: "Content Optimization", rating: 4.5, reviews: 4100, description: "AI-powered content optimization platform for better rankings." },
  { id: "kwfinder", name: "KWFinder", category: "Keyword Research", rating: 4.5, reviews: 2800, description: "Long-tail keyword research tool with accurate search volumes." },
  { id: "answer-public", name: "AnswerThePublic", category: "Keyword Research", rating: 4.4, reviews: 3500, description: "Visual keyword discovery tool based on search autocomplete data." },
  { id: "screpy", name: "Screpy", category: "Technical SEO", rating: 4.3, reviews: 1200, description: "AI-based SEO analysis and monitoring platform." },
  { id: "spyfu", name: "SpyFu", category: "Competitive Analysis", rating: 4.2, reviews: 4500, description: "Competitive intelligence tool for SEO and PPC research." },
  { id: "wincher", name: "Wincher", category: "Rank Tracking", rating: 4.4, reviews: 900, description: "Real-time keyword rank tracking with accurate position data." },
  { id: "se-ranking", name: "SE Ranking", category: "All-in-One", rating: 4.5, reviews: 5200, description: "Affordable all-in-one SEO platform with white-label reporting." },
];

const FEATURED_POSTS = [
  { slug: "keyword-research-guide-2026", title: "Keyword Research Guide 2026", excerpt: "Master keyword research with the latest tools and data-driven strategies.", date: "June 2026" },
  { slug: "seo-trends-2026", title: "Top SEO Trends Transforming 2026", excerpt: "AI search, E-E-A-T, and the death of traditional link building.", date: "May 2026" },
  { slug: "seo-tools-comparison-2026", title: "Best SEO Tools Compared 2026", excerpt: "Semrush vs Ahrefs vs Moz — which platform wins?", date: "May 2026" },
];

const STATS = [
  { label: "Tools Reviewed", value: "50+" },
  { label: "Expert Comparisons", value: "12+" },
  { label: "Categories Covered", value: "8" },
  { label: "G2 Ratings Sourced", value: "4,200+" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(ALL_TOOLS.map((t) => t.category))];
    return cats;
  }, []);

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter(
      (t) =>
        (activeCategory === "All" || t.category === activeCategory) &&
        (t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, activeCategory]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-blue-700">50+ SEO Tools Compared</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Find the Right{" "}
              <span className="gradient-text">SEO Tools</span>
              <br />
              for Your Business
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Independent, data-driven reviews of the best SEO and marketing platforms.
              Compare features, pricing, and real user ratings — all in one place.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search SEO tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 shadow-sm text-base"
                />
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter + Tool Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Explore Tools</h2>
            <Link href="/tools" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tool Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="group bg-white border border-slate-200 rounded-xl p-5 card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-slate-700">{tool.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-3">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {tool.category}
                  </span>
                  <span className="text-xs text-slate-400">{tool.reviews.toLocaleString()} reviews</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">50+</p>
                <p className="text-xs text-slate-500">Tools Reviewed</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">12+</p>
                <p className="text-xs text-slate-500">Expert Guides</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">8</p>
                <p className="text-xs text-slate-500">Categories</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">4,200+</p>
                <p className="text-xs text-slate-500">G2 Reviews Analyzed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Latest from Our Blog</h2>
            <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              All Posts <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-6 card-hover"
              >
                <p className="text-xs text-slate-400 mb-2">{post.date}</p>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium mt-3 group-hover:gap-1.5 transition-all">
                  Read More <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
