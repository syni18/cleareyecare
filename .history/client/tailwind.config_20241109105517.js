/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Targeting React component files
    "./public/index.html", // Include HTML entry file if necessary
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#1B9C9C",
        customGray: "#333333",
      },
    },
  },
  plugins: [],
};
