'use client';

import  {useDropzone}  from 'react-dropzone';

const UploadArea = ({ onFileUpload, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileUpload,
    accept: accept ? { [accept]: [] } : undefined,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="mt-2 text-gray-600">
        {isDragActive
          ? 'Drop your files here'
          : 'Drag & drop files here, or click to select'}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Supports multiple files
      </p>
    </div>
  );
};

export default UploadArea;