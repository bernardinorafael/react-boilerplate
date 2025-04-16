import { Toaster } from "@/src/components/toast/toast"
import { routeTree } from "@/src/routeTree.gen"
import { getQueryClient } from "@/src/util/get-query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { NuqsAdapter } from "nuqs/adapters/react"
import { HotkeysProvider } from "react-hotkeys-hook"

const router = createRouter({
  routeTree,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export function App() {
  const query = getQueryClient()

  return (
    <HotkeysProvider>
      <NuqsAdapter>
        <QueryClientProvider client={query}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </QueryClientProvider>
      </NuqsAdapter>
    </HotkeysProvider>
  )
}
