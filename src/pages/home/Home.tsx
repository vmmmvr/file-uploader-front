import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from "@material-tailwind/react";
import { useFilesQuery, useUploadFileMutation } from '../../services/user.service';
import Header from '../../components/Header';
import DropzoneArea from '../../components/DropzoneArea';
import FilePreview from '../../components/FilePreview';
import UploadButtonAndProgress from '../../components/UploadButtonAndProgress';
import FileList from '../../components/FileList';
import ImagePreviewModal from '../../components/ImagePreviewModal';
import Cookies from 'js-cookie';


const handleDelete = (id: number) => {
  console.log(`Deleting file with id: ${id}`);
};

const handleDownload = (id: number) => {
  console.log(`Downloading file with id: ${id}`);
};

const handleView = (url: string) => {
    window.open(url, '_blank'); // Open the URL in a new tab
  };

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const token = Cookies.get('authToken') ?? "";

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*,video/*',
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const { mutate: uploadFile, isPending } = useUploadFileMutation();
  const { data: filesResponse, refetch, isPending: filesLoading, isError: filesisError, error: filesError } = useFilesQuery();
  const files = filesResponse?.data['files'];

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file first.');
      return;
    }

    uploadFile({
      file: selectedFile,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    }, {
      onSuccess: () => {
        setUploadMessage('File uploaded successfully!');
        setSelectedFile(null); // Clear the selected file
        setFilePreview(null); // Clear the file preview
        setUploadProgress(0); // Reset the upload progress
        refetch(); // Refetch the file list to refresh the data
      },
      onError: () => {
        setUploadMessage('Error uploading file');
      },
    });
  };

  const handleView = (url: string) => {
    setModalImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
  };
  const isImage = selectedFile && selectedFile.type.startsWith('image');
  const isVideo = selectedFile && selectedFile.type.startsWith('video');

  return (
    <div className="flex flex-col min-h-screen w-full bg-indigo-50 px-5 sm:px-10 lg:px-20 py-10">
      <Header />
      <div className='w-full flex items-center justify-center mt-10 sm:mt-20'>
        <Card className="w-full max-w-[80%] p-6 shadow-none bg-indigo-400">
          <DropzoneArea
            onDrop={onDrop}
            isDragActive={isDragActive}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
          />
          {selectedFile && (
            <FilePreview
              isImage={!!isImage}
              isVideo={!!isVideo}
              filePreview={filePreview}
              selectedFile={selectedFile}
            />
          )}
          <UploadButtonAndProgress
            handleUpload={handleUpload}
            selectedFile={selectedFile}
            uploadProgress={uploadProgress}
            uploadMessage={uploadMessage}
          />
        </Card>
      </div>
      <div className="px-10 py-5 flex flex-col">
        {files && (
          <FileList
            files={files.reverse()}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onView={handleView}
          />
        )}
      </div>
      <ImagePreviewModal
        isOpen={isModalOpen}
        imageUrl={modalImageUrl}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
