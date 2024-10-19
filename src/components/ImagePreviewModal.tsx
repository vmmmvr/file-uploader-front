// ImagePreviewModal.tsx
import React from 'react';
import { Dialog, DialogBody, DialogHeader, DialogFooter, Button } from "@material-tailwind/react";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ isOpen, imageUrl, onClose }) => {
    
    
  return (
    <Dialog open={isOpen} size="lg" handler={onClose}>
      <DialogHeader>Image Preview</DialogHeader>
      <DialogBody divider>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-auto rounded-lg shadow"
          />
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImagePreviewModal;
