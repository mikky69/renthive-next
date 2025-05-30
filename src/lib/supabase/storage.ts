import { supabase } from './client';

const BUCKET_NAME = 'property-images';

export const uploadFile = async (file: File, path: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    path: data.path,
    publicUrl,
  };
};

export const deleteFile = async (path: string) => {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }

  return true;
};

export const uploadMultipleFiles = async (files: FileList | File[], path: string) => {
  const uploadPromises = Array.from(files).map(file => uploadFile(file, path));
  return Promise.all(uploadPromises);
};

export const getFileUrl = (path: string) => {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  
  return publicUrl;
};
