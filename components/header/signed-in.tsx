'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Separator } from '../ui/separator';
import { useUser, useSupabase } from '@/context/auth-hooks';
import { User } from '@/context/auth-reducer';

type Props = {
  user: User;
};

function SignedIn({ user }: Props) {
  const supabase = useSupabase();
  console.log(user);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1 rounded px-2 py-1 text-sm text-offbrand-3 transition-colors hover:bg-offbrand-9 hover:text-offbrand-2 dark:text-offbrand-6 dark:hover:bg-slate-700 dark:hover:text-offbrand-8">
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded border border-brand-5 bg-offbrand-11 p-1 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-offbrand-9">
          <Menu.Item
            as="button"
            className="block w-full rounded px-2 py-1 text-left hover:bg-brand-4 hover:text-offbrand-11 dark:hover:bg-offbrand-11 dark:hover:text-offbrand-1">
            <Link href="/">Profile</Link>
          </Menu.Item>
          <Menu.Item
            as="button"
            className="block w-full rounded px-2 py-1 text-left hover:bg-brand-4 hover:text-offbrand-11 dark:hover:bg-offbrand-7 dark:hover:text-offbrand-1">
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Separator className="mx-auto my-1 w-11/12 bg-brand-6 dark:bg-slate-700" />
          <Menu.Item
            as="button"
            onClick={handleSignOut}
            className="block w-full rounded px-2 py-1 text-left hover:bg-brand-4 hover:text-offbrand-11 dark:hover:bg-offbrand-7 dark:hover:text-offbrand-1">
            Sign Out
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default SignedIn;
