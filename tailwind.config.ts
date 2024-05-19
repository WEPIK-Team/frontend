import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "wpt-2xl": [
          "26px",
          {
            lineHeight: "25px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "wpt-xl": [
          "26px",
          {
            lineHeight: "27px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "wpt-lg": [
          "20px",
          {
            lineHeight: "26px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "wpt-md": [
          "17px",
          {
            lineHeight: "21px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "wpt-base-1": [
          "15px",
          {
            lineHeight: "22px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "wpt-base-2": [
          "15px",
          {
            lineHeight: "20px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "wpt-sm": [
          "13px",
          {
            lineHeight: "16px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
      },
      backgroundImage: {
        "wpc-primary-grad": "linear-gradient(-90deg, #6377DD 0%, #D19BEB 100%)",
        "wpc-second-grad": "linear-gradient(45deg, #7B78EC 0%, #6377DD 100%)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        allroundgothic: ["var(--font-allroundgothic)"],
      },
      boxShadow: {
        "wps-primary": "0 2px 10px rgba(99, 119, 221, 0.5)",
      },
      colors: {
        wpc: {
          primary: "#6377dd",
          second: "#d19beb",
          third: "#7b78ec",
          gray: "#8f8f95",
          gray2: "#dbdade",
          gray3: "#cccad1",
          "light-gray": "#eeedf1",
          Error: "#ef4d74",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "input-default": "18px",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
