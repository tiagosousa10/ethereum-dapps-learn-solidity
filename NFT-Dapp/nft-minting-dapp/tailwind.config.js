/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration for the React application
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Files to scan for class names
  theme: {
    extend: {}, // Extend default theme (currently empty)
  },
  plugins: [], // Additional Tailwind plugins (none currently)
};
