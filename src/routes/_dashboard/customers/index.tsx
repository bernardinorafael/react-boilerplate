import { PageLayout } from "@/src/components/layout/page-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/customers/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout
      crumbs={{ current: "Clientes", paths: [] }}
      title="Meus clientes"
      description="officia reprehenderit ipsum ea tempor aute sit aliquip sint ullamco consequat nulla"
    >
      <p>WIP</p>
    </PageLayout>
  )
}
