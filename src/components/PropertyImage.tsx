'use client';

import { useState } from 'react';
import Image, { type ImageProps, type StaticImageData } from 'next/image';

interface PropertyImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

const PropertyImage = ({ src, alt, className = '', ...props }: PropertyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        unoptimized={typeof src === 'string' && src.startsWith('http')}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default PropertyImage;
