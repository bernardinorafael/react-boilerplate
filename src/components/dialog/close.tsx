import type { ButtonProps } from "@/src/components/button"
import { Button } from "@/src/components/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export function Close({
  children,
  size = "base",
  disabled,
}: {
  children?: React.ReactNode
  size?: ButtonProps["size"]
  disabled?: boolean
}) {
  return (
    <DialogPrimitive.Close asChild>
      <Button disabled={disabled} type="button" size={size} variant="secondary">
        {children}
      </Button>
    </DialogPrimitive.Close>
  )
}
