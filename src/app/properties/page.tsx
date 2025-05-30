'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Property = {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  image: string;
};

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Modern Apartment',
    price: 2500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    title: 'Luxury Villa',
    price: 4500,
    beds: 4,
    baths: 3,
    sqft: 2800,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    title: 'Cozy Studio',
    price: 1800,
    beds: 1,
    baths: 1,
    sqft: 800,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1502672260266-37c4ade2791c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export default function PropertiesPage() {
  const router = useRouter();
  const [properties] = useState<Property[]>(mockProperties);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Properties</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                <p className="text-indigo-600 font-bold text-xl mb-2">${property.price}/mo</p>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="mr-4">{property.beds} beds</span>
                  <span className="mr-4">{property.baths} baths</span>
                  <span>{property.sqft} sqft</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{property.location}</p>
                <button 
                  onClick={() => router.push(`/properties/${property.id}`)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
