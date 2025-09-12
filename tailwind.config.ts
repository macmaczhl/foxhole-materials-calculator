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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Foxhole theme colors
        panel: {
          300: "var(--panel-300)",
          400: "var(--panel-400)",
        },
        muted: {
          200: "var(--muted-200)",
          300: "var(--muted-300)",
          400: "var(--muted-400)",
        },
        border: {
          600: "var(--border-600)",
        },
        accent: {
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
        },
        danger: {
          500: "var(--danger-500)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
