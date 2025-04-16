import type { BasicEvent } from "@/src/components/toast/toast"
import { cn } from "@/src/util/cn"
import { tv } from "tailwind-variants"

const root = tv({
  base: [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "text-sm",
    "h-7 px-3 py-0",
    "font-medium",
    "transition-colors",
    "bg-[--button-color-bg]",
    "border-[--button-color-border]",
    "focus-visible:ring-[--button-color-ring]",
    "focus-visible:ring-[0.1875rem]",
  ],
  variants: {
    disabled: {
      false: null,
      true: "cursor-not-allowed opacity-75",
    },
    intent: {
      action: [
        [
          "[--button-color-bg:theme(colors.gray.900)]",
          "[--button-color-icon:theme(colors.white/0.8)]",
          "[--button-color-text:theme(colors.white)]",
          "[--button-text-shadow:0px_1px_1px_theme(colors.black/0.6)]",
          "[--button-color-border:theme(colors.white/0.1)]",
          "[--button-color-ring:theme(colors.black/0.4)]",
        ],
      ],
      confirm: [
        [
          "[--button-color-ring:theme(colors.green.500/0.4)]",
          "[--button-color-bg:theme(colors.green.600)]",
          "[--button-color-text:theme(colors.white)]",
          "[--button-text-shadow:0px_1px_1px_theme(colors.black/0.4)]",
          "[--button-color-ring:theme(colors.green.500/0.4)]",
          "shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]",
          "from-green-1000 to-green-1100 bg-gradient-to-b",
        ],
      ],
      deny: [
        [
          "[--button-color-ring:theme(colors.red.500/0.4)]",
          "[--button-color-bg:theme(colors.red.600)]",
          "[--button-color-text:theme(colors.white)]",
          "[--button-text-shadow:0px_1px_1px_theme(colors.black/0.4)]",
          "[--button-color-ring:theme(colors.red.500/0.4)]",
          "shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]",
          "from-red-1000 to-red-1100 bg-gradient-to-b",
        ],
      ],
      mutedAction: [
        // Copied styles from action
        "[--button-color-bg:theme(colors.gray.900)]",
        "[--button-color-icon:theme(colors.white/0.8)]",
        "[--button-color-text:theme(colors.white)]",
        "[--button-text-shadow:0px_1px_1px_theme(colors.black/0.6)]",
        "[--button-color-border:theme(colors.white/0.1)]",
        "[--button-color-ring:theme(colors.black/0.4)]",
        // "[--button-color-bg:transparent]",
        // "[--button-color-icon:theme(colors.white/0.8)]",
        // "[--button-color-text:theme(colors.gray.500)]",
        // "[--button-text-shadow:0px_1px_1px_theme(colors.black/0.6)]",
        // "[--button-color-border:transparent]",
        // "[--button-color-ring:theme(colors.black/0.4)]",
        // "hover:[--button-color-text:theme(colors.gray.100)]",
        // "shadow-none",
      ],
    },
    loading: {
      false: null,
      true: "pointer-events-none",
    },
  },
})

export function ToastButton({
  onClick,
  children,
  intent,
  className,
  disabled,
  form,
}: {
  onClick?: (event: BasicEvent) => void
  children: React.ReactNode
  intent: "confirm" | "deny" | "action" | "mutedAction"
  className?: string
  disabled?: boolean
  form?: string
  contentType?: "text" | "icon"
}) {
  return (
    <button
      form={form}
      disabled={disabled}
      className={cn(root({ disabled, intent: intent }), className)}
      onClick={(e) => onClick?.(e)}
      type={form ? "submit" : "button"}
    >
      <span
        className={cn(
          "flex text-[--button-color-text] drop-shadow-[--button-text-shadow] transition-colors"
        )}
      >
        {children}
      </span>
    </button>
  )
}
