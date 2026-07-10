'use client';

import { useState } from 'react';
import UploadArea from '../../../components/upload/UploadArea';
import ConversionOptions from '../../../components/converter/ConversionOptions';
import FileList from '../../../components/common/FileList.jsx';

export default function ExcelPage() {
  const [files, setFiles] = useState([]);
  const [conversionType, setConversionType] = useState('excel-to-pdf');

  const conversionOptions = [
    { value: 'excel-to-pdf', label: 'Excel to PDF' },
    { value: 'excel-to-csv', label: 'Excel to CSV' },
    { value: 'excel-to-text', label: 'Excel to Text' },
  ];

  const handleFileUpload = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = () => {
    console.log('Converting Excel files:', files, 'to', conversionType);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Excel Converter</h1>
        <p className="text-gray-600 mb-8">Convert Excel spreadsheets to PDF and more</p>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <ConversionOptions
            options={conversionOptions}
            value={conversionType}
            onChange={setConversionType}
          />

          <UploadArea onFileUpload={handleFileUpload} accept=".xls,.xlsx" />

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