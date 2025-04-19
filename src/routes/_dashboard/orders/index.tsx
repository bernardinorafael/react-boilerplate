import { PageLayout } from "@/src/components/layout/page-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/orders/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout
      crumbs={{ current: "Pedidos", paths: [] }}
      title="Pedidos"
      description="officia reprehenderit ipsum ea tempor aute sit aliquip sint ullamco consequat nulla"
    >
      <p>WIP</p>
    </PageLayout>
  )
}
