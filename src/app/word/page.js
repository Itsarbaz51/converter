"use client";

import { useState } from "react";
import UploadArea from "../../components/upload/UploadArea";
import ConversionOptions from "../../components/converter/ConversionOptions";
import FileList from "../../components/common/FileList";

export default function WordPage() {
  const [files, setFiles] = useState([]);
  const [conversionType, setConversionType] = useState("word-to-pdf");

  const conversionOptions = [
    { value: "word-to-pdf", label: "Word to PDF" },
    { value: "word-to-text", label: "Word to Text" },
    { value: "word-to-image", label: "Word to Image" },
  ];

  const handleFileUpload = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = () => {
    console.log("Converting Word files:", files, "to", conversionType);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Word Converter
        </h1>
        <p className="text-gray-600 mb-8">
          Convert Word documents to PDF and more
        </p>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <ConversionOptions
            options={conversionOptions}
            value={conversionType}
            onChange={setConversionType}
          />

          <UploadArea onFileUpload={handleFileUpload} accept=".doc,.docx" />

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
