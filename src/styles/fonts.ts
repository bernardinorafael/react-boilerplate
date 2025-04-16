import { createFont } from "./util/create-font"

export const suisse = createFont({
  variable: "--font-suisse",
  version: 1,
  fallback: {
    fontFace: {
      src: {
        local: "Arial",
      },
      ascentOverride: "95.68%",
      descentOverride: "30.18%",
      lineGapOverride: "0%",
      sizeAdjust: "103.05%",
    },
  },
  fontFace: [
    {
      src: {
        url: "/fonts/suisse/Suisse_Intl_Bold_WebS.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "700",
    },
    {
      src: {
        url: "/fonts/suisse/Suisse_Intl_SemiBold_WebS.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "600",
    },
    {
      src: {
        url: "/fonts/suisse/Suisse_Intl_Medium_WebS.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "500",
    },
    {
      src: {
        url: "/fonts/suisse/Suisse_Intl_Book_WebS.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "450",
    },
    {
      src: {
        url: "/fonts/suisse/Suisse_Intl_Regular_WebS.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "400",
    },
  ],
})

export const sohneMono = createFont({
  variable: "--font-sohne-mono",
  version: 1,
  fallback: {
    fontFamily: [
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ],
  },
  fontFace: [
    {
      src: {
        url: "/fonts/sohne-mono/soehne-mono-buch.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "400",
    },
    {
      src: {
        url: "/fonts/sohne-mono/soehne-mono-kraftig.woff2",
        format: "woff2",
      },
      fontDisplay: "swap",
      fontStyle: "normal",
      fontWeight: "500",
    },
  ],
})

export const preload = [...suisse.preload, ...sohneMono.preload]
