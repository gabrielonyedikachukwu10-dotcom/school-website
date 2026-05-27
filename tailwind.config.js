/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          gray: '#374151',
          yellow: '#FACC15'
        }
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 45px rgba(37, 99, 235, 0.14)'
      }
    }
  },
  plugins: []
};
