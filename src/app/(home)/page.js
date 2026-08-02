import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Shield, Globe, Lock, Clock, Sparkles, FileText, Image, Merge,  Box } from "lucide-react";

export default function Home() {
  const popularTools = [
    {
      title: "PDF to Word",
      description: "Convert PDFs to editable Word documents",
      // icon: <FileText className="w-6 h-6" />,
      href: "/pdf",
      color: "from-blue-500/10 to-blue-600/10",
      tag: "Popular",
    },
    {
      title: "Excel to PDF",
      description: "Convert Excel to PDF, CSV and text",
      // icon: <FileText className="w-6 h-6" />,
      href: "/excel",
      color: "from-emerald-500/10 to-emerald-600/10",
      tag: "Popular",
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into one unified document",
      // icon: <Merge className="w-6 h-6" />,
      href: "/merge",
      color: "from-purple-500/10 to-purple-600/10",
      tag: "Popular",
    },
    {
      title: "JPG to PDF",
      description: "Transform images to PDF quickly",
      // icon: <Image className="w-6 h-6" />,
      href: "/image",
      color: "from-amber-500/10 to-amber-600/10",
      tag: "Popular",
    },
    {
      title: "Compress Docs",
      description: "Reduce file size without losing quality",
      // icon: <Compress className="w-6 h-6" />,
      href: "/compress",
      color: "from-rose-500/10 to-rose-600/10",
      tag: "Popular",
    },
    {
      title: "Image Converter",
      description: "Convert images to PDF, JPG, and more",
      // icon: <Image className="w-6 h-6" />,
      href: "/image",
      color: "from-cyan-500/10 to-cyan-600/10",
      tag: "Popular",
    },
  ];

  const features = [
    {
      title: "Work Directly on Your Files",
      description: "Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Digital Signatures Made Easy",
      description: "Fill in forms, e-sign contracts, and track your document every step of the way.",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      title: "Create the Perfect Document",
      description: "Compress, convert, merge, split, or remove pages. Converter has it all.",
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      title: "Manage Documents—All in One Place",
      description: "Store, manage, and share files across devices—straight from our web platform.",
      icon: <Globe className="w-8 h-8" />,
    },
  ];

  const reasons = [
    {
      title: "Completely Free",
      description: "No hidden costs, no subscriptions.",
      icon: <Box className="w-6 h-6" />,
    },
    {
      title: "No Login Required",
      description: "Start converting immediately without an account.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Secure & Private",
      description: "Files are encrypted and auto-deleted.",
      icon: <Lock className="w-6 h-6" />,
    },
    {
      title: "24/7 Availability",
      description: "Always available whenever you need them.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Fast Processing",
      description: "Lightning-fast conversion speeds.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "High Quality",
      description: "Maintain original document quality.",
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 px-4 py-20 md:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-indigo-500 blur-3xl"></div>
          <div className="absolute top-40 right-40 h-48 w-48 rounded-full bg-purple-500 blur-3xl"></div>
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Trusted by 2M+ users
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
            We make PDF easy.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100/80 md:text-xl">
            All the tools you'll need to be more productive and work smarter with documents.
          </p>

          {/* Trust Bar */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl">⭐</span>
              <span className="text-blue-100">100% Free</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl">🚀</span>
              <span className="text-blue-100">No Login Required</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl">🔒</span>
              <span className="text-blue-100">Secure & Private</span>
            </div>
          </div>

          <Link
            href="/pdf"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Most Popular Tools */}
      <section className="px-4 py-16 md:py-24 bg-linear-to-b from-white to-blue-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl tracking-tight">
              Most Popular <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PDF Tools</span>
            </h2>
            <p className="text-lg text-gray-600">
              All tools are completely free to use. No registration required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200"
              >
                {tool.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-blue-500/25">
                    {tool.tag}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{tool.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Convert Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50/80 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl tracking-tight">
              Keep Your Simple Tasks <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Simple</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              We have all the tools you'll need to start, manage, and finish your work with digital documents.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 border border-gray-100/50"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl tracking-tight">
              Why Choose <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Converter</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              We provide the best free PDF conversion tools with no strings attached.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 px-4 py-16 text-center text-white md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="container relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Start Converting for <span className="text-yellow-300">Free</span>
          </h2>
          <p className="mb-8 text-lg text-blue-100/90">
            No sign-up required. No credit card needed. Just upload and convert.
          </p>
          <Link
            href="/pdf"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-2xl font-bold text-white">Converter</span>
              </Link>
              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                Free online file conversion tools. No registration required. Your privacy is our priority.
              </p>
            </div>

            {/* Tools */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Tools</h4>
              <ul className="space-y-2">
                {popularTools.slice(0, 6).map((tool) => (
                  <li key={tool.title}>
                    <Link
                      href={tool.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white flex items-center gap-2"
                    >
                      <span className="w-4 h-4 text-blue-400">{tool.icon}</span>
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formats */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Formats</h4>
              <ul className="space-y-2">
                {["Word", "Excel", "PowerPoint", "Image", "Text"].map((format) => (
                  <li key={format}>
                    <Link
                      href={`/${format.toLowerCase()}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {format}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Privacy Policy", "Terms of Service", "Contact", "Developer API"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, '')}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-white">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="Twitter">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="GitHub">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Converter. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}