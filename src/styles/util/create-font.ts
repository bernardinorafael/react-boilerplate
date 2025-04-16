type FontFace = {
  fontFamily?: string
  src: ({ url: string; local?: never } | { url?: never; local: string }) & {
    format?: string
  }
  fontDisplay?: "auto" | "block" | "swap" | "fallback" | "optional"
  fontStyle?: "auto" | "normal" | "italic" | `oblique ${number}deg`
  fontWeight?: "normal" | "bold" | `${number}` | "lighter" | "bolder"
  ascentOverride?: string
  descentOverride?: string
  lineGapOverride?: string
  sizeAdjust?: string
}

export type CreateFontOptions = {
  variable: `--${string}`
  version?: number
  fontFace: Array<Omit<FontFace, "fontFamily">>
  fallback?:
    | { fontFace: FontFace; fontFamily?: never }
    | { fontFace?: never; fontFamily: Array<string> }
    | { fontFace?: never; fontFamily?: never }
}

function createFontFace({ src, ...style }: FontFace) {
  return {
    "@font-face": {
      src: [
        src?.url && `url(${src.url})`,
        src?.local && `local(${src.local})`,
        src?.format && `format(${src.format})`,
      ]
        .filter((s): s is string => !!s)
        .join(" "),
      ...style,
    } as Record<string, string>,
  }
}

export function createFont(options: CreateFontOptions) {
  const fontFamilyKey = [
    options.variable.replace("--", "__"),
    options?.version && `v${options.version}`,
  ]
    .filter((s): s is string => !!s)
    .join("-")
  const fontFamilyFallback =
    typeof options.fallback?.fontFamily !== "undefined"
      ? options.fallback.fontFamily
      : typeof options?.fallback?.fontFace !== "undefined"
        ? [`${fontFamilyKey}__fallback`]
        : []

  const fontFamily = [fontFamilyKey, ...fontFamilyFallback]
    .filter((family): family is string => !!family)
    .join(", ")

  return {
    preload: options.fontFace
      .map(
        (f) =>
          typeof f.src.url !== "undefined" &&
          ({
            as: "font",
            href: f.src.url,
            type: `font/${f.src.format}`,
            crossOrigin: "anonymous",
          } as const)
      )
      .filter(Boolean),
    variable: `var(${options.variable})`,
    fontFamily,
    style: [
      options?.fallback?.fontFace
        ? createFontFace({
            ...options.fallback.fontFace,
            fontFamily: fontFamilyFallback?.join(","),
          })
        : // Necessary assertion due to bug in TS
          // https://github.com/microsoft/TypeScript/issues/45097
          {},
      ...options.fontFace.map((f) => createFontFace({ ...f, fontFamily: fontFamilyKey })),
      {
        ":root": {
          [options.variable]: fontFamily,
        },
        // Necessary assertion due to bug in TS
        // https://github.com/microsoft/TypeScript/issues/45097
      } as Record<string, Record<string, string>>,
    ].filter(Boolean),
  }
}
