import { useId, type ReactNode } from "react"

import { AvatarPreview } from "@/src/components/avatar-preview"
import { Button } from "@/src/components/button"
import { DropdownMenu } from "@/src/components/dropdown-menu"
import { SidebarItem } from "@/src/components/sidebar-item"
import { toast } from "@/src/components/toast/toast"
import { Tokens } from "@/src/enums/tokens"
import type { User } from "@/src/types/user"
import { deleteCookie } from "@/src/util/cookie"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { capitalize, truncate } from "@/src/util/strings"
import { useNavigate, type LinkProps } from "@tanstack/react-router"
import { Chart } from "iconsax-react"
import {
  EllipsisVertical,
  ListOrdered,
  LogOut,
  MessageCircleQuestion,
  Package,
  UserCog2,
  UsersRound,
} from "lucide-react"

type SidebarProps = {
  user: User
}

export function Sidebar(props: SidebarProps) {
  const navigate = useNavigate()
  const internalId = useId()

  const mainNavItems: {
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
      label: "Catálogo de produtos",
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

  const subNavItems: {
    id: string
    label: string
    href: LinkProps["to"]
    icon: ReactNode
  }[] = [
    {
      id: `${internalId}-account`,
      label: "Minha conta",
      href: "/account",
      icon: <UserCog2 />,
    },
  ]

  async function handleLogout() {
    try {
      await request({
        method: "PATCH",
        path: "api/v1/auth/logout",
      })

      deleteCookie(Tokens.AccessToken)
      deleteCookie(Tokens.RefreshToken)
      deleteCookie(Tokens.SessionID)

      await navigate({ to: "/login" })
    } catch (err) {
      if (isHTTPError(err)) {
        toast.error("Houve um problema ao efetuar o logout")
        return
      }
    }
  }

  return (
    <aside className="space-y-4 bg-white px-2 py-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          trigger={
            <Button full size="lg" className="w-full px-2" variant="ghost">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <AvatarPreview size="sm" src={null} name={props.user.name} />
                  <h2 className="font-medium">
                    {truncate(capitalize(props.user.name, true), 15)}
                  </h2>
                </div>

                <EllipsisVertical size={15} className="opacity-50" />
              </div>
            </Button>
          }
        />
        <DropdownMenu.Content
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width]"
        >
          <DropdownMenu.Item icon={<UserCog2 />} intent="neutral">
            Meu perfil
          </DropdownMenu.Item>

          <DropdownMenu.Item icon={<MessageCircleQuestion />} intent="neutral">
            Feedback
          </DropdownMenu.Item>

          <DropdownMenu.Item icon={<LogOut />} onClick={handleLogout} intent="danger">
            Sair
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <nav className="grid gap-4">
        <div className="flex flex-col">
          {mainNavItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              to={item.href}
              label={capitalize(item.label)}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <p className="ml-2 text-xs font-medium text-word-placeholder">Configurações</p>

          <div>
            {subNavItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                to={item.href}
                label={capitalize(item.label)}
              />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
