import { cn } from "@/src/util/cn"

export type KbdIntent = "neutral" | "danger" | "primary"
export type KbdSize = "sm" | "base"

export function Kbd(props: {
  children: React.ReactNode
  intent?: KbdIntent
  size?: KbdSize
}) {
  const intent = props.intent ?? "neutral"
  const size = props.size ?? "base"

  return (
    <kbd
      className={cn(
        "size-5 shadow-[inset_0_-1px_0_0] shadow-gray-500 centered",
        "inline-block rounded-[0.3125rem] font-mono text-xs text-word-primary",
        "border",
        size === "sm" && "size-4",
        intent === "neutral" &&
          "border-gray-400 bg-app-gray-50 text-gray-500 shadow-gray-400",
        intent === "danger" && "border-red-300 bg-red-200 text-red-400 shadow-red-300",
        intent === "primary" &&
          "border-purple-400 bg-purple-300/20 text-white shadow-purple-400"
      )}
    >
      <span className="mb-px">{props.children}</span>
    </kbd>
  )
}
