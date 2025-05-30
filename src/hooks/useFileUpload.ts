import { useState, useCallback } from 'react';
import { usePost } from './useApi';

export interface UploadResult {
  path: string;
  url: string;
  id: string;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { post, loading, error } = usePost<{ files: UploadResult[] }>();

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      
      // Handle both FileList and File[]
      const filesArray = Array.isArray(files) ? files : Array.from(files);
      
      filesArray.forEach((file) => {
        formData.append('files', file);
      });

      const response = await post('/api/upload', formData, {
        // Don't set Content-Type, let the browser set it with the boundary
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload files';
      setUploadError(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [post]);

  const deleteFile = useCallback(async (path: string) => {
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }, []);

  return {
    uploadFiles,
    deleteFile,
    isUploading,
    uploadProgress,
    uploadError,
  };
};
