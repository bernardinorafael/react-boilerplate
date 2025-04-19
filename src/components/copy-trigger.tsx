import React from "react"

import { cn } from "@/src/util/cn"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { AnimatePresence, motion } from "motion/react"

type CopyTriggerProps = {
  children: React.ReactNode
  text: string
}

export function CopyTrigger({ children, text }: CopyTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const open = isOpen || copied

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 800)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={200} open={open} onOpenChange={setIsOpen}>
        <RadixTooltip.Trigger
          asChild
          className="relative"
          aria-label="Copy text"
          onClick={copy}
        >
          {children}
        </RadixTooltip.Trigger>
        <AnimatePresence>
          {open && (
            <RadixTooltip.Portal forceMount>
              <RadixTooltip.Content asChild sideOffset={5} collisionPadding={5}>
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  className={cn(
                    "z-40 font-medium text-white shadow-lg will-change-transform",
                    "rounded-[0.3125rem] bg-gray-900 px-2 py-1 text-xs"
                  )}
                >
                  {copied ? "Copiado" : "Copiar"}
                </motion.div>
              </RadixTooltip.Content>
            </RadixTooltip.Portal>
          )}
        </AnimatePresence>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
