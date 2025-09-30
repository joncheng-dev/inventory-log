/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        surface: {
          light: '#ffffff',
          dark: '#111827',
        },
        text: {
          primary: {
            light: '#111827',
            dark: '#f9fafb',
          },
          secondary: {
            light: '#6b7280',
            dark: '#d1d5db',
          },
          muted: {
            light: '#9ca3af',
            dark: '#9ca3af',
          },
        },
        border: {
          light: '#d1d5db',
          dark: '#374151',
        },
        accent: {
          light: '#f3f4f6',
          dark: '#374151',
        },
        focus: {
          light: '#3b82f6',
          dark: '#60a5fa',
        },
        focusRing: {
          light: '#dbeafe',
          dark: '#1e3a8a',
        },
      },
      backgroundColor: {
        'theme': 'var(--color-background)',
        'theme-surface': 'var(--color-surface)',
      },
      textColor: {
        'theme-primary': 'var(--color-text-primary)',
        'theme-secondary': 'var(--color-text-secondary)',
        'theme-muted': 'var(--color-text-muted)',
      },
      borderColor: {
        'theme': 'var(--color-border)',
        'theme-light': 'var(--color-border-light)',
      },
      ringColor: {
        'theme-focus': 'var(--color-focus)',
        'theme-focus-ring': 'var(--color-focus-ring)',
      },
    },
  },
  plugins: [],
}