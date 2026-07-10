export const metadata = {
  title: 'Developer API - Converter',
  description: 'API documentation for developers',
};

export default function DeveloperPage() {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/convert/pdf-to-word',
      description: 'Convert PDF to Word document',
    },
    {
      method: 'POST',
      path: '/api/convert/word-to-pdf',
      description: 'Convert Word to PDF',
    },
    {
      method: 'POST',
      path: '/api/convert/image-to-pdf',
      description: 'Convert Image to PDF',
    },
    {
      method: 'GET',
      path: '/api/status/:id',
      description: 'Check conversion status',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Developer API
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Integrate our conversion tools into your applications
        </p>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <code className="text-sm">
              # Install the SDK<br/>
              npm install converter-api-sdk<br/><br/>
              # Initialize the client<br/>
              const Converter = require('converter-api-sdk');<br/>
              const converter = new Converter('YOUR_API_KEY');
            </code>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    endpoint.method === 'GET' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm text-gray-700">{endpoint.path}</code>
                </div>
                <p className="mt-2 text-gray-600">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900">Ready to build?</h3>
          <p className="text-sm text-blue-700 mt-1">
            Get your API key and start integrating today.
          </p>
          <button className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get API Key
          </button>
        </div>
      </div>
    </div>
  );
}