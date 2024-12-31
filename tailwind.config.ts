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
      },
      keyframes: {
        eye: {
          "0%, 5%, 10%": { opacity: '1' },
          "2.5%, 7.5%": { opacity: '0' },
        },
      },
      animation: {
        'eye': 'eye 10s ease 3s infinite normal forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
