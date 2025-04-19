import React from "react"

import { cn } from "@/src/util/cn"
import * as RadixTabs from "@radix-ui/react-tabs"
import { Link, type LinkProps } from "@tanstack/react-router"
import { AnimatePresence, motion } from "motion/react"

type Tab = {
  label: string
  value: string
  badge?: React.ReactNode
  disabled?: boolean
  to?: LinkProps["to"]
  children: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
  onChange?: (v: string) => void
  selected: string
  children?: React.ReactNode
}

export function Tabs({ selected, tabs, onChange, children }: TabsProps) {
  const internalId = React.useId()
  const activeTab = selected

  return (
    <RadixTabs.Root
      data-tabs
      value={activeTab}
      className="flex-1 space-y-8"
      onValueChange={onChange}
    >
      <RadixTabs.List className="border-b text-base text-word-secondary">
        <div className="mb-1 flex gap-6">
          {tabs.map((t) =>
            t.to ? (
              <Link
                key={t.value}
                to={t.to}
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
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-800"
                    />
                  </AnimatePresence>
                )}
              </Link>
            ) : (
              <RadixTabs.Trigger
                key={t.value}
                value={t.value}
                disabled={t.disabled}
                className={cn(
                  "flex items-center gap-1 font-medium",
                  "relative py-1.5 transition",

                  "after:z-[-10] after:rounded after:opacity-0",
                  "after:absolute after:-inset-x-2 after:-top-px after:bottom-px",
                  "hover:after:opacity-100",

                  t.disabled && "cursor-not-allowed opacity-50",
                  activeTab === t.value
                    ? "text-purple-800 after:bg-purple-50 enabled:hover:text-purple-800"
                    : "after:bg-surface-100 enabled:hover:text-word-primary"
                )}
              >
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
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-800"
                    />
                  </AnimatePresence>
                )}
              </RadixTabs.Trigger>
            )
          )}
        </div>
      </RadixTabs.List>

      {children ? (
        <RadixTabs.Content value={activeTab}>{children}</RadixTabs.Content>
      ) : (
        tabs.map((t) => (
          <RadixTabs.Content key={t.value} value={t.value}>
            {t.children}
          </RadixTabs.Content>
        ))
      )}
    </RadixTabs.Root>
  )
}
