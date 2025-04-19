import React from "react"

import { cn } from "@/src/util/cn"

type TableWithFilterProps = {
  action?: React.ReactNode
  children: React.ReactNode
  search?: React.ReactNode
  sort?: React.ReactNode
  filter?: React.ReactNode
}

export function TableWithFilter(props: TableWithFilterProps) {
  return (
    <section className="flex flex-col gap-4">
      <header
        className={cn(
          "max-sm:flex-col sm:items-center sm:justify-between",
          "flex items-stretch justify-end gap-x-8 gap-y-4"
        )}
      >
        {props.action && (
          <div className="flex max-h-8 flex-shrink-0 items-center max-sm:self-end sm:order-2">
            {props.action}
          </div>
        )}

        {(props.sort && props.filter) ||
          (props.search && (
            <div className="flex flex-grow items-center gap-3 sm:order-1">
              {props.search && (
                <div className="flex-grow sm:max-w-[300px]">{props.search}</div>
              )}

              <div className="flex items-center gap-3">
                {props.filter && <div className="flex-shrink-0">{props.filter}</div>}
                {props.sort && <div className="flex-shrink-0">{props.sort}</div>}
              </div>
            </div>
          ))}
      </header>

      {props.children}
    </section>
  )
}
