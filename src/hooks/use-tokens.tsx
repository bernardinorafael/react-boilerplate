import { Tokens } from "@/src/enums/tokens"
import { deleteCookie, getCookie } from "@/src/util/cookie"

export function useTokens() {
  const accessToken = getCookie(Tokens.AccessToken)
  const refreshToken = getCookie(Tokens.RefreshToken)
  const sessionId = getCookie(Tokens.SessionID)

  const hasTokens = !!(accessToken && refreshToken && sessionId)

  const clearTokens = () => {
    deleteCookie(Tokens.AccessToken)
    deleteCookie(Tokens.RefreshToken)
    deleteCookie(Tokens.SessionID)
  }

  return {
    accessToken,
    refreshToken,
    sessionId,
    hasTokens,
    clearTokens,
  }
}
