import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createClient = () => {
  return createServerComponentClient({ cookies });
};

// Server-side function to get the current user
export const getCurrentUser = async () => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

// Server-side function to check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};
