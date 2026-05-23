import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zaffron: {
          dark: "#1e1e1e",
          orange: "#e67e22", // Primary accent color
          bglight: "#f9f9f9",
          border: "#e5e5e5",
          gray: "#7f8c8d"
        }
      },
      fontFamily: {
        arabic: ['var(--font-cairo)', 'sans-serif'],
        condensed: ['var(--font-cairo)', 'sans-serif'], // For headings
      },
    },
  },
  plugins: [],
};
export default config;
