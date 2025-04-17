import React, { forwardRef, type ReactNode } from "react"

import { Kbd, type KbdIntent, type KbdSize } from "@/src/components/kbd"
import { Spinner } from "@/src/components/spinner"
import { cn } from "@/src/util/cn"
import { AnimatePresence, motion } from "motion/react"
import { tv, type VariantProps } from "tailwind-variants"

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center",
    "text-base font-medium transition duration-300",
    "group relative isolate select-none outline-none",
    "overflow-hidden bg-[--b-color-bg] enabled:hover:bg-[--b-color-bg-hover]",
    "border border-[--b-border-color]",

    "focus-visible:ring-[0.1875rem]",
    "focus-visible:ring-offset-[0.0625rem]",
    "focus-visible:ring-offset-[--b-color-bg]",
    "focus-visible:ring-[--b-color-ring]",

    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary: [
        "[--b-color-bg:theme(colors.violet.800)]",
        "[--b-color-ring:theme(colors.violet.800/0.3)]",
        "[--b-color-text:theme(colors.white)]",
        "[--b-color-icon:theme(colors.white)]",
        "[--b-color-bg-hover:theme(colors.violet.700)]",
        "[--b-border-color:theme(colors.transparent)]",
      ],
      secondary: [
        "[--b-color-bg:theme(colors.white)]",
        "[--b-color-ring:theme(colors.black/0.1)]",
        "[--b-color-text:theme(colors.currentColor)]",
        "[--b-color-icon:theme(colors.gray.500)]",
        "[--b-color-bg-hover:theme(colors.white)]",
        "[--b-border-color:theme(colors.border-100)]",
        "hover:[--b-border-color:theme(colors.border-200)]",
      ],
      ghost: [
        "[--b-color-bg:theme(colors.transparent)]",
        "[--b-color-ring:theme(colors.black/0.08)]",
        "[--b-color-text:theme(colors.currentColor)]",
        "[--b-color-icon:theme(colors.gray.500)]",
        "[--b-color-bg-hover:theme(colors.gray.100)]",
        "[--b-border-color:theme(colors.transparent)]",
      ],
      danger: [
        "[--b-color-bg:theme(colors.red.700)]",
        "[--b-color-ring:theme(colors.red.700/0.3)]",
        "[--b-color-text:theme(colors.white)]",
        "[--b-color-icon:theme(colors.white)]",
        "[--b-color-bg-hover:theme(colors.red.600)]",
        "[--b-border-color:theme(colors.transparent)]",
      ],
      link: [
        "[--b-color-bg:theme(colors.transparent)]",
        "[--b-color-ring:theme(colors.black/0.08)]",
        "[--b-color-text:theme(colors.currentColor)]",
        "[--b-color-icon:theme(colors.gray.500)]",
        "[--b-border-color:theme(colors.transparent)]",
      ],
    },
    shape: {
      standard: null,
      icon: "flex-none",
    },
    size: {
      lg: "h-12 rounded-[0.75rem] px-5 text-lg",
      base: "h-8 rounded-[0.5rem] px-3",
      sm: "h-7 rounded-[0.4375rem] px-2 text-sm",
    },
  },
  compoundVariants: [
    {
      variant: "link",
      className: "px-0 hover:text-purple-700",
    },
  ],
})

export const buttonContent = tv({
  base: ["[--b-height:calc((theme(spacing.3)+theme(fontSize.base[1].lineHeight))*-1)]"],
})

export type ButtonProps = Pick<
  React.ComponentProps<"button">,
  | "id"
  | "form"
  | "aria-label"
  | "className"
  | "disabled"
  | "onBlur"
  | "onClick"
  | "onFocus"
  | "tabIndex"
  | "children"
  | "role"
  | "type"
> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
    full?: boolean
    loading?: boolean
    icon?: ReactNode
    kbd?: {
      content: React.ReactNode
      size?: KbdSize
      variant?: KbdIntent
    }[]
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    kbd,
    icon,
    children,
    className,
    shape = "standard",
    size = "base",
    type = "button",
    full = false,
    disabled = false,
    variant = "primary",
    loading = false,
    ...props
  },
  forwardedRef
) {
  return (
    <button
      type={type}
      ref={forwardedRef}
      className={cn(buttonVariants({ variant, size, className, shape }))}
      disabled={disabled || loading}
      {...props}
    >
      <>
        <div className="inline-flex w-full items-center gap-1.5">
          {icon && (
            <span
              className={cn(
                "[&>svg]:size-4 [&>svg]:text-[--b-color-icon]",
                !disabled && "transition-colors group-hover:text-[--b-color-icon-hover]"
              )}
            >
              {icon}
            </span>
          )}

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center overflow-hidden text-[--b-color-text]"
              >
                <Spinner size="base" />
              </motion.div>
            )}
          </AnimatePresence>

          <span
            className={cn(
              "whitespace-nowrap",
              "text-[--b-color-text]",
              full && "w-full justify-center",
              shape === "icon" && "sr-only"
            )}
          >
            {children}
          </span>

          {kbd && (
            <span className="flex items-center gap-1">
              {kbd.map((kbd, i) => (
                <Kbd key={i} intent={kbd.variant} size={kbd.size}>
                  {kbd.content}
                </Kbd>
              ))}
            </span>
          )}
        </div>
      </>
    </button>
  )
})
