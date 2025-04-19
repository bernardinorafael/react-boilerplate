import { PageLayout } from "@/src/components/layout/page-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/account/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout
      crumbs={{ current: "Minha conta", paths: [] }}
      title="Minha conta"
      description="Gerencie suas informações de conta"
    >
      <p>WIP</p>
    </PageLayout>
  )
}
