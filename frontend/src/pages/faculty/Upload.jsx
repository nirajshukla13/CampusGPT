import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload as UploadIcon, File } from 'lucide-react';
import { Button } from '../../components/ui/button';

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
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Upload content</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            Share educational materials with your students and power CampusGPT.
          </p>
        </div>

        <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-8 shadow-md shadow-black/20">
          {/* Upload Area */}
          <div className="rounded-xl border-2 border-dashed border-[#1F2937] p-10 text-center">
            <UploadIcon size={40} className="mx-auto mb-4 text-[#6B7280]" />
            <h3 className="mb-1 text-base font-semibold text-[#F9FAFB]">Upload documents</h3>
            <p className="mb-4 text-sm text-[#9CA3AF]">
              Drag and drop files here, or click to browse.
            </p>
            <input
              type="file"
              data-testid="file-input"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#6366F1] px-6 py-2 text-sm font-medium text-white hover:bg-[#4F46E5]"
            >
              Browse files
            </label>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3">
              <div className="flex items-center gap-3">
                <File className="text-[#6366F1]" size={20} />
                <div>
                  <p
                    data-testid="selected-file-name"
                    className="text-sm font-medium text-[#F9FAFB]"
                  >
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                data-testid="upload-button"
                onClick={handleUpload}
                className="rounded-xl bg-[#6366F1] px-6 py-2 text-sm font-medium text-white hover:bg-[#4F46E5]"
              >
                Upload
              </Button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 border-t border-[#1F2937] pt-6">
            <h4 className="mb-3 text-sm font-semibold text-[#F9FAFB]">Upload guidelines</h4>
            <ul className="space-y-2 text-xs text-[#9CA3AF] md:text-sm">
              <li>• Supported formats: PDF, DOC, DOCX, PPT, PPTX</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Files will be processed into the CampusGPT knowledge base.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}