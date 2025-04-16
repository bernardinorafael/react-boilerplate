import plugin from "tailwindcss/plugin"

import { sohneMono, suisse } from "./src/styles/fonts"

function opacity() {
  const v = Array.from({ length: 21 }, (_, i) => ({
    [i * 5]: `${(i * 5) / 100}`,
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
  return {
    ...v,
    1: "0.01",
    2: "0.02",
    3: "0.03",
    4: "0.04",
    6: "0.06",
    7: "0.07",
    8: "0.08",
    9: "0.09",
    11: "0.11",
    12: "0.12",
  }
}

function zIndex() {
  const values = Array.from({ length: 51 }, (_, i) => ({
    [i]: i,
  })).reduce((acc, cur) => ({ ...acc, ...cur }), {})
  return { ...values, select: "20", auto: "auto" }
}

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: zIndex(),
      opacity: opacity(),

      backgroundImage: {
        "badge-gradient-variant": "linear-gradient(135deg, #3357FF, #FF5733)",
        "warning-stripes":
          "repeating-linear-gradient(-45deg, white, white 6px, rgba(255, 165, 0, 0.1) 6px, rgba(255, 165, 0, 0.1) 12px)",
        "danger-stripes":
          "repeating-linear-gradient(-45deg, white, white 6px, rgba(255, 0, 0, 0.1) 6px, rgba(255, 0, 0, 0.1) 12px)",
        "neutral-stripes":
          "repeating-linear-gradient(-45deg, white, white 6px, rgba(128, 128, 128, 0.1) 6px, rgba(128, 128, 128, 0.1) 12px)",
        "gradient-mask":
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.8125rem" }], // 10px
        xs: ["0.6875rem", { lineHeight: "0.875rem", letterSpacing: "0.015em" }], // 11px
        sm: ["0.75rem", { lineHeight: "1rem" }], // 12px
        base: ["0.875rem", { lineHeight: "1rem" }], // 14px
        lg: ["0.9375rem", { lineHeight: "1.3125rem" }], // 15px
        xl: ["1.0625rem", { lineHeight: "1.5rem" }], // 17px
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-2%" }], // 24px
      },

      borderRadius: {
        sm: "0.25rem", // 4px
        DEFAULT: "0.475rem", // 7px
        md: "0.5rem", // 8px
        lg: "0.625rem", // 10px
        xl: "0.75rem", // 12px
        xxl: "0.875rem", // 14px
        xxxl: "1rem", // 16px
        oval: "50%",
        inherit: "inherit",
      },

      colors: {
        white: "color-mix(in srgb, var(--white) calc(<alpha-value> * 100%), transparent)",
        black: "color-mix(in srgb, var(--black) calc(<alpha-value> * 100%), transparent)",
        muted: "var(--muted)",

        "word-primary": "var(--word-primary)",
        "word-secondary": "var(--word-secondary)",

        "border-50": "var(--border-50)",
        "border-100": "var(--border-100)",
        "border-200": "var(--border-200)",
      },

      backgroundColor: {
        surface: {
          50: "var(--surface-50)",
          100: "var(--surface-100)",
          200: "var(--surface-200)",
        },
      },

      height: {
        screen: "100dvh",
      },

      fontFamily: {
        sans: suisse.variable,
        mono: sohneMono.variable,
      },

      spacing: {
        px: "0.0625rem", // 1px
        xs: "0.125rem", // 2px
        sm: "0.1875rem", // 3px
        4.5: "1.125rem", // 18px
      },

      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: `
            0px 1px 0px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.02)),
            0px 1px 1px -0.5px var(--tw-shadow-color, rgb(0 0 0 / 0.02)),
            0px 0px 2px 0px var(--tw-shadow-color, rgb(0 0 0 / 0.02)),
            0px 1px 2px 0px var(--tw-shadow-color, rgb(0 0 0 / 0.02))`,
        DEFAULT: `
            0px 1px 0px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.03)),
            0px 1px 2px -0.5px var(--tw-shadow-color, rgb(0 0 0 / 0.03)),
            0px 2px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.03)),
            0px 3px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.03))`,
        md: `
            0px 1px 0px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.06)),
            0px 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.06)),
            0px 6px 8px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.06)),
            0px 8px 16px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.06))`,
        lg: `
            0px 4px 4px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.08)),
            0px 6px 7px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.08)),
            0px 8px 30px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.08)),
            0px 10px 24px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.08))`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase, addVariant }) {
      addBase(suisse.style)
      addBase(sohneMono.style)

      addVariant("initial", "html :where(&)")
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".centered": {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        },
      })
    }),
  ],
}
