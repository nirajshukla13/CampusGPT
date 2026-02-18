import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload as UploadIcon, File } from 'lucide-react';

export default function FacultyUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert('Upload functionality will be implemented here');
      setSelectedFile(null);
    }
  };

  return (
    <Layout role="faculty">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Upload Content</h1>
            <p className="text-gray-400 text-lg">Share educational materials with your students</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-8">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-purple-500 transition-all">
              <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Upload Documents</h3>
              <p className="text-gray-400 mb-4">Drag and drop files here, or click to browse</p>
              <input
                type="file"
                data-testid="file-input"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 cursor-pointer transition-all shadow-lg hover:shadow-purple-500/50"
              >
                Browse Files
              </label>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="mt-6 p-4 bg-gray-700/30 border border-gray-600 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="text-blue-400" size={24} />
                  <div>
                    <p data-testid="selected-file-name" className="font-medium text-white">{selectedFile.name}</p>
                    <p className="text-sm text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  data-testid="upload-button"
                  onClick={handleUpload}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-purple-500/50"
                >
                  Upload
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="font-semibold text-white mb-3">Upload Guidelines:</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Supported formats: PDF, DOC, DOCX, PPT, PPTX</li>
                <li>• Maximum file size: 10MB</li>
                <li>• Files will be processed for CampusGPT knowledge base</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}