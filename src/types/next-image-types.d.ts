// Type definitions for next/image-types/global

declare module 'next/image-types/global' {
  /**
   * The `img` element is modified to include the `fetchPriority` property.
   * This is a workaround for TypeScript not including it by default.
   */
  interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }

  /**
   * The `ImageProps` interface is extended to include the `unoptimized` property.
   */
  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
  }

  interface StaticRequire {
    default: StaticImageData;
  }

  type StaticImport = StaticRequire | StaticImageData;

  interface ImageProps {
    src: string | StaticImport;
    width?: number | string;
    height?: number | string;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    onLoadingComplete?: (img: HTMLImageElement) => void;
    onError?: (err: Error) => void;
  }
}
