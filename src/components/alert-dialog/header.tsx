import { cn } from "@/src/util/cn"

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header
      className={cn(
        "bg-[--alert-dialog-header-bg] ring-[--alert-dialog-header-ring]",
        "relative flex flex-col items-start gap-1 ring-1",
        "shadow-[--alert-dialog-header-shadow]"
      )}
    >
      {children}
    </header>
  )
}
