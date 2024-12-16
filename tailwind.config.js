// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Scan files in the pages folder
    './components/**/*.{js,ts,jsx,tsx}', // Scan files in the components folder
    './app/**/*.{js,ts,jsx,tsx}', // For App directory (Next.js 13+)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};