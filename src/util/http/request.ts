import { Tokens } from "@/src/enums/tokens"
import { getCookie, setCookie } from "@/src/util/cookie"
import { HTTPError, isHTTPError } from "@/src/util/http/error"
import { TagsEnum } from "@/src/util/http/tags"
import { sleep } from "@/src/util/sleep"

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  data?: Record<string, unknown> | FormData
  path: string
}

/**
 * - **method**: HTTP method `(GET, POST, PUT, PATCH, DELETE)`
 * - **path**: The path to the resource
 * - **data**: `Object` or `FormData` to send in the request
 *
 * @returns {Promise<T>} The parsed response
 */
export function request<T>(props: FetcherOptions): Promise<T> {
  return rawRequest<T>(props)
}

async function rawRequest<T>({ method = "GET", path, data }: FetcherOptions): Promise<T> {
  const url = new URL(path, import.meta.env["VITE_SERVER_URL"]).toString()
  const headers: HeadersInit = {}

  const accessToken = getCookie(Tokens.AccessToken)

  if (accessToken) {
    headers["Authorization"] = accessToken
  }

  let body = null

  if (data instanceof FormData) {
    body = data
  } else {
    headers["Content-Type"] = "application/json"
    body = method === "GET" ? null : JSON.stringify(data)
  }

  const res = await fetch(url, { cache: "no-store", body, headers, method })

  // NOTE: This is a hack to simulate a slow response and testing the loading state across the app
  if (process.env.NODE_ENV === "development") {
    const delays = [0, 0, 0, 0, 100, 200, 300]
    await sleep(delays[Math.floor(Math.random() * delays.length)])
  }

  if (!res.ok) {
    const body = await res.json()

    if (isHTTPError(body)) {
      if (body.tag === TagsEnum.RequiredRefreshToken) {
        const refreshToken = getCookie(Tokens.RefreshToken)

        try {
          const res = await request<{ access_token: string }>({
            path: "api/v1/sessions/refresh",
            method: "POST",
            data: {
              refresh_token: refreshToken,
            },
          })

          setCookie({ name: Tokens.AccessToken, value: res.access_token })
          return rawRequest({ method, path, data })
        } catch (err) {
          if (isHTTPError(err)) {
            throw new HTTPError(err)
          }
        }
      }

      throw new HTTPError(body)
    }
  }

  return res.status === 204
    ? Promise.resolve()
    : res.json().catch(() => Promise.resolve({}))
}
