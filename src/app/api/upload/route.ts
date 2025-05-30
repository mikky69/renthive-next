import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/supabase/server';
import { uploadMultipleFiles } from '@/lib/supabase/storage';

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Upload files to Supabase Storage
    const uploads = await uploadMultipleFiles(files, `users/${user.id}`);

    return NextResponse.json({
      success: true,
      files: uploads.map(upload => ({
        path: upload.path,
        url: upload.publicUrl,
      })),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { path } = await request.json();
    
    if (!path) {
      return NextResponse.json(
        { error: 'No file path provided' },
        { status: 400 }
      );
    }

    // Delete file from Supabase Storage
    await deleteFile(path);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
