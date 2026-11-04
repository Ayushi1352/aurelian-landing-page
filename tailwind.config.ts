import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "currentColor",
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
        display: ["var(--font-heading)"],
      },
    },
  },
};
export default config;
