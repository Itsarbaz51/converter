import {
  Upload,
  FileText,
  Wand2,
  Settings,
  Eye,
} from "lucide-react";

export default function ApiDocsGenerator() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              API Documentation Generator
            </h1>
            <p className="text-slate-400 text-sm">
              Upload API definitions and generate professional documentation.
            </p>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500">
            Generate Docs
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Panel */}
          <div className="space-y-6 lg:col-span-1">
            {/* Upload */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                <h2 className="font-semibold">Upload API File</h2>
              </div>

              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition">
                <FileText className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-4 text-sm text-slate-300">
                  Drag & Drop your API file
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  TXT, JSON, OpenAPI, Swagger
                </p>

                <button className="mt-5 rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700">
                  Browse File
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-purple-500" />
                <h2 className="font-semibold">Documentation Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400">
                    Documentation Style
                  </label>
                  <select className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
                    <option>Swagger Style</option>
                    <option>Postman Style</option>
                    <option>Modern SaaS</option>
                    <option>Developer Portal</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-400">
                    Output Format
                  </label>
                  <select className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
                    <option>Markdown</option>
                    <option>HTML</option>
                    <option>PDF</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Include Examples</span>
                  <input type="checkbox" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Generate Schema Tables</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>

            {/* AI Generate */}
            <div className="rounded-2xl border border-blue-800 bg-linear-to-br from-blue-950 to-slate-900 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">AI Processing</h3>
              </div>

              <p className="text-sm text-slate-400">
                Convert raw API definitions into structured documentation with
                endpoints, parameters, schemas, and examples.
              </p>

              <button className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-500">
                Generate Documentation
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 h-full">
              <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-500" />
                  <h2 className="font-semibold">
                    Documentation Preview
                  </h2>
                </div>

                <button className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800">
                  Export
                </button>
              </div>

              <div className="p-8">
                <div className="prose prose-invert max-w-none">
                  <h1>User API</h1>

                  <p>
                    Generated API documentation preview will appear here.
                  </p>

                  <div className="rounded-lg border border-slate-700 bg-slate-950 p-4 mt-6">
                    <span className="rounded bg-green-600 px-2 py-1 text-xs">
                      GET
                    </span>

                    <span className="ml-3 font-mono">
                      /api/users
                    </span>
                  </div>

                  <h3 className="mt-6">Response</h3>

                  <pre className="rounded-lg bg-black p-4 overflow-auto">
{`{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "John Doe"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}