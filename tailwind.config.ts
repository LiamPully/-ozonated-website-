import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f4fbfa",
          100: "#dcf4f1",
          200: "#b9e9e2",
          300: "#84d6ca",
          400: "#45baaa",
          500: "#219688",
          600: "#1a786f",
          700: "#195f58"
        }
      },
      boxShadow: {
        luxury: "0 20px 45px -20px rgba(21, 59, 56, 0.35)"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
