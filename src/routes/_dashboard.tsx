import { PageLoader } from "@/src/components/page-loader"
import { SiteHeader } from "@/src/components/site-header"
import { Tokens } from "@/src/enums/tokens"
import type { User } from "@/src/types/user"
import { getCookie } from "@/src/util/cookie"
import { request } from "@/src/util/http/request"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

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
    <>
      <SiteHeader user={user ?? ({} as User)} />

      <div className="mx-auto mt-8 w-[calc(100%-theme(spacing.10))] max-w-6xl gap-12 pb-6">
        <main className="mt-8 flex-1">
          <Outlet />
        </main>
      </div>
    </>
  )
}

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
