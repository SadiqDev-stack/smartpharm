/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        gray: {
          750: '#1a1f2e',
        },
        accent: {
          orange: 'var(--accent-orange)',
          green: 'var(--accent-green)',
          red: 'var(--accent-red)',
          purple: 'var(--accent-purple)',
        },
      },
      backgroundColor: {
        light: 'var(--bg-light)',
        white: 'var(--bg-white)',
      },
      textColor: {
        dark: 'var(--text-dark)',
        muted: 'var(--text-muted)',
      },
      borderColor: {
        default: 'var(--border)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
