// Type definitions for next/navigation

declare module 'next/navigation' {
  import { ComponentType, ReactNode } from 'react';

  export function useRouter(): {
    push(href: string, options?: { scroll?: boolean }): void;
    replace(href: string, options?: { scroll?: boolean }): void;
    refresh(): void;
    back(): void;
    forward(): void;
    prefetch(href: string): void;
  };

  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useSelectedLayoutSegment(parallelRouteKey?: string): string | null;
  export function useSelectedLayoutSegments(parallelRouteKey?: string): string[];
  export function useParams(): Record<string, string | string[]>;
  export function useSearchParam(key: string): string | null;
  export function useSearchParamsState(key: string): [string | null, (value: string) => void];
  
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }

  export const Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;

  export function useRouter(): {
    push(href: string, options?: { scroll?: boolean }): void;
    replace(href: string, options?: { scroll?: boolean }): void;
    refresh(): void;
    back(): void;
    forward(): void;
    prefetch(href: string): void;
  };

  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useSelectedLayoutSegment(parallelRouteKey?: string): string | null;
  export function useSelectedLayoutSegments(parallelRouteKey?: string): string[];
  export function useParams(): Record<string, string | string[]>;
  export function useSearchParam(key: string): string | null;
  export function useSearchParamsState(key: string): [string | null, (value: string) => void];
}
