'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import type { LinkProps } from 'next/link';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
}

export default function CustomLink({ children, className, ...props }: CustomLinkProps) {
  return (
    <Link 
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
