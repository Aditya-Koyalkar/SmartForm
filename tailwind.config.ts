import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
      },
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(224 71.4% 4.1%)",
        card: "hsl(0 0% 100%)",
        "card-foreground": "hsl(224 71.4% 4.1%)",
        popover: "hsl(0 0% 100%)",
        "popover-foreground": "hsl(224 71.4% 4.1%)",
        primary: "hsl(262.1 83.3% 57.8%)",
        "primary-foreground": "hsl(210 20% 98%)",
        secondary: "hsl(220 14.3% 95.9%)",
        "secondary-foreground": "hsl(220.9 39.3% 11%)",
        muted: "hsl(220 14.3% 95.9%)",
        "muted-foreground": "hsl(220 8.9% 46.1%)",
        accent: "hsl(220 14.3% 95.9%)",
        "accent-foreground": "hsl(220.9 39.3% 11%)",
        destructive: "hsl(0 84.2% 60.2%)",
        "destructive-foreground": "hsl(210 20% 98%)",
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(262.1 83.3% 57.8%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "nord",
      "retro",
      "aqua",
      "valentine",
      "cupcake",
      "corporate",
      "synthwave",
      "cyberpunk",
      "halloween",
      "garden",
      "forest",
      "lofi",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "sunset",
    ],
  },
};

export default config;
