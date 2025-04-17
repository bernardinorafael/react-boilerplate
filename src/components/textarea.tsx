import React from "react"

import { useFieldControl } from "@/src/components/field"
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize"
import { tv } from "tailwind-variants"

const textarea = tv({
  base: [
    "flex",
    "relative",
    "transition",
    "self-start",
    "flex-row",
    "outline-none",
    "rounded",
    "shadow",
    "group",
    "w-full",
    "py-2",
    "appearance-none",
    "rounded",
    "px-3",
    "font-sans",
    "text-base",
    "ring-1",
    "shadow",
    "shadow-black/[0.08]",
    "text-foreground",
    "shadow-black/[0.08]",
    "bg-[--textarea-root-bg-color]",
    "transition",
    "placeholder:text-word-placeholder",
    "resize-none",
    "focus-within:ring-offset-1",
    "ring-[--textarea-border-color]",
    "focus-within:ring-[0.1875rem]",
    "focus-within:ring-[--textarea-ring-color]",
    "focus-within:ring-offset-[--textarea-border-color-focus]",
  ],
  variants: {
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: null,
    },
    _validity: {
      initial: [
        "[--textarea-border-color:theme(colors.black/0.1)]",
        "[--textarea-border-color-focus:theme(colors.black/0.15)]",
        "[--textarea-ring-color:theme(colors.black/0.13)]",
      ],
      error: [
        "[--textarea-border-color:theme(colors.red.800)]",
        "[--textarea-border-color-focus:theme(colors.red.900)]",
        "[--textarea-ring-color:theme(colors.red.900/0.2)]",
      ],
      warning: [
        "[--textarea-border-color:theme(colors.orange.800)]",
        "[--textarea-border-color-focus:theme(colors.orange.800)]",
        "[--textarea-ring-color:theme(colors.orange.500/0.3)]",
      ],
      success: [
        "[--textarea-border-color:theme(colors.green.400)]",
        "[--textarea-border-color-focus:theme(colors.green.400)]",
        "[--textarea-ring-color:theme(colors.green.500/0.25)]",
      ],
    },
  },
})

export type TextareaProps = Omit<TextareaAutosizeProps, "children" | "style">

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled = false, maxRows, minRows, id, ...props }, ref) => {
    const control = useFieldControl({ element: "textarea", props: { id } })

    return (
      <div className="relative flex">
        <TextareaAutosize
          {...control.props}
          {...props}
          disabled={disabled}
          ref={ref}
          maxRows={maxRows}
          minRows={minRows ?? 4}
          className={textarea({
            className,
            disabled,
            _validity: control?.messageIntent || "initial",
          })}
        />
      </div>
    )
  }
)

Textarea.displayName = "Textarea"
