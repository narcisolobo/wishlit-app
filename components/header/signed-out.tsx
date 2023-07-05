'use client';

import Link from 'next/link';
import Button from '../ui/button';
import { useDispatch, useSupabase } from '@/context/auth-hooks';
import { User } from '@/context/auth-reducer';

function SignedOut() {
  const dispatch = useDispatch();
  const supabase = useSupabase();

  const handleSignIn = async () => {
    const {
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: 'narcisoignacio@gmail.com',
      password: 'lkjLKJ123',
    });

    const user: User = {
      id: session?.user.id,
      email: session?.user.email,
      role: session?.user.role,
    };

    if (session) {
      dispatch({ type: 'SIGN_IN', payload: user });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'SIGN_OUT', payload: null });
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" onClick={handleSignIn}>
        Sign In
      </Button>
      <Button size="sm" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default SignedOut;
