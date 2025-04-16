import { cn } from "@/src/util/cn"
import { motion } from "motion/react"
import { tv, type VariantProps } from "tailwind-variants"

export type BadgeProps = VariantProps<typeof root> & {
  className?: string
  children: React.ReactNode
}

const root = tv({
  base: [
    "relative",
    "isolate",
    "inline-flex",
    "flex-none",
    "items-center",
    "rounded-sm",
    "bg-clip-border",
    "after:absolute",
    "after:inset-0",
    "after:rounded-inherit",
    "after:bg-gradient-to-b",
    "after:from-transparent",
    "after:to-black",
    "after:opacity-2",
  ],
  variants: {
    intent: {
      secondary: "border-gray-500/10 bg-gray-100 text-gray-500",
      success: "border-green-500/10 bg-green-50 text-green-600",
      warning: "border-orange-500/10 bg-orange-50 text-orange-600",
      info: "border-blue-500/10 bg-blue-50 text-blue-600",
      danger: "border-red-500/10 bg-red-50 text-red-600",
      primary: "border-purple-500/10 bg-purple-50 text-purple-600",
      beta: "bg-blue-200 text-blue-500",
      slate: [
        "border-black/[0.16] bg-app-gray-700 text-white",
        "before:absolute before:inset-0 before:rounded-inherit before:bg-black/8",
      ],
      pro: [
        "overflow-hidden bg-app-gray-900 text-white shadow-[0_1px_2px,0_1px_2px] shadow-black/10",
        "before:shadow-[inset_0_1px_0,inset_0_0_0_1px] before:shadow-white/10",
        "before:absolute before:inset-0 before:rounded-inherit",
      ],
      "add-on": "border border-dashed border-blue-500 bg-blue-200 text-blue-500",
    },
  },
  compoundVariants: [
    {
      intent: [
        "secondary",
        "success",
        "warning",
        "danger",
        "primary",
        "slate",
        "add-on",
        "info",
      ],
      class: "border px-[0.3125rem] py-px",
    },
    {
      intent: "pro",
      class: "px-1.5 py-0.5",
    },
    {
      intent: "beta",
      class: "px-1",
    },
  ],
})

export function Badge(props: BadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex rounded-[0.375rem]",
        "after:border-blue after:absolute after:opacity-0",
        "after:-inset-1 after:rounded-inherit after:border-2",
        "focus-visible:after:opacity-100"
      )}
    >
      <span className={cn(props.className, root({ intent: props.intent }))}>
        {props.intent === "pro" && <ProBadgeEffect />}
        {props.intent === "beta" && <BetaBadgeEffect />}
        <span className="relative whitespace-nowrap text-xs font-medium">
          {props.children}
        </span>
      </span>
    </div>
  )
}

function ProBadgeEffect() {
  return (
    <motion.div
      animate={{ transform: "translateX(200%)" }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
      className={cn(
        "absolute inset-y-0 right-full w-full",
        "bg-[linear-gradient(60deg,transparent,rgba(255,255,255,0.4)_50%,transparent_51%)]"
      )}
    />
  )
}

function BetaBadgeEffect() {
  return (
    <div className="absolute inset-0">
      <Line
        dashArray="3.4 1"
        className="absolute -inset-x-[0.1875rem] -top-[0.03125rem] text-blue-500"
      />
      <Line
        dashArray="3.4 1"
        className="absolute -inset-x-[0.1875rem] -bottom-[0.03125rem] text-blue-500"
      />
      <Line
        vertical
        dashArray="3 1"
        className="absolute -inset-y-0.5 left-[0.5px] text-blue-500"
      />
      <Line
        vertical
        dashArray="3 1"
        className="absolute -inset-y-0.5 right-[0.5px] text-blue-500"
      />
    </div>
  )
}

function Line(props: { className?: string; dashArray?: string; vertical?: boolean }) {
  const strokeWidth = 1
  const { dashArray = "0", vertical = false } = props

  return (
    <span className={cn("block transform-gpu", props.className)}>
      <svg
        width={vertical ? strokeWidth : "100%"}
        height={vertical ? "100%" : strokeWidth}
      >
        <line
          x1={vertical ? strokeWidth / 2 : 0}
          y1={vertical ? 0 : strokeWidth / 2}
          x2={vertical ? strokeWidth / 2 : "100%"}
          y2={vertical ? "100%" : strokeWidth / 2}
          style={{
            stroke: "currentColor",
            strokeDasharray: dashArray,
            strokeWidth: strokeWidth,
          }}
        />
      </svg>
    </span>
  )
}
