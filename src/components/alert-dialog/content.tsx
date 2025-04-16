import React from "react"

import { useInternalContext } from "@/src/components/alert-dialog/root"
import { cn } from "@/src/util/cn"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { AnimatePresence, motion } from "motion/react"

export const Content = React.forwardRef<
  HTMLDivElement,
  Pick<AlertDialog.AlertDialogContentProps, "children">
>(({ children }, ref) => {
  const { open } = useInternalContext()

  return (
    <AnimatePresence>
      {open && (
        <AlertDialog.Portal forceMount>
          <AlertDialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.25 },
              }}
              className={cn(
                "fixed inset-0 z-15 grid items-start justify-center py-52",
                // "bg-black/40 backdrop-blur"
                "bg-white/60 backdrop-blur-sm"
              )}
            >
              <AlertDialog.Content ref={ref} asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 40 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                  className={cn(
                    "[--alert-dialog-header-ring:theme(colors.black/0.06)]",
                    "[--alert-dialog-header-shadow:theme(colors.black/0.06)]",
                    "z-11 p-1 [--alert-dialog-header-bg:theme(colors.white)]",
                    // If `AlertDialog.Body` is set:
                    '[&:has(>[data-id="body"])]:[--alert-dialog-header-ring:theme(colors.transparent)]',
                    '[&:has(>[data-id="body"])]:[--alert-dialog-header-shadow:theme(colors.transparent)]',
                    '[&:has(>[data-id="body"])]:[--alert-dialog-header-bg:theme(colors.transparent)]',
                    // Content
                    "w-[94vw] max-w-[440px] rounded-2xl bg-surface-100",
                    "shadow-lg ring-1 ring-black/[0.06] focus:outline-none"
                  )}
                >
                  {children}
                </motion.div>
              </AlertDialog.Content>
            </motion.div>
          </AlertDialog.Overlay>
        </AlertDialog.Portal>
      )}
    </AnimatePresence>
  )
})

Content.displayName = "AlertDialog.Content"
