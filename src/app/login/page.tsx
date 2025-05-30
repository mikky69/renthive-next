'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import { useUser } from '@/hooks/useUser';

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const redirectedFrom = '/dashboard';
  
  useEffect(() => {
    if (!isLoading && user) {
      router.push(redirectedFrom);
    }
  }, [user, isLoading, router, redirectedFrom]);
  
  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rent-hive-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            RentHive
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        <AuthForm isSignUp={false} />
      </div>
    </div>
  );
}
