'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Property {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  imageUrl: string;
}

const featuredProperties: Property[] = [
  {
    id: 1,
    title: 'Modern Downtown Loft',
    price: 1800,
    beds: 2,
    baths: 1,
    sqft: 950,
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    id: 2,
    title: 'Lakeside Cottage',
    price: 2200,
    beds: 3,
    baths: 2,
    sqft: 1200,
    location: 'Chicago, IL',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    id: 3,
    title: 'City View Apartment',
    price: 1600,
    beds: 1,
    baths: 1,
    sqft: 750,
    location: 'Seattle, WA',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  },
];

const PropertyCard = ({ property, router }: { property: Property, router: any }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
    <div className="h-48 relative">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
        <span className="bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full">
          ${property.price}/mo
        </span>
      </div>
      <p className="text-gray-600 mb-4">
        {property.beds} Bed, {property.baths} Bath • {property.sqft} sq ft
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          <span className="mr-1">📍</span> {property.location}
        </span>
        <button
          onClick={() => router.push(`/properties/${property.id}`)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Home
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
            Discover and book rental properties with ease. Find your dream home today.
          </p>
          <div className="mt-10">
            <button
              onClick={() => router.push('/properties')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Properties
            </button>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Check out our most popular rental properties
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} router={router} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => router.push('/properties')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Properties
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to find your home
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Easy Search',
                  description: 'Find properties that match your criteria with our powerful search tools.',
                  icon: '🔍',
                },
                {
                  name: 'Virtual Tours',
                  description: 'Take virtual tours of properties from the comfort of your home.',
                  icon: '🏠',
                },
                {
                  name: 'Secure Payments',
                  description: 'Safe and secure payment processing for all your rental needs.',
                  icon: '💳',
                },
              ].map((feature) => (
                <div key={feature.name} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
