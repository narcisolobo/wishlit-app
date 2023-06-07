/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: generateScale('violet'),
        secondary: generateScale('mauve'),
        danger: generateScale('crimson'),
      },
      fontFamily: {
        sans: 'var(--font-open-sans)',
        serif: 'var(--font-bitter)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

function generateScale(name) {
  let scale = Array.from({ length: 12 }, (_, i) => {
    let id = i + 1;
    return [
      [id, `var(--${name}${12 - i})`],
      [`a${id}`, `var(--${name}A${id})`],
    ];
  }).flat();

  return Object.fromEntries(scale);
}
