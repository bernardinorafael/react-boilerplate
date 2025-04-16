import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatDate(d: Date | string, pattern?: string) {
  return format(new Date(d), pattern ?? "PPp", {
    locale: ptBR,
  })
}
