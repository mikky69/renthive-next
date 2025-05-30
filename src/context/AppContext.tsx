'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Property } from '@/types/property';

interface AppContextType {
  user: any; // Replace with your User type
  isAuthenticated: boolean;
  favorites: Property[];
  loading: boolean;
  addToFavorites: (property: Property) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorites when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const refreshFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (property: Property) => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId: property.id }),
      });
      
      if (response.ok) {
        setFavorites(prev => [...prev, property]);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`/api/favorites/${propertyId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setFavorites(prev => prev.filter(prop => prop.id !== propertyId));
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(prop => prop.id === propertyId);
  };

  const value = {
    user,
    isAuthenticated,
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
