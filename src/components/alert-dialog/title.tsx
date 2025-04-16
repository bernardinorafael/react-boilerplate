import React from "react"

import * as AlertDialog from "@radix-ui/react-alert-dialog"

export const Title = React.forwardRef<
  HTMLHeadingElement,
  Pick<AlertDialog.AlertDialogTitleProps, "children">
>((props, ref) => (
  <AlertDialog.Title
    ref={ref}
    className="text-foreground text-balance text-xl font-medium"
    {...props}
  />
))

Title.displayName = "AlertDialog.Title"
