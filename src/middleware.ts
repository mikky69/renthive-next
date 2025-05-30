import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const protectedRoutes = [
  '/api/properties',
  '/api/favorites',
  '/api/account',
  '/dashboard',
  '/profile',
];

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const pathname = requestUrl.pathname;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) || (pathname === '/' && request.method !== 'GET')
  );

  if (isProtectedRoute) {
    const response = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res: response });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirectedFrom', requestUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css)$).*)',
  ],
};
