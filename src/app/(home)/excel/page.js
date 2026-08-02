'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, 
  FileDown, 
  FileText, 
  FileJson,
  Upload,
  X,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Database,
  Table,
  FileSpreadsheet as ExcelIcon
} from 'lucide-react';

export default function ExcelPage() {
  const [files, setFiles] = useState([]);
  const [conversionType, setConversionType] = useState('excel-to-pdf');
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const conversionOptions = [
    { 
      value: 'excel-to-pdf', 
      label: 'Excel to PDF',
      icon: FileDown,
      color: 'from-red-500 to-orange-500',
      description: 'Convert spreadsheets to PDF documents'
    },
    { 
      value: 'excel-to-csv', 
      label: 'Excel to CSV',
      icon: Table,
      color: 'from-green-500 to-emerald-500',
      description: 'Convert to comma-separated values'
    },
    { 
      value: 'excel-to-json', 
      label: 'Excel to JSON',
      icon: FileJson,
      color: 'from-blue-500 to-indigo-500',
      description: 'Convert to JSON data format'
    },
    { 
      value: 'excel-to-text', 
      label: 'Excel to Text',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      description: 'Extract text from spreadsheets'
    },
  ];

  const handleFileUpload = (newFiles) => {
    const validFiles = newFiles.filter(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.xls')
    );
    
    if (validFiles.length !== newFiles.length) {
      // Show warning for invalid files
    }
    
    setFiles([...files, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    setProgress(0);
    setShowSuccess(false);
    
    // Simulate conversion progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setIsConverting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.xlsx')) return '📊';
    if (fileName.endsWith('.xls')) return '📈';
    return '📁';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              background: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="inline-block mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl shadow-lg inline-flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8" />
                <span className="text-2xl font-bold">Excel Converter</span>
              </div>
            </motion.div>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Transform your spreadsheets into multiple formats with just a few clicks
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Conversion Options */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Choose Conversion Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {conversionOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = conversionType === option.value;
                  
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => setConversionType(option.value)}
                      className={`relative p-4 rounded-xl text-left transition-all duration-300 ${
                        isSelected 
                          ? `bg-linear-to-r ${option.color} text-white shadow-lg scale-105` 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{option.label}</div>
                          <div className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                            {option.description.split(' ').slice(0, 3).join(' ')}...
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="bg-green-500 rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Upload Area */}
            <motion.div
              className={`relative border-3 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50/50 scale-105' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
              }`}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const droppedFiles = Array.from(e.dataTransfer.files);
                handleFileUpload(droppedFiles);
              }}
            >
              <input
                type="file"
                multiple
                accept=".xls,.xlsx,.csv"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  handleFileUpload(selectedFiles);
                  e.target.value = '';
                }}
              />
              
              <div className="text-center">
                <motion.div
                  animate={{ 
                    y: isDragging ? -10 : 0,
                    scale: isDragging ? 1.05 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="inline-block p-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
                    <Upload className="w-12 h-12 text-blue-600" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {isDragging ? 'Drop your files here' : 'Upload Excel Files'}
                </h3>
                <p className="text-gray-500 mb-2">
                  Drag & drop or click to browse
                </p>
                <p className="text-sm text-gray-400">
                  Supports .xlsx, .xls, .csv files
                </p>
              </div>
            </motion.div>

            {/* File List */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Uploaded Files ({files.length})
                    </h3>
                    <motion.button
                      onClick={() => setFiles([])}
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </motion.button>
                  </div>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl">{getFileIcon(file.name)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => handleRemoveFile(index)}
                          className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <AnimatePresence>
              {isConverting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-blue-500 to-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Converting... {progress}%
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Conversion completed successfully! Your files are ready to download.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Convert Button */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6"
                >
                  <motion.button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className="relative w-full group overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-xl" />
                    
                    <div className="relative flex items-center justify-center gap-3 py-4 px-6">
                      <span className="text-white font-semibold text-lg">
                        {isConverting ? 'Converting...' : 'Convert Files'}
                      </span>
                      {!isConverting && (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Features Footer */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { icon: '⚡', title: 'Fast Processing', desc: 'Convert files in seconds' },
              { icon: '🔒', title: 'Secure', desc: 'Files are processed locally' },
              { icon: '🎯', title: 'Accurate', desc: 'Preserves formatting' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}