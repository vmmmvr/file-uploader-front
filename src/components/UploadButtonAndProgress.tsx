// UploadButtonAndProgress.tsx
import React from 'react';
import { Button, Typography, Progress } from "@material-tailwind/react";

interface UploadButtonAndProgressProps {
  handleUpload: () => void;
  selectedFile: File | null;
  uploadProgress: number;
  uploadMessage: string;
}

const UploadButtonAndProgress: React.FC<UploadButtonAndProgressProps> = ({ handleUpload, selectedFile, uploadProgress, uploadMessage }) => {
  return (
    <>
      <Button
        onClick={handleUpload}
        disabled={!selectedFile}
        fullWidth
        className="mb-4 bg-indigo-600"
      >
        Upload File
      </Button>

      {uploadProgress > 0 && (
        <div className="mb-4">
          <Typography variant="body1" className="text-center text-white">
            Upload Progress: {uploadProgress}%
          </Typography>
          <Progress value={uploadProgress} color="indigo" />
        </div>
      )}

      {uploadMessage && (
        <Typography variant="body2" className="text-center text-white ">
          {uploadMessage}
        </Typography>
      )}
    </>
  );
};

export default UploadButtonAndProgress;
