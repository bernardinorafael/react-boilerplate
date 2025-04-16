import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router"

function RootComponent() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
