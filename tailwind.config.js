/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#f4f6f7',
        atlas: {
          dark: '#000503',        // deep black
          gold: '#d1a95b',        // accent/golden tone
          primary: {
            default: '#193661',   // main brand color
            light: '#3471cb',     // lighter shade
            pale: '#a8c2e9',      // pale shade
          },
        },
      },
    },
  },
  plugins: [],
};
