/** @type {import('tailwindcss').Config} */
export default {
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
    fontSize: {
      sm: "0.875rem",
      md: "1.25rem",
      lg: "1.5rem",
      xl: "2.25rem",
      "2xl": "4rem",
    },
    screens: {
      sm: { max: "450px" },
      md: { max: "600px" },
      lg: { max: "900px" },
      xl: { max: "1080px" },
      "2xl": { max: "1200px" },
    },

    extend: {
      transitionTimingFunction: {
        primary: "var(--animation-primary)",
        fast: "var(--animation-fast)",
        smooth: "var(--animation-smooth)",
        navigation: "var(--animation-navigationy)",
      },
      colors: {
        accent: "rgb(var(--accent) / <alpha-value>)",
        mood: "rgb(var(--mood) / <alpha-value>)",
        disabled: "rgb(var(--disabled) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",

        background: "rgb(var(--background) / <alpha-value>)",

        white: "rgb(var(--white) / <alpha-value>)",
        lightest: "rgb(var(--lightest) / <alpha-value>)",
        lighter: "rgb(var(--lighter) / <alpha-value>)",
        light: "rgb(var(--light) / <alpha-value>)",
        dark: "rgb(var(--dark) / <alpha-value>)",
        darkest: "rgb(var(--darkest) / <alpha-value>)",

        // SHADCN STYLES
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
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
  // eslint-disable-next-line
  plugins: [require("tailwindcss-animate")],
};
