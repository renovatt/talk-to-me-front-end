import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        950: '#4e4e4e',
        800: '#0f0f0f',
        700: '#81e6d9',
        600: '#212121',
        500: '#ea4335',
        400: '#2e2e2e',
      },
    },
  },
  safelist: [
    'text-blue-400',
    'text-red-400',
    'text-yellow-400',
    'text-green-400',
    'text-pink-400',
    'text-purple-400',
    'text-indigo-400',
    'text-cyan-400',
    'text-rose-400',
    'text-emerald-400',
    'text-violet-400',
    'text-amber-400',
    'text-lime-400',
    'text-sky-400',
    'text-fuchsia-400',
    'text-rose-400',
    'text-cyan-400',
  ],
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
