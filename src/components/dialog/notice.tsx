import { cn } from "@/src/util/cn"

export interface NoticeProps {
  children: React.ReactNode
  intent?: "neutral" | "warning" | "danger"
}

export function Notice({ children, intent = "warning" }: NoticeProps) {
  return (
    <section
      data-id="notice"
      className={cn(
        "relative mt-[--alert-dialog-body-py] block border-t",
        "only:-mt-[--alert-dialog-body-py] only:border-t-0",
        "-mx-[--alert-dialog-body-px] -mb-[--alert-dialog-body-py]",
        "after:inset-0 after:from-white after:via-white/80 after:to-transparent",
        "after:pointer-events-none after:absolute after:bg-gradient-to-r",
        intent === "warning" && "bg-warning-stripes",
        intent === "danger" && "bg-danger-stripes",
        intent === "neutral" && "bg-neutral-stripes"
      )}
    >
      <div
        className={cn(
          "relative flex gap-1.5 px-4 py-3 text-[0.8125rem] font-medium leading-[1.125rem]",
          intent === "warning" && "text-orange-600",
          intent === "danger" && "text-red-600",
          intent === "neutral" && "text-word-secondary"
        )}
      >
        {/* <span
          className={cn(
            "fill-orange-1000 z-10 mt-px",
            intent === "warning" && "fill-orange-1000",
            intent === "danger" && "fill-red-900",
            intent === "neutral" && "fill-foreground-secondary"
          )}
        >
          <Info size={16} />
        </span> */}
        <div className="z-10">{children}</div>
      </div>
    </section>
  )
}
