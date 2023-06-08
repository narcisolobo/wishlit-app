import './globals.scss';

import Header from '@/components/header/header';
import { bitter, openSans } from '@/fonts/fonts';
import { ThemeProvider } from '@/providers/theme-provider';
import AuthProvider from '@/context/auth-context';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/supabase/database.types';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Wishlit',
  description: 'Wishlit - Find your next literary obsession.',
};

type Props = {
  children: React.ReactNode;
};

async function RootLayout({ children }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      lang="en"
      className={`${bitter.variable} ${openSans.variable}`}
      suppressHydrationWarning>
      <body>
        <AuthProvider session={session}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col px-4 sm:container">
              <Header />
              <main className="my-4 flex-1 rounded-xl bg-secondary-11 text-secondary-1 dark:bg-slate-800 dark:text-slate-100">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
