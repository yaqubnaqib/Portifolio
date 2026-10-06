import type { Config } from "tailwindcss";
import hamburgers from "tailwind-hamburgers";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [hamburgers],
};

export default config;
