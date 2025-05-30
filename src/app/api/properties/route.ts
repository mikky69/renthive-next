import { NextResponse } from 'next/server';
import { fetchProperties } from '@/lib/supabase/client';
import { handleSupabaseError } from '@/lib/supabase/client';

export async function GET() {
  try {
    const properties = await fetchProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
