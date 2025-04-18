import { PageLayout } from "@/src/components/layout/page-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout
      crumbs={{ current: "", paths: [] }}
      title="Visão geral"
      description="Visão geral do seu dashboard"
    >
      <p>WIP</p>
    </PageLayout>
  )
}
