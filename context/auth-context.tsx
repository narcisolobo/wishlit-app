'use client';

import { createContext, useContext, useEffect } from 'react';
import {
  Session,
  SupabaseClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Database } from '@/supabase/database.types';

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database, 'public'>;
  session: MaybeSession;
};

type Props = {
  children: React.ReactNode;
  session: MaybeSession;
};

const AuthContext = createContext<SupabaseContext | undefined>(undefined);

export default function AuthProvider({ children, session }: Props) {
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
    <AuthContext.Provider value={{ supabase, session }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * This is a TypeScript React hook that returns the Supabase client from the context of an
 * AuthProvider.
 * @returns The `useSupabase` function returns the Supabase client instance with the specified generic
 * types `Database` and `SchemaName`. The `Database` type represents the database schema, and the
 * `SchemaName` type represents the name of the schema to be used. The function also throws an error if
 * it is not used inside the `AuthProvider` context.
 */
export const useSupabase = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside AuthProvider');
  }

  return context.supabase as SupabaseClient<Database, 'public'>;
};

export const useSession = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useSession must be used inside AuthProvider');
  }

  return context.session;
};
