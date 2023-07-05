import { useContext } from 'react';
import { AuthContext } from './auth-context';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/supabase/database.types';

export const useSupabase = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside AuthProvider');
  }

  return context.supabase as SupabaseClient<Database, 'public'>;
};

export const useUser = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useUser must be used inside AuthProvider');
  }

  return context.user;
};

export const useDispatch = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useDispatch must be used inside AuthProvider');
  }

  return context.dispatch;
};
