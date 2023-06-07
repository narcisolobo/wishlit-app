import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';

function Header() {
  return (
    <header
      role="banner"
      className="flex items-center justify-between rounded-b-xl bg-secondary-11 px-4 py-4 text-primary-3 dark:bg-slate-800 dark:text-slate-100">
      <Link
        href="/"
        className="rounded focus:outline-none focus-visible:ring focus-visible:ring-primary-3 focus-visible:ring-offset-4 focus-visible:ring-offset-inherit">
        <h2 className="font-serif text-3xl font-semibold">Wishlit</h2>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
