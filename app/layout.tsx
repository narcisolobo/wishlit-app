import './globals.scss';

import Header from '@/components/header/header';
import { bitter, openSans } from '@/fonts/fonts';
import { ThemeProvider } from '@/providers/theme-provider';

export const metadata = {
  title: 'Wishlit',
  description: 'Wishlit - Find your next literary obsession.',
};

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`${bitter.variable} ${openSans.variable}`}
      suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col px-4 sm:container">
            <Header />
            <main className="my-4 flex-1 rounded-xl bg-secondary-11 text-secondary-1 dark:bg-slate-800 dark:text-slate-100">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
