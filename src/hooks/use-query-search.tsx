import { useQueryStates } from "nuqs"

export function useQuerySearch({
  defaultLimit,
  defaultPage,
}: {
  defaultPage: number
  defaultLimit: number
}) {
  return useQueryStates(
    {
      page: {
        defaultValue: defaultPage,
        clearOnDefault: false,
        parse: Number,
      },
      limit: {
        defaultValue: defaultLimit,
        clearOnDefault: false,
        parse: Number,
      },
      searchTerm: {
        defaultValue: "",
        parse: String,
      },
    },
    {
      urlKeys: { searchTerm: "term" },
    }
  )
}
