"use client";

import { useState } from "react";
import UploadArea from "../../components/upload/UploadArea";
import ConversionOptions from "../../components/converter/ConversionOptions";
import FileList from "../../components/common/FileList";

export default function PDFPage() {
  const [files, setFiles] = useState([]);
  const [conversionType, setConversionType] = useState("pdf-to-word");

  const conversionOptions = [
    { value: "pdf-to-word", label: "PDF to Word" },
    { value: "pdf-to-excel", label: "PDF to Excel" },
    { value: "pdf-to-ppt", label: "PDF to PowerPoint" },
    { value: "pdf-to-jpg", label: "PDF to JPG" },
    { value: "pdf-to-png", label: "PDF to PNG" },
    { value: "pdf-to-text", label: "PDF to Text" },
  ];

  const handleFileUpload = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = () => {
    // Conversion logic here
    console.log("Converting files:", files, "to", conversionType);
  };

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Converter</h1>
        <p className="text-gray-600 mb-8">Convert PDF files to any format</p>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <ConversionOptions
            options={conversionOptions}
            value={conversionType}
            onChange={setConversionType}
          />

          <UploadArea onFileUpload={handleFileUpload} />

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
    </>
  );
}
