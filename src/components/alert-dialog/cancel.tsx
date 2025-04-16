import React from "react"

import { Button, type ButtonProps } from "@/src/components/button"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

export const Cancel = React.forwardRef<
  HTMLButtonElement,
  Partial<Pick<ButtonProps, "children" | "disabled" | "icon" | "onClick">>
>(({ children = "Cancel", ...props }, ref) => (
  <AlertDialog.Cancel ref={ref} asChild>
    <Button variant="secondary" {...props}>
      {children}
    </Button>
  </AlertDialog.Cancel>
))

Cancel.displayName = "AlertDialog.Cancel"
