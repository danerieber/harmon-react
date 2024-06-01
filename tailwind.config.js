import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            content1: "#232325",
            content2: "#272729",
            content3: "#2b2b2e",
            content4: "#303032",
            primary: { DEFAULT: "#666699", 600: "#7575a3" },
            mentioned: { DEFAULT: "#423049", 600: "#47354e" },
          },
        },
      },
    }),
  ],
};
