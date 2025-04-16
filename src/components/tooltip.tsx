import * as React from "react"

import { useControllableState } from "@/src/hooks/use-controllable-state"
import { cn } from "@/src/util/cn"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { AnimatePresence } from "motion/react"

export const TooltipProvider = TooltipPrimitive.Provider

interface TooltipProps {
  children: React.ReactNode
  label: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  delayDuration?: number
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({
  label,
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  side = "top",
  delayDuration = 150,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  })

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        delayDuration={delayDuration}
      >
        <TooltipPrimitive.Trigger asChild className={cn(label && "cursor-pointer")}>
          {children}
        </TooltipPrimitive.Trigger>
        <AnimatePresence>
          {isOpen && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                sideOffset={8}
                collisionPadding={5}
                side={side}
                className={cn(
                  "relative z-50 text-center text-white shadow-lg will-change-transform",
                  "max-w-52 rounded bg-app-gray-900 px-2 py-1.5 text-sm font-medium",
                  "animate-in fade-in-0 zoom-in-95",

                  "data-[state=closed]:zoom-out-95",
                  "data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0",

                  "data-[side=top]:slide-in-from-bottom-2",
                  "data-[side=bottom]:slide-in-from-top-2",
                  "data-[side=left]:slide-in-from-right-2",
                  "data-[side=right]:slide-in-from-left-2"
                )}
              >
                {label}
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
