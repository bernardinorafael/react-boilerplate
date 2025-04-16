import { Children, cloneElement, ReactNode, useEffect, useId, useState } from "react"

import { cn } from "@/src/util/cn"
import { AnimatePresence, motion } from "motion/react"

export type AnimatedBackgroundProps = {
  children: ReactNode
  defaultValue?: string
  onValueChange?: (tabId: string | null) => void
  className?: string
  enableHover?: boolean
}

export function AnimatedTabs({
  children,
  defaultValue,
  onValueChange,
  className,
  enableHover = true,
}: AnimatedBackgroundProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const uniqueId = useId()

  const handleSetActiveTab = (tabId: string | null) => {
    setActiveTab(tabId)

    if (onValueChange) {
      onValueChange(tabId)
    }
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveTab(defaultValue)
    }
  }, [defaultValue])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Children.map(children, (child: any, i) => {
    const id = child.props["data-id"]

    const props = enableHover
      ? {
          onMouseEnter: () => handleSetActiveTab(id),
          onMouseLeave: () => handleSetActiveTab(null),
        }
      : { onClick: () => handleSetActiveTab(id) }

    return cloneElement(
      child,
      {
        key: i,
        className: cn("relative inline-flex", child.props.className),
        "data-checked": activeTab === id ? "true" : "false",
        ...props,
      },
      <>
        <AnimatePresence initial={false}>
          {activeTab === id && (
            <motion.div
              layoutId={`tab-${uniqueId}`}
              className={cn("absolute inset-0", className)}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            />
          )}
        </AnimatePresence>
        <div className="z-10">{child.props.children}</div>
      </>
    )
  })
}
