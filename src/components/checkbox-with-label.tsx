import React from "react"

import { Checkbox, type CheckboxProps } from "@/src/components/checkbox"
import { cn } from "@/src/util/cn"

export const CheckboxWithLabel = React.forwardRef(function CheckboxWithLabel(
  {
    id,
    children,
    description,
    className,
    ...props
  }: {
    id: string
    children: React.ReactNode
    description?: string
  } & CheckboxProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex items-start gap-x-3",
        "[&_[aria-checked=true]+span]:text-word-primary",
        className
      )}
    >
      <Checkbox id={id} {...props} ref={ref} aria-labelledby={`${id}-label`} />

      <div className="flex cursor-pointer select-none flex-col">
        <span
          id={`${id}-label`}
          className={cn(
            "flex items-center gap-2 font-medium transition-colors",
            "text-word-primary opacity-80 group-hover:opacity-100"
          )}
        >
          <span>{children}</span>
        </span>
        {description && (
          <p className="text-sm font-normal text-word-secondary transition-colors">
            {description}
          </p>
        )}
      </div>
    </label>
  )
})
