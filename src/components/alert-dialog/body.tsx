import { cn } from "@/src/util/cn"

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-id="body"
      className={cn(
        "[--alert-dialog-body-px:theme(spacing.5)]",
        "[--alert-dialog-body-py:theme(spacing.4)]",
        "py-[--alert-dialog-body-py] shadow shadow-black/[.06] ring-1 ring-black/[0.06]",
        "overflow-hidden rounded-xl bg-white px-[--alert-dialog-body-px]"
      )}
    >
      {children}
    </div>
  )
}
