'use client';

import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';
import SignedIn from './signed-in';
import { useUser } from '@/context/auth-hooks';
import SignedOut from './signed-out';

function Header() {
  const user = useUser();

  return (
    <header
      role="banner"
      className="flex items-center justify-between rounded-b-xl bg-offbrand-11 px-4 py-4 text-brand-3 dark:bg-slate-800 dark:text-slate-100">
      <Link
        href="/"
        className="rounded focus:outline-none focus-visible:ring focus-visible:ring-brand-3 focus-visible:ring-offset-4 focus-visible:ring-offset-inherit">
        <h2 className="font-serif text-3xl font-semibold tracking-wide">
          Wish-lit
        </h2>
      </Link>
      <div className="flex items-center gap-2">
        {user ? <SignedIn user={user} /> : <SignedOut />}
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export default Header;
