import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's favorites
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('properties(*)')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching favorites:', error);
      return NextResponse.json(
        { error: 'Failed to fetch favorites' },
        { status: 500 }
      );
    }

    // Extract properties from favorites
    const properties = favorites.map((item: any) => ({
      ...item.properties,
      is_favorite: true,
    }));

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error in GET /api/favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { propertyId } = await request.json();
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Check if property exists
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', propertyId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Check if already favorited
    const { data: existing, error: existingError } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('property_id', propertyId)
      .maybeSingle();

    if (existingError) {
      console.error('Error checking existing favorite:', existingError);
      return NextResponse.json(
        { error: 'Failed to check favorite status' },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: 'Property already in favorites' },
        { status: 400 }
      );
    }

    // Add to favorites
    const { data: favorite, error: favoriteError } = await supabase
      .from('favorites')
      .insert([
        {
          user_id: session.user.id,
          property_id: propertyId,
        },
      ])
      .select('properties(*)')
      .single();

    if (favoriteError) {
      console.error('Error adding to favorites:', favoriteError);
      return NextResponse.json(
        { error: 'Failed to add to favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...favorite.properties,
      is_favorite: true,
    });
  } catch (error) {
    console.error('Error in POST /api/favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', session.user.id)
      .eq('property_id', propertyId);

    if (error) {
      console.error('Error removing from favorites:', error);
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
