/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
      colors: {
        border: "var(--color-border)", /* light gray */
        input: "var(--color-input)", /* pure white */
        ring: "var(--color-ring)", /* deep blue */
        background: "var(--color-background)", /* warm off-white */
        foreground: "var(--color-foreground)", /* near-black */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep blue */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* neutral slate */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* clear red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* very light gray */
          foreground: "var(--color-muted-foreground)", /* medium gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* success green */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* pure white */
          foreground: "var(--color-popover-foreground)", /* near-black */
        },
        card: {
          DEFAULT: "var(--color-card)", /* pure white */
          foreground: "var(--color-card-foreground)", /* near-black */
        },
        success: {
          DEFAULT: "var(--color-success)", /* vibrant green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* clear red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.15s ease-out",
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.98)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}