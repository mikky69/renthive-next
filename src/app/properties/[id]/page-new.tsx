'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StaticImageData } from 'next/image';
import PropertyImage from '@/components/PropertyImage';

type Property = {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  description: string;
  features: string[];
  images: (string | StaticImageData)[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string | StaticImageData;
  };
};

// Mock data for the property
const mockProperty: Property = {
  id: 1,
  title: 'Modern Downtown Loft',
  price: 2500,
  beds: 2,
  baths: 2,
  sqft: 1200,
  location: '123 Main St, New York, NY 10001',
  description: 'This stunning modern loft in the heart of downtown offers the perfect blend of style and convenience. The open floor plan features floor-to-ceiling windows, high-end finishes, and a spacious layout perfect for entertaining or comfortable living.',
  features: [
    'Open floor plan',
    'Hardwood floors',
    'Stainless steel appliances',
    'In-unit laundry',
    'Walk-in closet',
    'Balcony',
    'Fitness center access',
    '24/7 security'
  ],
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-37c4ade2791c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
  ],
  agent: {
    name: 'Sarah Johnson',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@example.com',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the property data based on the ID
    const fetchProperty = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setProperty(mockProperty);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }


  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-96 bg-gray-200 overflow-hidden">
        {property.images.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <PropertyImage
              src={image}
              alt={`${property.title} - Image ${index + 1}`}
              className="w-full h-full"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                {property.title}
              </h1>
              <div className="text-2xl font-bold text-indigo-600">
                ${property.price.toLocaleString()}/mo
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}
              </div>
              <div className="flex items-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {property.sqft.toLocaleString()} sqft
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-600 mb-4">{property.description}</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4">
                {/* Map placeholder */}
                <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map view coming soon</p>
                </div>
              </div>
              <p className="text-gray-600">{property.location}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h2>
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <PropertyImage
                    src={property.agent.image}
                    alt={property.agent.name}
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{property.agent.name}</h3>
                  <p className="text-indigo-600">Rental Agent</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Call: {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Email Agent
                </a>
                <button
                  onClick={() => {}}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Schedule a Tour
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Share this property</h3>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Link</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
