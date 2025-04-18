import { forwardRef } from "react"

import * as RadixCheckbox from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { tv } from "tailwind-variants"

export type CheckboxProps = Omit<
  RadixCheckbox.CheckboxProps,
  "asChild" | "children" | "style"
>

type CheckboxRef = HTMLButtonElement

const checkbox = tv({
  base: [
    "shrink-0",
    "relative",
    "size-4",
    "border",
    "bg-white",
    "text-white",
    "shadow-sm",
    "inline-flex",
    "justify-center",
    "items-center",
    "rounded-sm",
    "border-purple-900/10",
    "shadow-black/6",
    "outline-none",
    "[&_svg]:stroke-[1.75]",
    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:to-black/[0.02]",
    "disabled:border-legacyGray-200 disabled:bg-legacyGray-100 disabled:before:bg-legacyGray-100 disabled:cursor-not-allowed",
  ],
  variants: {
    disabled: {
      true: null,
      false: [
        "focus-visible:border-purple-900/20 focus-visible:ring-1 focus-visible:ring-[theme(colors.black/0.08)]",
        "data-[state=checked]:border-purple-900/75 focus-visible:data-[state=checked]:ring-[theme(colors.black/0.16)]",
        "data-[state=indeterminate]:border-purple-900/75 focus-visible:data-[state=indeterminate]:ring-[theme(colors.black/0.16)]",
        "data-[state=checked]:bg-purple-800 data-[state=checked]:before:to-purple-700",
        "data-[state=indeterminate]:bg-purple-800 data-[state=indeterminate]:before:to-purple-700",
      ],
    },
  },
})

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ className, disabled = false, checked, ...props }, ref) => (
    <RadixCheckbox.Root
      ref={ref}
      className={checkbox({ disabled, className })}
      disabled={disabled}
      checked={checked}
      {...props}
    >
      <RadixCheckbox.Indicator className="z-1" asChild>
        {checked === "indeterminate" ? (
          <svg
            width="8"
            height="2"
            viewBox="0 0 8 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1H7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <Check className="!size-3 !stroke-[3.5px]" />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
)

Checkbox.displayName = "Checkbox"
