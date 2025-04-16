import React from "react"

import { Button } from "@/src/components/button"
import { cn } from "@/src/util/cn"
import { AnimatePresence, motion } from "motion/react"
import { tv, VariantProps } from "tailwind-variants"

const LIMIT_PAGINATION_OPTIONS = [10, 20, 50]

const root = tv({
  base: [
    "flex",
    "flex-col",
    "isolate",
    "relative",
    "rounded-2xl",
    "overflow-hidden",
    "bg-[--data-table-bg]",
    "p-[--data-table-p]",
    "[--data-table-border-width:theme(spacing.px)]",
    "[--data-table-focus-ring-color:theme(colors.app-gray-300)]",
    "[--data-table-focus-ring-width:0.1875rem]",
    "[--data-table-p:theme(spacing.1)]",
    [
      "[--data-table-cell-bg:theme(backgroundColor.surface.200)]",
      "[--data-table-cell-bg-hover:theme(colors.gray.50)]",
    ],
    "[--data-table-body-rounded:theme(borderRadius.xl)]",
    "[--data-table-header-px:--data-table-cell-px]",
    "[--data-table-header-pt:theme(spacing.3)]",
    "[--data-table-header-leading:theme(lineHeight.4)]",
    "[--data-table-header-pb:calc(var(--data-table-header-pt)-var(--data-table-border-width))]",
    "[--data-table-head-height:calc(var(--data-table-header-pt)+var(--data-table-header-pb)+var(--data-table-header-leading))]",
  ],
  variants: {
    background: {
      intense: "[--data-table-bg:theme(backgroundColor.surface.50)]",
      soft: "[--data-table-bg:theme(backgroundColor.surface.100)]",
    },
    spacing: {
      compact:
        "[--data-table-cell-px:theme(spacing.4)] [--data-table-cell-py:theme(spacing.3)]",
      cozy: "[--data-table-cell-px:theme(spacing.4)] [--data-table-cell-py:theme(spacing.4)]",
    },
  },
})

type RootTableProps = React.ComponentProps<"table"> &
  VariantProps<typeof root> & {
    count: number
    limit: number
    page: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    onPageChange: (v: number) => void
    onLimitChange: (v: number) => void
  }

export const Root = React.forwardRef<HTMLTableElement, RootTableProps>(
  (
    {
      children,
      className,
      count,
      limit,
      page,
      onPageChange,
      hasNextPage,
      hasPreviousPage,
      background = "soft",
      spacing = "cozy",
      ...props
    },
    forwardedRef
  ) => {
    const pageEnd = Math.ceil(count / limit)
    const rangeStart = (page - 1) * limit
    const rangeEnd = page && limit && count ? Math.min(page * limit, count) : count

    const showPagination = count && limit && count > limit
    const showFooter = count > 0 && count > Math.min(...LIMIT_PAGINATION_OPTIONS)

    return (
      <section
        data-table-root=""
        className={root({ className, spacing, background })}
        {...props}
      >
        <div
          className={cn(
            "relative isolate order-1 -mt-[--data-table-p]",
            // `Head` Mask
            // 1. Left overlay
            "before:absolute before:left-0 before:top-0 before:z-1 before:h-[--data-table-head-height]",
            "before:bg-gradient-to-r before:from-[--data-table-bg] before:to-transparent",
            // 2. Right overlay
            "after:absolute after:right-0 after:top-0 after:z-1 after:h-[--data-table-head-height] after:w-[--data-table-header-px]",
            "after:bg-gradient-to-l after:from-[--data-table-bg] after:to-transparent"
          )}
        >
          <div
            className={cn(
              // Add a background to the `Body`
              // (visible when scrolling beyond the scroll boundary in some OSs such as macOS)
              "after:absolute after:inset-0 after:top-[--data-table-head-height]",
              "after:z-[-1] after:rounded-[--data-table-body-rounded] after:bg-[--data-table-cell-bg]"
            )}
          >
            <div
              className={cn(
                "overflow-hidden",
                // Clip the area around the table body with a ring that matches the
                // outer background color; hiding any overflow
                // (with an extra 2px wiggle room)
                "before:pointer-events-none before:inset-0 before:z-1",
                "before:absolute before:top-[--data-table-head-height]",
                "before:ring-[length:calc(var(--data-table-p)+theme(spacing.[0.5]))] before:ring-[--data-table-bg]",
                "before:rounded-[--data-table-body-rounded]",
                // Add a border and shadow to the `Body`
                "after:absolute after:inset-0 after:top-[--data-table-head-height] after:z-2",
                "after:pointer-events-none after:rounded-[--data-table-body-rounded] after:shadow-xs"
              )}
            >
              <div className="relative overflow-x-auto [overscroll-behavior-x:contain]">
                <table
                  ref={forwardedRef}
                  className="relative w-full table-fixed caption-bottom whitespace-nowrap"
                >
                  {children}
                </table>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showFooter && (
            <motion.footer
              ref={forwardedRef}
              data-table-footer=""
              className="z-1 order-2 select-none overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, opacity: { delay: 0.1 } }}
            >
              <div className="-mb-[--data-table-p] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-[--data-table-cell-px] py-3">
                <div className="order-1 flex flex-shrink-0 items-center gap-[--data-table-limit-gap] [--data-table-limit-gap:theme(spacing.2)]">
                  <span className="inline-flex items-center text-xs font-medium [&:only-child>[role=separator]]:hidden">
                    <span>
                      <span className="text-xs font-medium text-word-secondary">
                        {rangeStart}-{rangeEnd} of {count}
                      </span>
                    </span>
                  </span>

                  <label
                    htmlFor="limit-select"
                    className="relative inline-flex items-center gap-[--data-table-limit-gap]"
                  >
                    <span className="text-xs text-word-secondary">
                      Resultados por página
                    </span>

                    {/* <Select
                      triggerSize="sm"
                      className="w-14"
                      position="fixed"
                      data-table-limit-select=""
                      aria-label="pagination-select"
                      id="pagination-select"
                      onValueChange={(v) => onLimitChange(Number(v))}
                      value={String(limit)}
                      items={LIMIT_PAGINATION_OPTIONS.map((v) => ({
                        label: String(v),
                        value: String(v),
                      }))}
                    /> */}
                  </label>
                </div>

                <AnimatePresence initial={false}>
                  {showPagination && (
                    <motion.div
                      data-table-pagination=""
                      className="order-2 flex flex-shrink-0 items-center justify-between gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        size="sm"
                        type="button"
                        variant="secondary"
                        disabled={!hasPreviousPage}
                        onClick={() => onPageChange(page - 1)}
                        // icon={<ChevronLeft className="size-3" />}
                        // shape="square"
                      >
                        Anterior
                      </Button>

                      <span className="text-xs font-medium text-word-secondary">
                        <span className="text-foreground">{page}</span>/
                        <span>{pageEnd}</span>
                      </span>

                      <Button
                        size="sm"
                        type="button"
                        variant="secondary"
                        onClick={() => onPageChange(page + 1)}
                        disabled={!hasNextPage}
                        // icon={<ChevronRight className="size-3" />}
                        // shape="square"
                      >
                        Próximo
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>
      </section>
    )
  }
)
