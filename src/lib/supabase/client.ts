import { createClient } from '@supabase/supabase-js';
import { Property, PropertyFilterParams } from '@/types/property';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An error occurred with the database');
};

// Property related functions
export const fetchProperties = async (filters?: Partial<PropertyFilterParams>): Promise<Property[]> => {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'available');

  // Apply filters if provided
  if (filters) {
    if (filters.minPrice) query = query.gte('price', filters.minPrice);
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
    if (filters.beds) query = query.gte('beds', filters.beds);
    if (filters.baths) query = query.gte('baths', filters.baths);
    if (filters.minSqft) query = query.gte('sqft', filters.minSqft);
    if (filters.maxSqft) query = query.lte('sqft', filters.maxSqft);
    if (filters.type?.length) query = query.in('type', filters.type);
    if (filters.location) query = query.ilike('city', `%${filters.location}%`);
    
    // Handle sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        default: // 'newest' or default
          query = query.order('created_at', { ascending: false });
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Handle pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    query = query.range(from, to);
  } else {
    // Default sorting
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  
  if (error) handleSupabaseError(error);
  return (data as Property[]) || [];
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    handleSupabaseError(error);
  }
  
  return data as Property;
};

export const createProperty = async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return data as Property;
};

export const updateProperty = async (id: string, updates: Partial<Property>) => {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return data as Property;
};

export const deleteProperty = async (id: string) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) handleSupabaseError(error);
  return true;
};

// User related functions
export const getUserProperties = async (userId: string): Promise<Property[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) handleSupabaseError(error);
  return (data as Property[]) || [];
};

// Favorites related functions
export const toggleFavorite = async (userId: string, propertyId: string) => {
  // First check if the favorite already exists
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('property_id', propertyId)
    .single();

  if (existing) {
    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', existing.id);
    
    if (error) handleSupabaseError(error);
    return { isFavorite: false };
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, property_id: propertyId }]);
    
    if (error) handleSupabaseError(error);
    return { isFavorite: true };
  }
};

export const getUserFavorites = async (userId: string): Promise<Property[]> => {
  const { data, error } = await supabase
    .from('favorites')
    .select('properties(*)')
    .eq('user_id', userId);

  if (error) handleSupabaseError(error);
  return (data?.map((item: any) => item.properties) as Property[]) || [];
};
