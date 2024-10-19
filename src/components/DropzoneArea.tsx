// DropzoneArea.tsx
import React from 'react';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import { Typography } from "@material-tailwind/react";

interface DropzoneAreaProps {
  onDrop: (acceptedFiles: File[]) => void;
  isDragActive: boolean;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
}

const DropzoneArea: React.FC<DropzoneAreaProps> = ({ onDrop, isDragActive, getRootProps, getInputProps }) => {
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center transition-all duration-200 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="h6" className="text-white">
          Drop the file here...
        </Typography>
      ) : (
        <Typography variant="h6" className="text-gray-500">
          Drag and drop a file here, or click to select a file
        </Typography>
      )}
    </div>
  );
};

export default DropzoneArea;
