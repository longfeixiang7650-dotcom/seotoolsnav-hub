/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: '#022c22',
          100: '#064e3b',
          200: '#065f46',
          300: '#047857',
          400: '#059669',
          500: '#10b981',
        },
        muted: {
          DEFAULT: '#6ee7b7',
          light: '#a7f3d0',
        },
        surface: '#ecfdf5',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
