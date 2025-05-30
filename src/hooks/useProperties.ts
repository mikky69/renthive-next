import { useState, useEffect, useCallback } from 'react';
import { useGet, usePost, usePut, useDelete } from './useApi';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  availableFrom: string;
  availableTo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface PropertyFilterParams {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  location?: string;
  propertyType?: string;
}

export const useProperties = (initialFilters?: Partial<PropertyFilterParams>) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Partial<PropertyFilterParams>>(initialFilters || {});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { get, loading: getLoading, error: getError } = useGet<Property[]>(`/api/properties`, [filters]);
  const { post, loading: postLoading, error: postError } = usePost<Property>();
  const { put, loading: putLoading, error: putError } = usePut<Property>();
  const { delete: del, loading: deleteLoading, error: deleteError } = useDelete<Property>();

  const fetchProperties = useCallback(async (pageNum: number = 1, filterParams: Partial<PropertyFilterParams> = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filterParams,
        page: pageNum.toString(),
        limit: '10',
      } as any);
      const data = await get(Object.fromEntries(queryParams.entries()));
      if (data) {
        if (pageNum === 1) {
          setProperties(Array.isArray(data) ? data : []);
        } else {
          setProperties(prev => [...prev, ...(Array.isArray(data) ? data : [])]);
        }
        setPage(pageNum);
        setHasMore(Array.isArray(data) && data.length === 10);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    setPage(1);
    fetchProperties(1, filters);
  }, [filters, fetchProperties]);

  const createProperty = useCallback(async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      setLoading(true);
      const newProperty = await post('/api/properties', propertyData);
      if (newProperty) {
        setProperties(prev => [...prev, newProperty]);
      }
      return newProperty;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create property');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [post]);

  const updateProperty = useCallback(async (id: string, propertyData: Partial<Property>) => {
    try {
      setLoading(true);
      const updatedProperty = await put(`/api/properties/${id}`, propertyData);
      if (updatedProperty) {
        setProperties(prev => 
          prev.map(prop => prop.id === id ? { ...prop, ...updatedProperty } : prop)
        );
      }
      return updatedProperty;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update property');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [put]);

  const deleteProperty = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await del(`/api/properties/${id}`);
      setProperties(prev => prev.filter(prop => prop.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete property');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [del]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    fetchProperties(nextPage, filters);
  }, [loading, hasMore, page, fetchProperties, filters]);

  // Combine loading states from all API calls
  const isLoading = loading || getLoading || postLoading || putLoading || deleteLoading;
  
  // Helper function to extract error message
  const getErrorMessage = (err: unknown): string => {
    if (err === null || err === undefined) return '';
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return 'An unknown error occurred';
  };
  
  const errorMessage = error || 
    getErrorMessage(getError) || 
    getErrorMessage(postError) || 
    getErrorMessage(putError) || 
    getErrorMessage(deleteError) || 
    null;

  return {
    properties,
    loading: isLoading,
    error: errorMessage,
    filters,
    setFilters,
    createProperty,
    updateProperty,
    deleteProperty,
    loadMore,
    hasMore,
    page,
  };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const { get, loading: getLoading, error: getError } = useGet<Property>(`/api/properties/${id}`, [id]);
  const { put, loading: putLoading, error: putError } = usePut<Property>();

  const fetchProperty = useCallback(async () => {
    try {
      const data = await get();
      if (data) {
        setProperty(data);
      }
      return data;
    } catch (err) {
      console.error('Error fetching property:', err);
      throw err;
    }
  }, [get, id]);

  const updateProperty = useCallback(async (updates: Partial<Property>) => {
    try {
      const updatedProperty = await put(`/api/properties/${id}`, updates);
      if (updatedProperty) {
        setProperty(prev => (prev ? { ...prev, ...updatedProperty } : updatedProperty));
      }
      return updatedProperty;
    } catch (err) {
      console.error('Error updating property:', err);
      throw err;
    }
  }, [put, id]);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id, fetchProperty]);

  // Helper function to extract error message
  const getErrorMessage = (err: unknown): string => {
    if (err === null || err === undefined) return '';
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return 'An unknown error occurred';
  };

  return {
    property,
    loading: getLoading || putLoading,
    error: getErrorMessage(getError) || getErrorMessage(putError) || null,
    fetchProperty,
    updateProperty,
  };
};
