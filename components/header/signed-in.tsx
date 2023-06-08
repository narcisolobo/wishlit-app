'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Separator } from '../ui/separator';
import { useSession, useSupabase } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string | null;
  email: string | null;
  role: string | null;
} | null;

function SignedIn() {
  const [user, setUser] = useState<User>(null);
  const session = useSession();
  const supabase = useSupabase();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (session?.user === null) {
      setUser(null);
    } else {
      setUser({
        ...user,
        id: session?.user.id ?? null,
        email: session?.user.email ?? null,
        role: session?.user.role ?? null,
      });
    }
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1 rounded px-2 py-1 text-sm text-secondary-3 transition-colors hover:bg-secondary-9 hover:text-secondary-2 dark:text-secondary-6 dark:hover:bg-slate-700 dark:hover:text-secondary-8">
        {user?.email && user.email}
        <BiChevronDown />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded border border-primary-5 bg-secondary-11 p-1 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-secondary-9">
          <Menu.Item
            as="button"
            className="block w-full rounded px-2 py-1 text-left hover:bg-primary-4 hover:text-secondary-11 dark:hover:bg-secondary-11 dark:hover:text-secondary-1">
            <Link href="/">Profile</Link>
          </Menu.Item>
          <Menu.Item
            as="button"
            className="block w-full rounded px-2 py-1 text-left hover:bg-primary-4 hover:text-secondary-11 dark:hover:bg-secondary-7 dark:hover:text-secondary-1">
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Separator className="mx-auto my-1 w-11/12 bg-primary-6 dark:bg-slate-700" />
          <Menu.Item
            as="button"
            onClick={handleSignOut}
            className="block w-full rounded px-2 py-1 text-left hover:bg-primary-4 hover:text-secondary-11 dark:hover:bg-secondary-7 dark:hover:text-secondary-1">
            Sign Out
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default SignedIn;
