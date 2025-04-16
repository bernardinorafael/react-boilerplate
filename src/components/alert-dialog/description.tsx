import React from "react"

import * as AlertDialog from "@radix-ui/react-alert-dialog"

export const Description = React.forwardRef<
  HTMLParagraphElement,
  Pick<AlertDialog.AlertDialogDescriptionProps, "children">
>((props, ref) => (
  <AlertDialog.Description
    ref={ref}
    className="max-w-[40ch] text-base font-normal text-word-secondary"
    {...props}
  />
))

Description.displayName = "AlertDialog.Description"
