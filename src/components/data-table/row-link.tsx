import React from "react"

import { cn } from "@/src/util/cn"
import { Slot, type AsChildProp } from "@/src/util/slot"

type RowLinkProps = Pick<React.ComponentProps<"a">, "className" | "children"> &
  AsChildProp

export const RowLink = React.forwardRef<HTMLAnchorElement, RowLinkProps>(
  ({ asChild, className, ...rest }, forwardedRef) => {
    const Component = asChild ? Slot : "a"

    return (
      <Component
        data-table-row-link=""
        className={cn(
          "static -mx-1 -my-0.5 appearance-none rounded px-1 py-0.5 outline-none",
          "focus-visible:relative focus-visible:ring-[--data-table-focus-ring-color]",
          "focus-visible:z-5 focus-visible:ring-[length:--data-table-focus-ring-width]",
          "before:z-0 before:block before:h-full before:w-full before:cursor-pointer",
          "before:pointer-events-auto before:absolute before:left-0 before:top-0",
          className
        )}
        ref={forwardedRef}
        {...rest}
      />
    )
  }
)
