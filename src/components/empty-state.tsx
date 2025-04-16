import React from "react"

import { Button, type ButtonProps } from "@/src/components/button"
import { cn } from "@/src/util/cn"
import { Squircle } from "@squircle-js/react"
import type { LucideIcon } from "lucide-react"

export function EmptyState(props: {
  title: string
  description: string
  icon?: LucideIcon
  withBorder?: boolean
  size?: "sm" | "md"
  action?: {
    label: string
    onClick: () => void
    intent?: ButtonProps["variant"]
  }
}) {
  const size = props.size ?? "md"
  const withBorder = props.withBorder ?? false

  return (
    <div
      className={cn("w-full bg-white text-center", {
        "rounded-lg border-2 border-dashed": withBorder,
        "p-8": size === "sm",
        "p-12": size === "md",
      })}
    >
      {props.icon && (
        <div className="isolate centered">
          <Squircle cornerSmoothing={1} cornerRadius={12} asChild>
            <div className="grid place-items-center border border-border-50 bg-gray-50 p-3">
              {React.createElement(props.icon, {
                className: cn("stroke-[1.5px] size-6"),
              })}
            </div>
          </Squircle>
        </div>
      )}

      <h2
        className={cn("mt-4 font-medium text-word-primary", {
          "text-lg": size === "sm",
          "text-xl": size === "md",
        })}
      >
        {props.title}
      </h2>

      <p
        className={cn("whitespace-pre-line text-word-secondary", {
          "text-sm": size === "sm",
          "text-base": size === "md",
        })}
      >
        {props.description}
      </p>

      {props.action && (
        <Button
          size="sm"
          onClick={props.action.onClick}
          variant={props.action.intent}
          className={cn("mt-4")}
        >
          {props.action.label}
        </Button>
      )}
    </div>
  )
}
