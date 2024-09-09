import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,json}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,json}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,json}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
