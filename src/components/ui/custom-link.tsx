'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';

// Extend the LinkProps from next/link with our custom props
interface CustomLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/**
 * A simple wrapper around Next.js Link component that adds proper TypeScript support
 * and handles external links with security best practices.
 */
const CustomLink = ({
  href,
  children,
  className = '',
  target,
  rel,
  onClick,
  ...rest
}: CustomLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  // For external links, ensure security best practices
  const isExternal = 
    typeof href === 'string' && 
    (href.startsWith('http') || href.startsWith('//'));
  
  const linkRel = isExternal 
    ? `${rel || ''} noopener noreferrer`.trim() 
    : rel;
  
  const linkTarget = isExternal ? '_blank' : target;

  // If it's an external link, use a regular anchor tag
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={linkTarget}
        rel={linkRel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // For internal links, use Next.js Link with proper typing
  return (
    <Link 
      href={href}
      className={`${className} ${isActive ? 'active' : ''}`}
      target={linkTarget}
      rel={linkRel}
      onClick={onClick}
      {...rest as any} // Type assertion to handle the spread of rest props
    >
      {children}
    </Link>
  );
};

export default CustomLink;
