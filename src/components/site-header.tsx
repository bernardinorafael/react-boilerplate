import { useId } from "react"

import { AnimatedTabs } from "@/src/components/animated-tabs"
import { AvatarPreview } from "@/src/components/avatar-preview"
import { Badge } from "@/src/components/badge"
import { DropdownMenu } from "@/src/components/dropdown-menu"
import { LogoIcon } from "@/src/components/logo-icon"
import { toast } from "@/src/components/toast/toast"
import { Tooltip } from "@/src/components/tooltip"
import { Tokens } from "@/src/enums/tokens"
import type { User } from "@/src/types/user"
import { cn } from "@/src/util/cn"
import { deleteCookie } from "@/src/util/cookie"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { capitalize } from "@/src/util/strings"
import { Link, useNavigate, useRouterState, type LinkProps } from "@tanstack/react-router"
import { LogOut, MessageCircleQuestion, UserCog2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

type SiteHeaderProps = {
  user: User
}

export function SiteHeader(props: SiteHeaderProps) {
  const id = useId()
  const router = useRouterState()
  const navigate = useNavigate()

  const tabs: { id: string; label: string; href: LinkProps["to"] }[] = [
    { id: `${id}-overview`, label: "visão geral", href: "/" },
    { id: `${id}-products`, label: "produtos", href: "/products" },
    { id: `${id}-orders`, label: "pedidos", href: "/orders" },
    { id: `${id}-customers`, label: "clientes", href: "/customers" },
    { id: `${id}-settings`, label: "configurações", href: "/settings" },
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
    <>
      <header className="z-10 flex flex-col bg-muted px-5">
        <div className="flex h-12 items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center">
            <Link to="/" className="relative mx-2 overflow-hidden active:scale-[0.98]">
              <LogoIcon />
            </Link>

            <svg
              width="16"
              height="24"
              viewBox="0 0 16 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:hidden"
            >
              <path
                d="M14 2L2 30"
                className="stroke-app-gray-400"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>

            <div className="ml-2 flex items-center gap-2">
              <AvatarPreview size="xs" src={null} name={props.user.name} />
              <span className="truncate font-medium">
                {capitalize(props.user.name, true)}
              </span>

              <Badge intent="pro">Pro</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-1">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger triggerProps={{ variant: "ghost" }}>
                <AvatarPreview size="sm" src={null} name={props.user.name} />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content align="end" className="w-44">
                <Tooltip label="Não implementado" side="left">
                  <div>
                    <DropdownMenu.Item disabled icon={<UserCog2 />} intent="neutral">
                      Meu perfil
                    </DropdownMenu.Item>
                  </div>
                </Tooltip>

                <Tooltip label="Não implementado" side="left">
                  <div>
                    <DropdownMenu.Item
                      disabled
                      icon={<MessageCircleQuestion />}
                      intent="neutral"
                    >
                      Feedback
                    </DropdownMenu.Item>
                  </div>
                </Tooltip>

                <DropdownMenu.Item
                  icon={<LogOut />}
                  onClick={handleLogout}
                  intent="danger"
                >
                  Sair
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>

        <hr className="mb-0.5 border-[#e8e8e8] [box-shadow:0px_2px_0px_0px_white]" />
      </header>

      <div
        className={cn(
          "sticky top-0 z-12 bg-muted px-5",
          "flex flex-col shadow-[inset_0px_-1.5px] shadow-black/10",
          "before:absolute before:inset-x-0 before:bottom-0 before:h-[0.5px] before:bg-border-50"
        )}
      >
        <nav
          className={cn(
            "no-scrollbar relative isolate z-0 flex flex-shrink-0 overflow-x-auto py-2"
          )}
        >
          <AnimatedTabs className="rounded-[6px] bg-app-gray-300">
            {tabs.map((t) => {
              const isActive =
                router.location.pathname === t.href ||
                router.location.pathname.startsWith(`${t.href}/`)

              return (
                <Link
                  key={t.id}
                  to={t.href}
                  data-id={t.id}
                  className={cn(
                    "relative select-none px-3 py-2 text-word-secondary",
                    "text-base transition-colors duration-300 hover:text-word-primary",
                    isActive && "text-word-primary"
                  )}
                >
                  {capitalize(t.label)}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-item"
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          "absolute inset-x-0 -bottom-2 h-[2px] rounded bg-app-gray-900"
                        )}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </AnimatedTabs>
        </nav>
      </div>
    </>
  )
}
