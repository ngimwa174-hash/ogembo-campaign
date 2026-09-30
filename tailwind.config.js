/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        handwriting: 'var(--font-handwriting)',
      },
      fontWeight: {
        400: '400',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      boxShadow: {
        'navy-sm': '0 2px 8px -2px rgba(26, 35, 126, 0.25)',
        'navy-md': '0 10px 30px -5px rgba(26, 35, 126, 0.35)',
        'navy-lg': '0 25px 50px -10px rgba(26, 35, 126, 0.45)',
        'gold-glow': '0 0 24px rgba(245, 158, 11, 0.45)',
      },
    },
  },
  plugins: [],
};
