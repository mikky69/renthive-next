'use client';

import { useState, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import CustomLink from '@/components/ui/custom-link';
import Link from 'next/link';

interface AuthFormProps {
  isSignUp?: boolean;
}

export default function AuthForm({ isSignUp = false }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      setMessage('Check your email for the confirmation link!');
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      router.refresh();
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? 'Create an Account' : 'Welcome to RentHive'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
      
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rent-hive-yellow focus:border-rent-hive-yellow"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rent-hive-yellow focus:border-rent-hive-yellow"
            required
            minLength={6}
          />
        </div>
        
        <div className="flex items-center justify-between">
          {!isSignUp && (
            <div className="text-sm">
              <a href="/forgot-password" className="font-medium text-rent-hive-green hover:text-rent-hive-yellow">
                Forgot password?
              </a>
            </div>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rent-hive-green hover:bg-rent-hive-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rent-hive-yellow disabled:opacity-50"
          >
            {isLoading 
              ? (isSignUp ? 'Creating Account...' : 'Signing in...')
              : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </div>
      </form>
      
      {!isSignUp && (
        <div className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <CustomLink 
            href="/register"
            className="font-medium text-rent-hive-green hover:text-rent-hive-yellow"
          >
            Sign up
          </CustomLink>
        </div>
      )}
    </div>
  );
}
