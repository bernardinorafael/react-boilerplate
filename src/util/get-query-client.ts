import { HTTPError } from "@/src/util/http/error"
import { QueryClient } from "@tanstack/react-query"

const IS_SERVER = typeof window === "undefined"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry(failureCount, err) {
          /**
           * Never retry on the server, errors will usually propagate
           * to the client and will be retried there instead
           */
          if (IS_SERVER) return false
          /**
           * We won't retry on known errors
           */
          if (err instanceof HTTPError) return false
          /**
           * Retry on unknown errors
           */
          return failureCount < 3 ? true : false
        },
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (IS_SERVER) return makeQueryClient()
  // Browser: Make a new query client if we don't already have one
  // The reason we cache this in a global instead of putting it in a state is
  // that there are some Suspense bugs that can happen with SSR when doing
  // the latter.
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
