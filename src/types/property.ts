export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'other';
  status: 'available' | 'rented' | 'maintenance';
  featured: boolean;
  images: string[];
  amenities: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreatePropertyDto
  extends Omit<
    Property,
    'id' | 'created_at' | 'updated_at' | 'status' | 'featured'
  > {
  status?: 'available' | 'rented' | 'maintenance';
  featured?: boolean;
}

export interface UpdatePropertyDto extends Partial<CreatePropertyDto> {}

export interface PropertyFilterParams {
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  minSqft?: number;
  maxSqft?: number;
  type?: string[];
  location?: string;
  amenities?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
  page?: number;
  limit?: number;
}
