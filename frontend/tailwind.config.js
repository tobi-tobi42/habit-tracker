/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981", // Neon Green
        secondary: "#8B5CF6", // Neon Purple
        accent: "#3B82F6", // Neon Blue
        gold: "#F59E0B", // Neon Gold
        dark: "#0B0F19", // Very dark background
        card: "rgba(17, 24, 39, 0.6)", // Glassmorphism card
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
