// export default function Home() {
//     return (
//         <main
//             style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//                 fontSize: "40px",
//                 fontWeight: "bold",
//             }}
//         >
//             Hello Frontend 🚀
//         </main>
//     );
// }

import Link from "next/link";

export default function Home() {
  const popularTools = [
    {
      title: "PDF to Word",
      description: "Convert PDFs to editable Word documents",
      icon: "📄",
      href: "/pdf",
      color: "from-blue-50 to-blue-100",
      tag: "Popular",
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into one unified document",
      icon: "📑",
      href: "/merge",
      color: "from-purple-50 to-purple-100",
      tag: "Popular",
    },
    {
      title: "JPG to PDF",
      description: "Transform JPG, PNG, BMP, GIF, and TIFF images to PDF",
      icon: "🖼️",
      href: "/image",
      color: "from-green-50 to-green-100",
      tag: "Popular",
    },
    {
      title: "Sign PDF",
      description: "Create an electronic signature and sign your documents",
      icon: "✍️",
      href: "/sign",
      color: "from-orange-50 to-orange-100",
      tag: "Popular",
    },
    {
      title: "Edit PDF",
      description: "Add text, shapes, images and freehand annotations to your PDF",
      icon: "✏️",
      href: "/edit",
      color: "from-pink-50 to-pink-100",
      tag: "Popular",
    },
    {
      title: "Compress PDF",
      description: "Reduce the size of your PDF without losing quality",
      icon: "📦",
      href: "/compress",
      color: "from-teal-50 to-teal-100",
      tag: "Popular",
    },
  ];

  const features = [
    {
      title: "Work Directly on Your Files",
      description: "Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations to your documents. You can connect to 30 other tools to enhance your files further.",
      icon: "🛠️",
    },
    {
      title: "Digital Signatures Made Easy",
      description: "Fill in forms, e-sign contracts, and close deals in a few simple steps. You can also request e-signatures and track your document every step of the way.",
      icon: "✍️",
    },
    {
      title: "Create the Perfect Document",
      description: "File too big? Compress it. Need a specific format? Convert it. Things getting chaotic? Merge and split files, or remove excess pages. Converter has it all.",
      icon: "✨",
    },
    {
      title: "Manage Documents—All in One Place",
      description: "No more working across multiple apps! Save time by storing, managing, and sharing files across devices—straight from our web platform.",
      icon: "☁️",
    },
  ];

  const reasons = [
    {
      title: "Completely Free",
      description: "No hidden costs, no subscriptions. All our tools are 100% free to use.",
      icon: "🎁",
    },
    {
      title: "No Login Required",
      description: "Start converting immediately without creating an account or providing personal information.",
      icon: "🚀",
    },
    {
      title: "Secure & Private",
      description: "Your files are encrypted and automatically deleted after conversion.",
      icon: "🔒",
    },
    {
      title: "24/7 Availability",
      description: "Our tools are always available whenever you need them.",
      icon: "🌐",
    },
    {
      title: "Fast Processing",
      description: "Lightning-fast conversion speeds to save your valuable time.",
      icon: "⚡",
    },
    {
      title: "High Quality",
      description: "Maintain the original quality of your documents during conversion.",
      icon: "✨",
    },
  ];

  const footerLinks = {
    tools: [
      { label: "PDF to Word", href: "/pdf" },
      { label: "PDF to Excel", href: "/excel" },
      { label: "PDF to PowerPoint", href: "/powerpoint" },
      { label: "PDF to JPG", href: "/image" },
      { label: "Merge PDF", href: "/merge" },
      { label: "Compress PDF", href: "/compress" },
      { label: "Sign PDF", href: "/sign" },
      { label: "Edit PDF", href: "/edit" },
    ],
    formats: [
      { label: "Word", href: "/word" },
      { label: "Excel", href: "/excel" },
      { label: "PowerPoint", href: "/powerpoint" },
      { label: "Image", href: "/image" },
      { label: "Text", href: "/text" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
      { label: "Developer API", href: "/developer" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-white"></div>
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-white"></div>
          <div className="absolute top-40 right-40 h-48 w-48 rounded-full bg-white"></div>
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            We make PDF easy.
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-blue-100 md:text-xl">
            All the tools you'll need to be more productive and work smarter with documents.
          </p>

          {/* Trust Bar */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span>No Login Required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure & Private</span>
            </div>
          </div>

          <Link
            href="/pdf"
            className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:scale-105 hover:shadow-xl"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Most Popular Tools */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Most Popular PDF Tools
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
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tool.color} p-6 transition-all hover:scale-[1.02] hover:shadow-xl`}
              >
                {tool.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                    {tool.tag}
                  </span>
                )}
                <div className="text-4xl">{tool.icon}</div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">
                  {tool.title}
                </h3>
                <p className="mt-2 text-gray-700">{tool.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:underline">
                  Convert Now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Keep Your Simple Tasks Simple
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              We have all the tools you'll need to start, manage, and finish your work with digital documents.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 text-5xl">{feature.icon}</div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Our Converter?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              We provide the best free PDF conversion tools with no strings attached.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-gray-100 p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-3 text-4xl">{reason.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 py-16 text-center text-white md:py-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Start Converting for Free
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            No sign-up required. No credit card needed. Just upload and convert.
          </p>
          <Link
            href="/pdf"
            className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:scale-105 hover:shadow-xl"
          >
            Get Started Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
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
              <p className="mt-4 text-sm text-gray-400">
                Free online file conversion tools. No registration required. Your privacy is our priority.
              </p>
            </div>

            {/* Tools */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Tools</h4>
              <ul className="space-y-2">
                {footerLinks.tools.slice(0, 6).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formats */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Formats</h4>
              <ul className="space-y-2">
                {footerLinks.formats.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
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
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-white">
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