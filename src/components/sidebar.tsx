import { useId, type ReactNode } from "react"

import { AvatarPreview } from "@/src/components/avatar-preview"
import { Badge } from "@/src/components/badge"
import { SidebarItem } from "@/src/components/sidebar-item"
import type { User } from "@/src/types/user"
import { capitalize, shortName } from "@/src/util/strings"
import type { LinkProps } from "@tanstack/react-router"
import { Chart } from "iconsax-react"
import { ChevronsUpDown, ListOrdered, Package, UsersRound } from "lucide-react"

type SidebarProps = {
  user: User
}

export function Sidebar(props: SidebarProps) {
  const internalId = useId()

  const navItems: {
    id: string
    label: string
    href: LinkProps["to"]
    icon: ReactNode
  }[] = [
    {
      id: `${internalId}-overview`,
      label: "visão geral",
      href: "/",
      icon: <Chart />,
    },
    {
      id: `${internalId}-products`,
      label: "produtos",
      href: "/products",
      icon: <Package />,
    },
    {
      id: `${internalId}-orders`,
      label: "pedidos",
      href: "/orders",
      icon: <ListOrdered />,
    },
    {
      id: `${internalId}-customers`,
      label: "clientes",
      href: "/customers",
      icon: <UsersRound />,
    },
  ]

  return (
    <aside className="space-y-8 px-2 py-4">
      <div className="flex items-center justify-between rounded-md bg-white p-2 shadow-xs">
        <div className="flex w-full gap-4">
          <AvatarPreview size="sm" src={null} name={props.user.name} />
          <div className="flex items-center gap-2">
            <span className="truncate font-medium">{shortName(props.user.name)}</span>
            <Badge intent="pro">Pro</Badge>
          </div>

          <ChevronsUpDown size={18} className="ml-auto self-center opacity-40" />
        </div>
      </div>

      <nav className="space-y-4">
        <div className="flex flex-col">
          {navItems.map((item) => (
            <SidebarItem icon={item.icon} to={item.href} label={capitalize(item.label)} />
          ))}
        </div>
      </nav>
    </aside>
  )
}
