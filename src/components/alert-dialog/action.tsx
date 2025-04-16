import React from "react"

import { Button, type ButtonProps } from "@/src/components/button"

export const Action = React.forwardRef<
  HTMLButtonElement,
  Pick<ButtonProps, "children" | "icon" | "onClick" | "disabled" | "form" | "loading">
>((props, ref) => <Button ref={ref} variant="danger" {...props} />)

Action.displayName = "AlertDialog.Action"
