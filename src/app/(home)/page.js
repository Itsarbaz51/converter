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
  const conversionTypes = [
    {
      title: "PDF",
      description: "Convert PDF to Word, Excel, PowerPoint, and more",
      icon: "📄",
      href: "/pdf",
      color: "bg-red-50 border-red-200",
    },
    {
      title: "Word",
      description: "Convert Word documents to PDF and other formats",
      icon: "📝",
      href: "/word",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Excel",
      description: "Convert Excel spreadsheets to PDF and more",
      icon: "📊",
      href: "/excel",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "PowerPoint",
      description: "Convert PowerPoint presentations to PDF",
      icon: "📑",
      href: "/powerpoint",
      color: "bg-orange-50 border-orange-200",
    },
    {
      title: "Image",
      description: "Convert images to PDF and vice versa",
      icon: "🖼️",
      href: "/image",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Text",
      description: "Convert text files to PDF and other formats",
      icon: "📃",
      href: "/text",
      color: "bg-gray-50 border-gray-200",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Convert Files Online
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Convert between PDF, Word, Excel, PowerPoint, Images and more
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/pdf"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/developer"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            API Docs
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {conversionTypes.map((type) => (
          <Link
            key={type.title}
            href={type.href}
            className={`group p-6 border-2 ${type.color} rounded-xl hover:shadow-lg transition-all hover:scale-105`}
          >
            <div className="text-4xl mb-3">{type.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900">
              {type.title}
            </h3>
            <p className="mt-2 text-gray-600">{type.description}</p>
            <div className="mt-4 text-blue-600 font-medium group-hover:underline">
              Convert Now →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
