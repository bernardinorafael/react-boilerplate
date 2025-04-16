import { useEffect, useMemo, useRef, useState } from "react"

import { Spinner } from "@/src/components/spinner"
import { getIconToast } from "@/src/components/toast/get-icon"
import { ToastButton } from "@/src/components/toast/toast-button"
import { cn } from "@/src/util/cn"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { AnimatePresence, motion } from "motion/react"
import { create } from "zustand"

export type ToastType = "error" | "success" | "warning" | "info" | "loading"

export type BasicEvent = {
  preventDefault: () => void
  stopPropagation: () => void
}

type ButtonOptions = {
  label: string
  form?: string
  disabled?: boolean
  onClick?: (event: BasicEvent) => void
}

type ExternalToast = Omit<Toast, "id" | "intent"> & {
  action?: ButtonOptions
  intent?: ToastType
}

type Toast = {
  jiggle?: boolean
  disabled?: boolean
  message?: string
  duration?: number
  intent: ToastType
  id: string
  action?: ButtonOptions
  confirm?: ButtonOptions
  deny?: ButtonOptions
  mutedAction?: ButtonOptions
  disableCloseAction?: boolean
  isLoading?: boolean
}

const useToast = create<{
  toasts: Toast[]
  add: (toast: Toast) => void
  remove: (id: string) => void
  update: (id: string, toast: ExternalToast) => void
  dismissAll: () => void
}>((set) => ({
  toasts: [],

  dismissAll: () => {
    set({ toasts: [] })
  },

  add: (toast) => {
    set(({ toasts }) => ({
      toasts: [...toasts, toast],
    }))
  },

  remove: (id) =>
    set(({ toasts }) => ({
      toasts: toasts.filter((t) => t.id !== id),
    })),

  update: (id, toast) => {
    set(({ toasts }) => ({
      toasts: toasts.map((t) => {
        if (t.id === id) {
          return { ...t, ...toast, id }
        }
        return t
      }),
    }))
  },
}))

const remove = useToast.getState().remove
const update = useToast.getState().update
const add = useToast.getState().add

export function Toaster() {
  const toasts = useToast((s) => s.toasts)

  return (
    <ToastPrimitive.Provider>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>

      <ToastPrimitive.Viewport
        className={cn(
          "flex w-full -translate-x-1/2 flex-col gap-3",
          "pointer-events-none fixed bottom-8 left-1/2 z-1"
        )}
      />
    </ToastPrimitive.Provider>
  )
}

function Toast({ toast }: { toast: Toast }) {
  const [jiggle, setJiggle] = useState(0)
  const actionCallback = useRef<(event: BasicEvent) => void>()

  useEffect(() => {
    if (toast.jiggle && !toast.disabled && !toast.isLoading) {
      setJiggle((jiggle) => jiggle + 1)
    }
  }, [toast])

  useEffect(() => {
    if (toast.duration === Infinity) return

    const timeout = setTimeout(() => {
      remove(toast.id)
    }, toast.duration || 2000)

    return () => clearTimeout(timeout)
  }, [toast.duration, toast.id])

  const { cancel, action } = useMemo(() => {
    const buttons: { action?: React.ReactNode; cancel?: React.ReactNode } = {}

    if (toast.confirm) {
      actionCallback.current = toast.confirm.onClick

      buttons.action = (
        <ToastButton
          intent="confirm"
          onClick={toast.confirm.onClick}
          form={toast.confirm.form}
          disabled={toast.disabled || toast.confirm.disabled}
        >
          {toast.confirm.label}
        </ToastButton>
      )
    }

    if (toast.deny) {
      buttons.cancel = (
        <ToastButton
          intent="deny"
          onClick={toast.deny.onClick}
          form={toast.deny.form}
          disabled={toast.disabled || toast.deny.disabled}
        >
          {toast.deny.label}
        </ToastButton>
      )
    }

    if (toast.action) {
      actionCallback.current = toast.action.onClick
      buttons.action = (
        <ToastButton
          intent="action"
          disabled={toast.disabled || toast.action.disabled}
          form={toast.action.form}
          onClick={toast.action.onClick}
        >
          {toast.action.label}
        </ToastButton>
      )
    }

    if (toast.mutedAction) {
      buttons.cancel = (
        <ToastButton
          intent="mutedAction"
          disabled={toast.disabled || toast.mutedAction.disabled}
          onClick={toast.mutedAction.onClick}
          form={toast.mutedAction.form}
        >
          {toast.mutedAction.label}
        </ToastButton>
      )
    }

    return buttons
  }, [toast])

  return (
    <ToastPrimitive.Root forceMount asChild>
      <motion.li
        layout
        initial={{ opacity: 0, scale: 0.9, y: 64 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          bounce: 0,
          duration: 0.5,
          type: "spring",
        }}
        className="pointer-events-auto relative mx-auto w-fit"
        exit={{
          y: 64,
          opacity: 0,
          scale: 0.9,
          transition: {
            bounce: 0,
            duration: 0.3,
            type: "spring",
          },
        }}
      >
        <motion.div
          key={jiggle}
          onAnimationComplete={() => {
            setJiggle(0)
            update(toast.id, { ...toast, jiggle: false, isLoading: false })
          }}
          animate={
            jiggle
              ? {
                  rotate: [0, -5, 5, -4, 4, -3, 3, -2, 2, 0],
                  transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
                  },
                }
              : {}
          }
          className={cn(
            "mx-auto rounded-full pl-3 pr-2.5 text-base text-white shadow-xl shadow-black/25",
            "flex h-11 w-fit min-w-[21.25rem] items-center bg-gray-900",
            "before:rounded-full before:shadow-[inset_0_1px_0] before:shadow-white/10",
            "before:pointer-events-none before:absolute before:inset-px"
          )}
        >
          <div className="mb-px mr-2 flex h-5 items-center">
            {toast.isLoading ? <Spinner /> : getIconToast(toast.intent)}
          </div>

          <ToastPrimitive.Description className="my-2 pr-2.5 font-medium">
            {toast.message}
          </ToastPrimitive.Description>

          {action || cancel ? (
            <div className={cn("ml-auto flex items-center gap-1.5 whitespace-nowrap")}>
              {cancel && (
                <ToastPrimitive.Close
                  asChild
                  onClick={() => {
                    if (!toast.disableCloseAction) {
                      remove(toast.id)
                    }
                  }}
                >
                  {cancel}
                </ToastPrimitive.Close>
              )}

              {action && (
                <ToastPrimitive.Action altText="Press cmd + enter or ctrl + enter to trigger this action">
                  {action}
                </ToastPrimitive.Action>
              )}
            </div>
          ) : null}
        </motion.div>
      </motion.li>
    </ToastPrimitive.Root>
  )
}

function basicToast(message: string, props: ExternalToast & { id?: string } = {}) {
  const { id = window.crypto.randomUUID(), isLoading = false, ...rest } = props
  add({ ...rest, message, id, intent: "info", isLoading })
  return id
}

export const toast = Object.assign(basicToast, {
  error: (message: string, props?: ExternalToast) => {
    const id = window.crypto.randomUUID()
    add({ ...props, id, intent: "error", message })
    return id
  },
  success: (message: string, props?: ExternalToast) => {
    const id = window.crypto.randomUUID()
    add({ ...props, id, intent: "success", message })
    return id
  },
  warning: (message: string, props?: ExternalToast) => {
    const id = window.crypto.randomUUID()
    add({ ...props, id, intent: "warning", message })
    return id
  },
  dismiss: (id: string) => remove(id),
  get: (id: string) => useToast.getState().toasts.find((toast) => toast.id === id),
  dismissAll: () => useToast.getState().dismissAll(),
  update: (id: string, props?: ExternalToast) => update(id, { ...props }),
})
