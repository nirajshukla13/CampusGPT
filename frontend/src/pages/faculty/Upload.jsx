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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Content</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
            <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
            <input
              type="file"
              data-testid="file-input"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="text-blue-600" size={24} />
                <div>
                  <p data-testid="selected-file-name" className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                data-testid="upload-button"
                onClick={handleUpload}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Upload Guidelines:</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Supported formats: PDF, DOC, DOCX, PPT, PPTX</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Files will be processed for CampusGPT knowledge base</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}