import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-800">SEO Tools Nav</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Independent reviews and comparisons of the best SEO tools. Built by the team at Pebble Forge.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/category/seo-tools" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">SEO Tools</Link></li>
              <li><Link href="/category/keyword-research" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Keyword Research</Link></li>
              <li><Link href="/category/backlink-analysis" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Backlink Analysis</Link></li>
              <li><Link href="/category/content-marketing" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Content Marketing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclosure" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Disclosure</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} SEO Tools Nav. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built with ❤️ in Bremen, Germany</p>
        </div>
      </div>
    </footer>
  );
}
