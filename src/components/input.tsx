import React from "react"

import { useFieldControl } from "@/src/components/field"
import { cn } from "@/src/util/cn"
import { Search } from "lucide-react"
import { tv, type VariantProps } from "tailwind-variants"

const root = tv({
  base: [
    "flex",
    "relative",
    "transition",
    "self-start",
    "flex-row",
    "rounded",
    "shadow",
    "ring-1",
    "shadow-black/[0.08]",
    "bg-[--input-root-bg-color]",
    "focus-within:ring-offset-1",
    "ring-[--input-border-color]",
    "focus-within:ring-[0.1875rem]",
    "focus-within:ring-[--input-ring-color]",
    "focus-within:ring-offset-[--input-border-color-focus]",
  ],
  variants: {
    type: {
      text: null,
      email: null,
      number: null,
      tel: null,
      url: null,
      search: ["[--input-pl:theme(spacing.8)]"],
      password: null,
    },
    _validity: {
      initial: [
        "[--input-border-color:theme(colors.black/0.1)]",
        "[--input-border-color-focus:theme(colors.black/0.15)]",
        "[--input-ring-color:theme(colors.black/0.13)]",
      ],
      error: [
        "[--input-border-color:theme(colors.red.600)]",
        "[--input-border-color-focus:theme(colors.red.600)]",
        "[--input-ring-color:theme(colors.red.600/0.2)]",
      ],
      warning: [],
      success: [],
    },
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
    readOnly: {
      true: "[--input-root-bg:theme(colors.gray.200)]",
      false: "[--input-root-bg:theme(colors.white)]",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: null,
    },
  },
  compoundVariants: [
    {
      type: ["text", "email", "number", "password", "tel"],
      className: "[--input-pl:--input-px] [--input-px:theme(spacing.3)]",
    },
  ],
})

const input = tv({
  base: [
    "flex-1",
    "bg-white",
    "text-base",
    "outline-none",
    "px-[--input-px]",
    "pl-[--input-pl]",
    "appearence-none truncate rounded-inherit",
    "placeholder:text-word-placeholder",
  ],
})

export type InputProps = Pick<
  React.ComponentProps<"input">,
  | "className"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onKeyDown"
  | "onFocus"
  | "onBlur"
  | "aria-label"
  | "name"
  | "placeholder"
  | "required"
  | "disabled"
  | "autoFocus"
  | "autoComplete"
  | "autoCorrect"
  | "spellCheck"
  | "min"
  | "max"
  | "id"
  | "readOnly"
  | "maxLength"
> & {
  type?: "text" | "search" | "email" | "number" | "url" | "password" | "tel"
  size?: VariantProps<typeof root>["size"]
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      value,
      prefix,
      suffix,
      size = "md",
      type = "text",
      readOnly = false,
      disabled = false,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const control = useFieldControl({
      element: "input",
      props: { id },
    })

    return (
      <div
        className={cn(
          root({
            type,
            size,
            disabled,
            readOnly,
            _validity: control?.messageIntent || "initial",
            className,
          })
        )}
      >
        <div
          className={cn(
            "flex items-center rounded-l-inherit font-medium text-word-secondary",
            "border-r bg-gray-50 px-[--input-px] text-sm",
            !prefix && "hidden"
          )}
        >
          {prefix}
        </div>

        <input
          type={type}
          name={name}
          ref={forwardedRef}
          value={value}
          disabled={disabled}
          className={input()}
          {...control.props}
          {...props}
        />

        {type === "search" && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-word-placeholder">
            <Search size={16} />
          </div>
        )}

        <div
          className={cn(
            "flex items-center rounded-r-inherit text-base text-word-secondary",
            "border-l bg-gray-50 px-[--input-px]",
            !suffix && "hidden"
          )}
        >
          {suffix}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"
