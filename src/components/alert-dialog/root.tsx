import React from "react"

import { useControllableState } from "@/src/hooks/use-controllable-state"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

export type AlertDialogRootProps = AlertDialog.AlertDialogProps
type InternalContextType = Pick<AlertDialogRootProps, "open" | "onOpenChange">

const InternalContext = React.createContext<InternalContextType | null>(null)

export function Root({
  open: openProp,
  onOpenChange,
  defaultOpen,
  ...props
}: AlertDialogRootProps) {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  return (
    <InternalContext.Provider value={{ open, onOpenChange: setOpen }}>
      <AlertDialog.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={setOpen}
        {...props}
      />
    </InternalContext.Provider>
  )
}

export const useInternalContext = () => {
  const context = React.useContext(InternalContext)

  if (!context) {
    throw new Error("AlertDialog must be used within a <AlertDialog.Root />")
  }

  return context
}
