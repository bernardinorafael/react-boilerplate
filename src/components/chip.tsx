import { forwardRef, type ButtonHTMLAttributes } from "react"

import { tv, type VariantProps } from "tailwind-variants"

type ChipRef = HTMLButtonElement
type ChipAttributes = ButtonHTMLAttributes<ChipRef>

const chip = tv({
  base: [
    "[--chip-px:theme(spacing[1.5])]",
    "[--chip-bg:theme(colors.gray.50)]",
    "[--chip-color:--chip-color-idle]",
    "[--chip-icon-size:theme(spacing.5)]",
    "relative isolate inline-flex h-[--chip-icon-size] w-full max-w-max items-center overflow-hidden rounded-sm font-normal outline-none",
    "bg-[--chip-bg] text-[color:--chip-color]",
    "px-[--chip-px] pr-[var(--chip-pr,var(--chip-px))]",
    "font-book text-sm leading-none",
    "shadow-[0_0_0_1px_theme(colors.black/0.08),0_2px_0_-1px_theme(colors.black/0.04)]",
    '[&[role="presentation"]]:pointer-events-none',
    "*:min-w-0",
    "[&>[data-icon]]:text-[--chip-icon-color]",
    "[&>[data-icon]]:size-[--chip-icon-size]",
    "[&:has([data-icon])]:[--chip-pr:0]",
  ],
  variants: {
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: [
        // Note:
        // Unfortunately tailwindcss doesn't like it when we use custom
        // properties inside the `shadow-[]` class, so for now we'll duplicate
        "hover:shadow-[0px_2px_3px_-1px_theme(colors.black/0.08),_0px_2px_0px_-1px_theme(colors.black/0.04),_0px_0px_0px_1px_theme(colors.black/0.08)]",
        "focus-visible:shadow-[0px_2px_3px_-1px_theme(colors.black/0.08),_0px_2px_0px_-1px_theme(colors.black/0.04),_0px_0px_0px_1px_theme(colors.black/0.08)]",
        "hover:[--chip-color:--chip-color-active]",
        "hover:[--chip-icon-color:--chip-icon-color-active]",
        "focus-visible:[--chip-color:--chip-color-active]",
        "focus-visible:[--chip-icon-color:--chip-icon-color-active]",
        "focus-visible:ring-[0.1875rem]",
        "focus-visible:ring-[--chip-ring-color]",
        "focus-visible:ring-offset-[0.0625rem]",
        "focus-visible:ring-offset-[--chip-ring-offset-color]",
      ],
    },
    font: {
      sans: "font-sans",
      mono: "font-mono [--chip-label-translate-y:0.03125rem]",
    },
    variant: {
      neutral: [
        "[--chip-ring-color:theme(colors.gray.300)]",
        "[--chip-ring-offset-color:theme(colors.gray.100)]",
        "[--chip-icon-color-active:theme(colors.gray.500)]",
      ],
    },
  },
})

export const Chip = forwardRef(function Chip(
  {
    children,
    className,
    font = "sans",
    disabled = false,
    variant = "neutral",
    type = "button",
    icon,
    ...props
  }: Omit<VariantProps<typeof chip>, "disabled"> &
    Pick<
      ChipAttributes,
      "children" | "className" | "disabled" | "form" | "id" | "onClick" | "title" | "type"
    > & {
      icon?: React.ReactNode
    },
  ref: React.ForwardedRef<ChipRef>
) {
  return (
    <button
      ref={ref}
      {...props}
      type={type}
      className={chip({ disabled, font, variant, className })}
      data-chip=""
      data-font={font}
      data-intent={variant}
      disabled={disabled}
    >
      <span className="-my-2 -translate-y-[var(--chip-label-translate-y,0)] truncate py-2 text-gray-600">
        {children}
      </span>
      {icon && icon}
    </button>
  )
})
