import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload as UploadIcon, File } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { appColors } from '../../config/colors.js';

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
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl" style={{ color: appColors.primaryText }}>Upload content</h1>
          <p className="text-sm md:text-base" style={{ color: appColors.mutedText }}>
            Share educational materials with your students and power CampusGPT.
          </p>
        </div>

        <div className="rounded-xl border p-4 sm:p-6 md:p-8 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
          {/* Upload Area */}
          <div className="rounded-xl border-2 border-dashed border-[#1F2937] p-6 sm:p-8 md:p-10 text-center">
            <UploadIcon size={32} className="mx-auto mb-3 text-[#6B7280] sm:mb-4 sm:w-10 sm:h-10" />
            <h3 className="mb-1 text-sm font-semibold text-[#F9FAFB] sm:text-base">Upload documents</h3>
            <p className="mb-3 text-xs text-[#9CA3AF] sm:mb-4 sm:text-sm">
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
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#6366F1] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F46E5] sm:px-6 sm:text-sm"
            >
              Browse files
            </label>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#1F2937] bg-[#020617] px-3 py-2.5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <File className="text-[#6366F1] flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p
                    data-testid="selected-file-name"
                    className="truncate text-xs font-medium text-[#F9FAFB] sm:text-sm"
                  >
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-[#6B7280] sm:text-xs">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                data-testid="upload-button"
                onClick={handleUpload}
                className="w-full rounded-xl bg-[#6366F1] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F46E5] sm:w-auto sm:px-6 sm:text-sm"
              >
                Upload
              </Button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 border-t border-[#1F2937] pt-4 sm:mt-8 sm:pt-6">
            <h4 className="mb-2.5 text-xs font-semibold text-[#F9FAFB] sm:mb-3 sm:text-sm">Upload guidelines</h4>
            <ul className="space-y-1.5 text-[10px] text-[#9CA3AF] sm:space-y-2 sm:text-xs md:text-sm">
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