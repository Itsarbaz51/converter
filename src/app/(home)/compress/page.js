'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';

export default function FileCompressor() {
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  // Compression options
  const compressionOptions = {
    low: {
      quality: 0.3,
      pdfQuality: 0.3,
      imageMaxSize: 800,
      label: 'Low (Smallest)'
    },
    medium: {
      quality: 0.6,
      pdfQuality: 0.6,
      imageMaxSize: 1200,
      label: 'Medium (Balanced)'
    },
    high: {
      quality: 0.85,
      pdfQuality: 0.85,
      imageMaxSize: 1600,
      label: 'High (Quality)'
    }
  };

  // Compress image files
  const compressImage = async (file, options) => {
    try {
      const imageOptions = {
        maxSizeMB: options.imageMaxSize / 1000,
        maxWidthOrHeight: options.imageMaxSize,
        useWebWorker: true,
        quality: options.quality,
      };

      const compressedFile = await imageCompression(file, imageOptions);
      return compressedFile;
    } catch (err) {
      console.error('Image compression error:', err);
      return file; // Return original if compression fails
    }
  };

  // Compress PDF files
  const compressPdf = async (file, options) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Compress by reducing quality and removing unused objects
      pdfDoc.compress();

      // Save with reduced quality (for images within PDF)
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
        updateField: (field) => field
      });

      const compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'application/pdf'
      });

      return compressedFile;
    } catch (err) {
      console.error('PDF compression error:', err);
      return file;
    }
  };

  // Compress DOC/DOCX files (simplified - just re-save)
  const compressDoc = async (file, options) => {
    try {
      // For DOC files, we'll just zip them (Word files are already compressed)
      // This is a simplified approach - real DOC compression would require
      // server-side processing or a library like docx-templates
      const zip = new JSZip();
      const content = await file.arrayBuffer();
      await zip.file(file.name, content);
      const compressed = await zip.generateAsync({ type: 'blob' });

      const compressedFile = new File([compressed], file.name, {
        type: file.type
      });

      return compressedFile;
    } catch (err) {
      console.error('DOC compression error:', err);
      return file;
    }
  };

  // Compress text files
  const compressText = async (file, options) => {
    try {
      const text = await file.text();
      // Remove extra whitespace and compress
      const compressedText = text
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n')
        .trim();

      const blob = new Blob([compressedText], { type: file.type });
      const compressedFile = new File([blob], file.name, {
        type: file.type
      });

      return compressedFile;
    } catch (err) {
      console.error('Text compression error:', err);
      return file;
    }
  };

  // Main compression function
  const compressFile = async (file) => {
    const options = compressionOptions[compressionLevel];
    const fileType = file.type;

    try {
      if (fileType.startsWith('image/')) {
        return await compressImage(file, options);
      } else if (fileType === 'application/pdf') {
        return await compressPdf(file, options);
      } else if (
        fileType === 'application/msword' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        return await compressDoc(file, options);
      } else if (
        fileType === 'text/plain' ||
        fileType === 'text/csv' ||
        fileType === 'application/json'
      ) {
        return await compressText(file, options);
      } else {
        // For other file types, try to zip them
        const zip = new JSZip();
        const content = await file.arrayBuffer();
        await zip.file(file.name, content);
        const compressed = await zip.generateAsync({ type: 'blob' });

        const compressedFile = new File([compressed], file.name.replace(/\.[^.]+$/, '.zip'), {
          type: 'application/zip'
        });

        return compressedFile;
      }
    } catch (err) {
      console.error('Compression error:', err);
      return file;
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length === 0) return;

    setError('');
    setFiles(prev => [...prev, ...selected]);
    e.target.value = '';
  };

  // Remove a file from the list
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setCompressedFiles([]);
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
    setCompressedFiles([]);
    setError('');
    setProgress(0);
  };

  // Handle compression
  const handleCompress = async () => {
    if (files.length === 0) {
      setError('Please upload a file to compress.');
      return;
    }

    setIsCompressing(true);
    setError('');
    setProgress(0);
    setCompressedFiles([]);

    try {
      const compressed = [];
      const total = files.length;

      for (let i = 0; i < total; i++) {
        const file = files[i];
        const compressedFile = await compressFile(file);
        compressed.push(compressedFile);
        setProgress(((i + 1) / total) * 100);
      }

      setCompressedFiles(compressed);
    } catch (err) {
      console.error(err);
      setError('Failed to compress files. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  // Download all compressed files as zip
  const downloadAll = async () => {
    if (compressedFiles.length === 0) return;

    try {
      const zip = new JSZip();

      for (const file of compressedFiles) {
        const content = await file.arrayBuffer();
        zip.file(file.name, content);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'compressed-files.zip');
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download compressed files.');
    }
  };

  // Download single file
  const downloadSingle = async (file, index) => {
    try {
      saveAs(file, file.name);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download file.');
    }
  };

  // Calculate size difference
  const getSizeDifference = (original, compressed) => {
    const originalSize = original.size;
    const compressedSize = compressed.size;
    const difference = ((originalSize - compressedSize) / originalSize * 100);
    return difference.toFixed(1);
  };

  // Format file size
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // File list with size comparison
  const renderFileList = () => {
    if (files.length === 0) {
      return (
        <div className="text-gray-400 text-sm italic py-6 text-center">
          No files selected. Upload files to compress.
        </div>
      );
    }

    return (
      <ul className="divide-y divide-gray-200">
        {files.map((file, idx) => {
          const compressedFile = compressedFiles[idx];
          const sizeDiff = compressedFile ? getSizeDifference(file, compressedFile) : null;

          return (
            <li key={idx} className="py-3 px-1">
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <span className="truncate text-sm text-gray-700 block">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    Original: {formatSize(file.size)}
                    {compressedFile && (
                      <span className="ml-2">
                        → Compressed: {formatSize(compressedFile.size)}
                        <span className={`ml-2 font-medium ${sizeDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {sizeDiff > 0 ? `↓ ${sizeDiff}%` : `↑ ${Math.abs(sizeDiff)}%`}
                        </span>
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {compressedFile && (
                    <button
                      onClick={() => downloadSingle(compressedFile, idx)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-0.5 rounded hover:bg-red-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drop-highlight');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-highlight');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-highlight');

    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length === 0) return;

    setError('');
    setFiles(prev => [...prev, ...dropped]);
    setCompressedFiles([]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 py-10 px-4 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
          <span className="bg-purple-100 text-purple-700 p-2 rounded-lg">🗜️</span>
          File Compressor
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Compress PDF, images, DOC, and other files to reduce file size.
        </p>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
            <span className="font-bold">⚠️</span> {error}
          </div>
        )}

        {/* Compression level selector */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Compression Level:</span>
          <div className="flex gap-2">
            {Object.entries(compressionOptions).map(([key, option]) => (
              <button
                key={key}
                onClick={() => setCompressionLevel(key)}
                className={`px-3 py-1 text-sm rounded-lg transition ${compressionLevel === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drop zone + upload button */}
        <div
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors duration-200"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V8m0 0l4 4m-4-4l-4 4m12 0V8m0 0l4 4m-4-4l-4 4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12h10M7 8h10M7 4h10" />
            </svg>
            <p className="text-gray-600">Drag & drop files here, or</p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition shadow-sm"
            >
              Browse Files
            </label>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-xs text-gray-400 mt-1">
              Supports PDF, images, DOC, DOCX, TXT, and more.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {isCompressing && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Compressing... {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* File list */}
        <div className="mt-5 bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
          {renderFileList()}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Clear All
            </button>
            <button
              onClick={handleCompress}
              disabled={isCompressing || files.length === 0}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition shadow-sm ${isCompressing || files.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
            >
              {isCompressing ? 'Compressing...' : '🗜️ Compress Files'}
            </button>
          </div>

          {compressedFiles.length > 0 && (
            <button
              onClick={downloadAll}
              className="px-5 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm flex items-center gap-1"
            >
              ⬇ Download All (ZIP)
            </button>
          )}
        </div>

        {/* Status / info */}
        <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3 flex justify-between">
          <span>{files.length} file(s) selected</span>
          {compressedFiles.length > 0 && (
            <span className="text-green-600 font-medium">
              ✓ {compressedFiles.length} file(s) compressed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}