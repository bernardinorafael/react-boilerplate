import React from "react"

import { cn } from "@/src/util/cn"
import * as PrimitiveTabs from "@radix-ui/react-tabs"
import { AnimatePresence, motion } from "motion/react"

type Tab = {
  label: string
  value: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  children: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
  onChange?: (v: string) => void
  selected: string
}

export function Tabs({ selected, tabs, onChange }: TabsProps) {
  const internalId = React.useId()
  const activeTab = selected

  return (
    <PrimitiveTabs.Root
      data-tabs
      value={activeTab}
      className="flex-1 space-y-8"
      onValueChange={onChange}
    >
      <PrimitiveTabs.List className="border-b text-base text-word-secondary">
        <div className="mb-1 flex gap-6">
          {tabs.map((t) => (
            <PrimitiveTabs.Trigger
              key={t.value}
              value={t.value}
              disabled={t.disabled}
              className={cn(
                "flex items-center gap-1 font-medium",
                "relative py-1.5 transition",

                "after:-z-10 after:rounded after:opacity-0",
                "after:absolute after:-inset-x-2 after:-top-px after:bottom-px",
                "hover:after:opacity-100",

                t.disabled && "cursor-not-allowed opacity-50",
                activeTab === t.value
                  ? "text-purple-800 after:bg-purple-50 enabled:hover:text-purple-800"
                  : "after:bg-gray-50 enabled:hover:text-word-primary"
              )}
            >
              {t.icon}
              {t.label}
              {t.badge}
              {activeTab === t.value && (
                <AnimatePresence>
                  <motion.div
                    layoutId={`__controlled-${internalId}`}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn("absolute inset-x-0 -bottom-1 h-0.5 bg-purple-800")}
                  />
                </AnimatePresence>
              )}
            </PrimitiveTabs.Trigger>
          ))}
        </div>
      </PrimitiveTabs.List>

      {tabs.map((t) => (
        <PrimitiveTabs.Content key={t.value} value={t.value}>
          {t.children}
        </PrimitiveTabs.Content>
      ))}
    </PrimitiveTabs.Root>
  )
}
