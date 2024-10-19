// FileList.tsx
import React from 'react';
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { DocumentIcon, EyeIcon, ArrowDownOnSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { IFile } from '../interface/files';

interface File {
  id: number;
  name: string;
  type: string;
  date: string;
}

interface FileListProps {
  files: IFile[];
  onDelete: (id: number) => void;
  onDownload: (id: number) => void;
  onView: (id: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete, onDownload, onView }) => {
  const formatFileSize = (size: number) => {
    return `${(size / 1024).toFixed(2)} KB`;
  };
  const fileBaseUrl = import.meta.env.VITE__FILE_BASE_URL;

  const generateFileURL = (fileurl: string) => {
    console.log({fileBaseUrl});
    
    // Assuming you have a base URL for your server or storage
    return `${ fileBaseUrl }/${fileurl}`;
  };
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((file: IFile) => (
        <Card key={file.id} className="p-4 flex flex-col justify-between h-full">
          <div className="flex items-center mb-4">
            <DocumentIcon className="h-6 w-6 text-blue-500 mr-3" />
            <Typography variant="h6" className="text-gray-800 font-medium">
              {file.name}
            </Typography>
          </div>
          <div className="mb-2">
            <Typography variant="small" className="text-gray-500">
              Uploaded: {file.createdAt.toLocaleString()}
            </Typography>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-2">
              <IconButton color="blue" onClick={() => onView(generateFileURL(file.name))}>
                <EyeIcon className="h-5 w-5" />
              </IconButton>
              <IconButton color="green" onClick={() => onDownload(file.id)}>
                <ArrowDownOnSquareIcon className="h-5 w-5" />
              </IconButton>
            </div>
         
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FileList;
