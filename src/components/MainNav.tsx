'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from './UserMenu';

type NavItem = {
  name: string;
  href: string;
};

export function MainNav() {
  const pathname = usePathname();

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Properties', href: '/properties' },
    { name: 'Tenants', href: '/tenants' },
    { name: 'Payments', href: '/payments' },
  ];

  // Don't show nav on auth pages
  if (['/signin', '/signup'].includes(pathname || '')) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            RentHive
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}