import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — SEO Tools Nav",
  description:
    "Learn about the team behind SEO Tools Nav. We're a small software studio based in Bremen, Germany, building tools to help businesses navigate the SEO software landscape.",
};

const TEAM = [
  {
    name: "Lars Miller",
    role: "Founder & CEO",
    bio: "Lars has been building SaaS products since 2015. Before founding Pebble Forge, he led product teams at几家德国电商公司。He founded SEO Tools Nav after spending years evaluating SEO tools for his own projects and realizing how hard it was to find unbiased, structured comparisons.",
  },
  {
    name: "Colette Rivera",
    role: "Co-Founder & CTO",
    bio: "Colette brings over a decade of full-stack development experience to the team. She oversees the technical architecture of SEO Tools Nav, ensuring fast load times, clean data pipelines, and a seamless user experience across devices.",
  },
  {
    name: "Noah Ryan",
    role: "Product Manager",
    bio: "Noah focuses on understanding what users actually need from an SEO tools directory. He spends his days analyzing search behavior, reading user feedback, and figuring out which tools deserve a spot on our list.",
  },
  {
    name: "Robert Wilson",
    role: "Full-Stack Developer",
    bio: "Robert builds and maintains the core platform. With a background in distributed systems and real-time data processing, he ensures that our comparison data stays accurate and up to date.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Story */}
      <section className="mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
          About SEO Tools Nav
        </h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            SEO Tools Nav was started because we couldn&apos;t find a single place that offered honest,
            structured comparisons of SEO tools. Every existing site seemed to be either a
            feature-light listicle, an affiliate-heavy review hub, or outright outdated.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            So we built our own. SEO Tools Nav is maintained by <strong>Pebble Forge</strong>, a small
            software studio based in <strong>Bremen, Germany</strong>. We&apos;ve been building SaaS
            products since 2015, and this directory is our way of giving back to the SEO community.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Every tool on this site is evaluated against a consistent set of criteria: feature depth,
            pricing transparency, user satisfaction (sourced from G2, Capterra, and TrustRadius), and
            real-world usability. We don&apos;t accept payment for listings, and we clearly label any
            affiliate relationships.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our goal is simple: help you find the right SEO tool for your specific use case — whether
            you&apos;re a solo blogger, an in-house marketing team, or a agency managing dozens of clients.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="bg-white border border-slate-200 rounded-xl p-6">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-blue-600">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Studio CTA */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Built by Pebble Forge
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          SEO Tools Nav is a project by <strong>Pebble Forge</strong>, a boutique software studio in
          Bremen, Germany. We specialize in building SaaS platforms and developer tools. Our team of 6
          brings together expertise in product management, full-stack development, and data engineering.
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>📍 Bremen, Germany</span>
          <span>📅 Founded 2015</span>
          <span>👥 Team of 6</span>
        </div>
      </section>
    </div>
  );
}
