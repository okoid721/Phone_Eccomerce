/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    extend: {
      boxShadow: {
        smooth:
          '0px 0px 1px -16px rgba(0, 0, 0, 0.006), 0px 0px 2.2px -16px rgba(0, 0, 0, 0.009), 0px 0px 3.7px -16px rgba(0, 0, 0, 0.011), 0px 0px 5.6px -16px rgba(0, 0, 0, 0.013), 0px 0px 8.1px -16px rgba(0, 0, 0, 0.015), 0px 0px 11.5px -16px rgba(0, 0, 0, 0.017), 0px 0px 16.3px -16px rgba(0, 0, 0, 0.019), 0px 0px 23.7px -16px rgba(0, 0, 0, 0.021), 0px 0px 36.6px -16px rgba(0, 0, 0, 0.024), 0px 0px 65px -16px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};
