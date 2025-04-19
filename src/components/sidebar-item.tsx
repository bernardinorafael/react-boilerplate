import { cn } from "@/src/util/cn"
import { Link, type LinkProps } from "@tanstack/react-router"

type SidebarItemProps = {
  icon: React.ReactNode
  label: string
  to: LinkProps["to"]
}

export function SidebarItem({ icon, label, to }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-8 items-center gap-2 rounded px-2 text-word-secondary",
        "transition-all hover:bg-surface-100 hover:text-word-primary"
      )}
      activeProps={{
        className: "hover:bg-purple-50",
      }}
    >
      {({ isActive }) => {
        return (
          <>
            <span
              className={cn(
                "[&_svg]:size-4.5 [&_svg]:text-zinc-500",
                isActive && "[&_svg]:text-purple-800"
              )}
            >
              {icon}
            </span>
            <p className={cn("mt-px", isActive && "font-medium text-purple-800")}>
              {label}
            </p>
          </>
        )
      }}
    </Link>
  )
}
