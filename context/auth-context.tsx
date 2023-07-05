'use client';

import { createContext, useEffect, useReducer } from 'react';
import {
  Session,
  SupabaseClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Database } from '@/supabase/database.types';
import { authReducer, type User, type AuthAction } from './auth-reducer';

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database, 'public'>;
  user: User;
  dispatch: React.Dispatch<AuthAction>;
};

type Props = {
  children: React.ReactNode;
  session: MaybeSession;
};

const initialUser: User = null;

export const AuthContext = createContext<SupabaseContext | undefined>(
  undefined
);

export default function AuthProvider({ children, session }: Props) {
  const [user, dispatch] = useReducer(authReducer, initialUser);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, _session) => {
      if (_session?.access_token !== session?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, session]);

  return (
    <AuthContext.Provider value={{ supabase, user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
