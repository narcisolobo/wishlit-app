'use client';

import { useTheme } from 'next-themes';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      type="button"
      id="theme-toggle"
      onClick={handleSwitchTheme}
      aria-roledescription="Toggle dark mode"
      className="rounded p-3 text-current transition-colors hover:bg-secondary-9 focus:outline-none focus-visible:ring focus-visible:ring-primary-3 dark:hover:bg-slate-700">
      <FaRegMoon
        id="theme-toggle-dark-icon"
        className="block h-5 w-5 dark:hidden"
      />
      <FaRegSun
        size={24}
        id="theme-toggle-light-icon"
        className="hidden dark:block"
      />
    </button>
  );
}

export default ThemeSwitcher;
