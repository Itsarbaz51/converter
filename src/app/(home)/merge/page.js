'use client';

import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default function PdfMerger() {
    const [files, setFiles] = useState([]);
    const [mergedBlob, setMergedBlob] = useState(null);
    const [isMerging, setIsMerging] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const dropRef = useRef(null);

    // Merge PDFs using pdf-lib
    const mergePdfs = async (fileList) => {
        const mergedPdf = await PDFDocument.create();

        for (const file of fileList) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }

        const pdfBytes = await mergedPdf.save();
        return pdfBytes;
    };

    // Handle file selection from input
    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        if (selected.length === 0) return;

        const pdfs = selected.filter(f => f.type === 'application/pdf');
        if (pdfs.length !== selected.length) {
            setError('Only PDF files are accepted. Non-PDF files were ignored.');
        }
        if (pdfs.length === 0) {
            setError('Please select at least one PDF file.');
            return;
        }

        setError('');
        setFiles(prev => [...prev, ...pdfs]);
        e.target.value = '';
    };

    // Remove a file from the list
    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        if (mergedBlob) setMergedBlob(null);
    };

    // Clear all files
    const clearAll = () => {
        setFiles([]);
        setMergedBlob(null);
        setError('');
    };

    // Merge files and produce blob
    const handleMerge = async () => {
        if (files.length < 2) {
            setError('Please upload at least two PDF files to merge.');
            return;
        }

        setIsMerging(true);
        setError('');

        try {
            const pdfBytes = await mergePdfs(files);
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            setMergedBlob(blob);
        } catch (err) {
            console.error(err);
            setError('Failed to merge PDFs. Please try again.');
        } finally {
            setIsMerging(false);
        }
    };

    // Download the merged PDF
    const downloadMerged = () => {
        if (!mergedBlob) return;
        saveAs(mergedBlob, 'merged-output.pdf');
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

        const pdfs = dropped.filter(f => f.type === 'application/pdf');
        if (pdfs.length !== dropped.length) {
            setError('Only PDF files are accepted. Non-PDF files were ignored.');
        }
        if (pdfs.length === 0) {
            setError('No PDF files found in drop.');
            return;
        }

        setError('');
        setFiles(prev => [...prev, ...pdfs]);
        if (mergedBlob) setMergedBlob(null);
    };

    // File list with remove buttons
    const renderFileList = () => {
        if (files.length === 0) {
            return (
                <div className="text-gray-400 text-sm italic py-6 text-center">
                    No PDF files selected. Use the upload button or drag & drop.
                </div>
            );
        }
        return (
            <ul className="divide-y divide-gray-200">
                {files.map((file, idx) => (
                    <li key={idx} className="flex justify-between items-center py-2 px-1">
                        <span className="truncate text-sm text-gray-700 max-w-[200px] sm:max-w-xs">
                            {file.name} <span className="text-gray-400 text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                        </span>
                        <button
                            onClick={() => removeFile(idx)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-0.5 rounded hover:bg-red-50"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4 flex items-start justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all">
                <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">📄</span>
                    PDF Merger
                </h1>
                <p className="text-gray-500 mb-6 text-sm">Upload multiple PDF files and combine them into one.</p>

                {/* Error display */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
                        <span className="font-bold">⚠️</span> {error}
                    </div>
                )}

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
                        <p className="text-gray-600">Drag & drop PDF files here, or</p>
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition shadow-sm"
                        >
                            Browse Files
                        </label>
                        <input
                            id="file-upload"
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <p className="text-xs text-gray-400 mt-1">Only PDF files are supported.</p>
                    </div>
                </div>

                {/* File list */}
                <div className="mt-5 bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
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
                            onClick={handleMerge}
                            disabled={isMerging || files.length < 2}
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition shadow-sm ${isMerging || files.length < 2
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {isMerging ? 'Merging...' : '🔄 Merge PDFs'}
                        </button>
                    </div>

                    {mergedBlob && (
                        <button
                            onClick={downloadMerged}
                            className="px-5 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm flex items-center gap-1"
                        >
                            ⬇ Download Merged PDF
                        </button>
                    )}
                </div>

                {/* Status / info */}
                <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3 flex justify-between">
                    <span>{files.length} file(s) selected</span>
                    {mergedBlob && (
                        <span className="text-green-600 font-medium">✓ Merged ready</span>
                    )}
                </div>
            </div>
        </div>
    );
}