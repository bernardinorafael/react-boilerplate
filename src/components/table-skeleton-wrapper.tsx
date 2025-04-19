import * as DataTable from "@/src/components/data-table"
import { cn } from "@/src/util/cn"
import { motion } from "motion/react"

export type TableSkeletonProps = {
  children: React.ReactNode
  head: {
    label: string
    width?: string
    omit?: boolean
  }[]
}

export function TableSkeletonWrapper({ children, head }: TableSkeletonProps) {
  return (
    <div
      aria-hidden
      aria-label="Loading skeleton table data"
      className={cn(
        "pointer-events-none relative -z-10",
        "before:absolute before:inset-0 before:z-40 before:-m-6 before:backdrop-blur-sm"
      )}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 z-50 -m-8 bg-white"
        animate={{
          opacity: [0, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <DataTable.Root
        page={0}
        count={0}
        limit={0}
        hasNextPage
        hasPreviousPage
        onLimitChange={() => {}}
        onPageChange={() => {}}
      >
        <DataTable.Head>
          <DataTable.Row>
            {head.map((item) => (
              <DataTable.Header key={item.label} width={item.width} omit={item.omit}>
                {item.label}
              </DataTable.Header>
            ))}
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>{children}</DataTable.Body>
      </DataTable.Root>
    </div>
  )
}
