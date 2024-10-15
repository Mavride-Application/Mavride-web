/** @type {import('tailwindcss').Config} */

import fluid, { extract } from 'fluid-tailwind';

import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

export default {
  content: { files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], extract },
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily: {
        outfit: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        'mavride-blue': '#0A1ED9',
      },
      backgroundImage: {
        signupBg: 'url(/src/assets/bg_desktop.png)',
        desktopLogo: 'url(/src/assets/logo_desktop.png)',
      },
    }
  },
  plugins: [
    fluid,
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements'
    })
  ]
};