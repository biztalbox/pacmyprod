import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "var(--white)",
        overlay: "var(--overlay)",
        gray: "var(--gray)",
        devider: "var(--devider)",
        redish: "var(--redish)",
      },
    },
  },
  plugins: [],
} satisfies Config;
