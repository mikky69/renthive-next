'use client';

import * as React from 'react';
import { useState, useEffect, useCallback, createContext, useContext, ReactNode, ComponentType } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User, Session, AuthError } from '@supabase/supabase-js';

// Types
type AuthResponse = {
  error: Error | null;
  session: Session | null;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
};

// Create context with proper type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  // Get initial session
  useEffect(() => {
    const getSession = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Redirect to dashboard after sign in
      if (event === 'SIGNED_IN' && pathname === '/login') {
        router.push('/dashboard');
      }
      
      // Redirect to login after sign out
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router, supabase.auth]);

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error, session: data.session };
    } catch (error) {
      return { error: error as Error, session: null };
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  // Sign up with email and password
  const signUp = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error, session: data.session };
    } catch (error) {
      return { error: error as Error, session: null };
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  // Update password
  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  // Value to be provided by the context
  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    !loading && children
  );
}

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher Order Component for protecting routes
type WithAuthProps = {
  // Add any additional props your wrapped component might need
};

export function withAuth<T extends WithAuthProps>(
  WrappedComponent: ComponentType<T>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithAuth = (props: T) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return React.createElement(
        'div',
        { className: 'flex items-center justify-center min-h-screen w-full' },
        React.createElement('div', {
          className: 'w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'
        })
      );
    }

    return React.createElement(WrappedComponent, props);
  };

  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
}

export default useAuth;
