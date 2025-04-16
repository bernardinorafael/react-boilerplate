import React, { useState } from "react"

import { DropdownMenu } from "@/src/components/dropdown-menu"
import { Tooltip } from "@/src/components/tooltip"
import * as RadixDropdown from "@radix-ui/react-dropdown-menu"

type ActionItem = {
  label: string
  intent?: "neutral" | "danger"
  disabled?: boolean
  visible?: boolean
  tooltipLabel?: string
  badge?: React.ReactNode
  kbd?: string[]
  description?: string
  onAction?: () => void
}

export function ActionDropdown({
  items,
  disabled,
  children,
  className,
  side,
  align,
}: {
  disabled?: boolean
  children: React.ReactNode
  items: ActionItem[]
  isOpen?: boolean
  className?: string
  onOpenChange?: (isOpen: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}) {
  const neutral = items.filter(
    (item) => item.intent !== "danger" && item.visible !== false
  )
  const danger = items.filter(
    (item) => item.intent === "danger" && item.visible !== false
  )

  const isAllItemsVisible = neutral.length > 0 || danger.length > 0

  return (
    <DropdownMenu.Root>
      <RadixDropdown.Trigger asChild disabled={disabled || !isAllItemsVisible}>
        {children}
      </RadixDropdown.Trigger>

      <DropdownMenu.Content side={side} align={align} className={className}>
        {neutral.length > 0 && (
          <DropdownMenu.Group>
            {neutral.map((item) => (
              <ActionItem key={item.label} {...item} />
            ))}
          </DropdownMenu.Group>
        )}

        {neutral.length > 0 && danger.length > 0 && (
          <div className="my-1">
            <DropdownMenu.Separator />
          </div>
        )}

        {danger.length > 0 && (
          <DropdownMenu.Group>
            {danger.map((item) => (
              <ActionItem key={item.label} {...item} />
            ))}
          </DropdownMenu.Group>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

function ActionItem({
  kbd,
  label,
  badge,
  onAction,
  intent = "neutral",
  disabled = false,
  tooltipLabel,
  description,
}: ActionItem) {
  const [open, setOpen] = useState(false)

  if (!tooltipLabel) {
    return (
      <DropdownMenu.Item
        kbd={kbd}
        badge={badge}
        children={label}
        description={description}
        intent={intent}
        disabled={disabled}
        onClick={onAction}
      />
    )
  }

  return (
    <Tooltip label={tooltipLabel} open={open} onOpenChange={setOpen} side="left">
      <div>
        <DropdownMenu.Item
          kbd={kbd}
          badge={badge}
          children={label}
          description={description}
          intent={intent}
          disabled={disabled}
          onClick={onAction}
        />
      </div>
    </Tooltip>
  )
}
