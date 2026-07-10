'use client';

import { useState } from 'react';
import UploadArea from '../../components/upload/UploadArea';
import ConversionOptions from '../../components/converter/ConversionOptions';
import FileList from '../../components/common/FileList';

export default function TextPage() {
  const [files, setFiles] = useState([]);
  const [conversionType, setConversionType] = useState('text-to-pdf');

  const conversionOptions = [
    { value: 'text-to-pdf', label: 'Text to PDF' },
    { value: 'text-to-word', label: 'Text to Word' },
    { value: 'text-to-excel', label: 'Text to Excel' },
  ];

  const handleFileUpload = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = () => {
    console.log('Converting Text files:', files, 'to', conversionType);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Converter</h1>
        <p className="text-gray-600 mb-8">Convert text files to PDF and more</p>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <ConversionOptions
            options={conversionOptions}
            value={conversionType}
            onChange={setConversionType}
          />

          <UploadArea onFileUpload={handleFileUpload} accept=".txt" />

          {files.length > 0 && (
            <>
              <FileList files={files} onRemove={handleRemoveFile} />
              
              <button
                onClick={handleConvert}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Convert Files
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}