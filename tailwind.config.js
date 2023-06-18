/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FF9000",
          400: "#FFA733",
        },
        secondary: {
          500: "#FDFFFC",
        },
        background: {
          900: "#0E181B",
          800: "#152428",
          700: "#1C3035",
          600: "#233C43",
        },
        gray: {
          500: "#808080",
          400: "#8C9294",
          300: "#D6D3D3",
        },
        danger: "#F61313",
      },
    },
  },
  plugins: [],
};
