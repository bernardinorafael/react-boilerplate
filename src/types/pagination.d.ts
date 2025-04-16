export type PaginatedPayload<T> = {
  data: T[]
  meta: {
    total_items: number
    current_page: number
    items_per_page: number
    total_pages: number
    has_previous_page: boolean
    has_next_page: boolean
    is_first_page: boolean
    is_last_page: boolean
  }
}
