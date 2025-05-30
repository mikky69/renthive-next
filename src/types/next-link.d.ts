import type { ReactNode } from 'react';

export interface LinkProps {
  href: string | { pathname: string; query?: Record<string, any>; hash?: string; };
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}
