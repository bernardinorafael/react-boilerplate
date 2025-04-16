import { Button } from "@/src/components/button"
import { cn } from "@/src/util/cn"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

type DialogHeaderProps = {
  title: string | React.ReactNode
  description?: React.ReactNode
  hasBorder?: boolean
}

export function Header({ title, description, hasBorder = false }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-6 border-b px-5 py-4",
        hasBorder && "border-b"
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <DialogPrimitive.Title className="text-balance text-xl font-semibold">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description className="max-w-[40ch] text-base font-normal text-word-secondary">
          {description}
        </DialogPrimitive.Description>
      </div>

      <DialogPrimitive.Close asChild>
        <Button size="sm" icon={<X size={18} />} variant="ghost" shape="icon">
          Close
        </Button>
      </DialogPrimitive.Close>
    </div>
  )
}
