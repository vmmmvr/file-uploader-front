// FilePreview.tsx
import React from 'react';

interface FilePreviewProps {
  isImage: boolean;
  isVideo: boolean;
  filePreview: string | null;
  selectedFile: File | null;
}

const FilePreview: React.FC<FilePreviewProps> = ({ isImage, isVideo, filePreview, selectedFile }) => {
  return (
    <div className="mb-4 text-center">
      {isImage && (
        <div className="mb-4 text-center max-h-[400px]">
          <img
            src={filePreview || ''}
            alt="Selected preview"
            className="w-full max-h-[400px] rounded-lg shadow"
          />
        </div>
      )}
      {isVideo && (
        <video
          controls
          className="w-full max-h-[400px] rounded-lg shadow"
        >
          <source src={filePreview || ''} type={selectedFile?.type} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default FilePreview;
