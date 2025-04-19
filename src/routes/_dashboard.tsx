import { PageLoader } from "@/src/components/page-loader"
import { Sidebar } from "@/src/components/sidebar"
import { Tokens } from "@/src/enums/tokens"
import type { User } from "@/src/types/user"
import { getCookie } from "@/src/util/cookie"
import { request } from "@/src/util/http/request"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: () => {
    const sessionId = getCookie(Tokens.SessionID)
    const accessToken = getCookie(Tokens.AccessToken)
    const refreshToken = getCookie(Tokens.RefreshToken)

    if (!sessionId || !accessToken || !refreshToken) {
      throw redirect({
        to: "/login",
        search: {
          redirect: window.location.pathname,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: user,
    isLoading: isLoadingUser,
    isFetched: isFetchedUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => {
      return request<User>({
        path: "api/v1/auth/me",
        method: "GET",
      })
    },
  })

  if (isLoadingUser && !isFetchedUser) {
    return <PageLoader />
  }

  return (
    <div className="grid h-screen grid-cols-[240px_1fr]">
      <Sidebar user={user ?? ({} as User)} />

      <div className="z-12 w-full overflow-y-auto bg-white shadow-xs">
        <div className="mx-auto w-[calc(100%-theme(spacing.10))] max-w-7xl gap-12 pb-6">
          <main className="mt-4 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
