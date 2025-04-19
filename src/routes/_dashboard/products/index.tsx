import { useState } from "react"

import { Badge } from "@/src/components/badge"
import { Button } from "@/src/components/button"
import { PageLayout } from "@/src/components/layout/page-layout"
import { Tabs } from "@/src/components/tabs"
import { ArchivedProductsTable } from "@/src/modules/products/components/archived-products-table"
import { NewProductDialog } from "@/src/modules/products/components/new-product-dialog"
import { ProductsTable } from "@/src/modules/products/components/products-table"
import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "lucide-react"

export const Route = createFileRoute("/_dashboard/products/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("all")

  return (
    <>
      <PageLayout
        crumbs={{
          current: "Produtos",
          paths: [],
        }}
        title="Catálogo de produtos"
        titleBadge={<Badge intent="add-on">Novo</Badge>}
        description="occaecat mollit amet aliqua eu fugiat aute nisi proident officia exercitation velit"
        actions={
          <Button onClick={() => setOpen(true)} icon={<Plus />}>
            Criar produto
          </Button>
        }
      >
        <Tabs
          selected={tab}
          onChange={setTab}
          tabs={[
            {
              label: "Todos os produtos",
              value: "all",
              children: <ProductsTable />,
            },
            {
              label: "Arquivados",
              value: "archived",
              children: <ArchivedProductsTable />,
            },
          ]}
        />
      </PageLayout>

      <NewProductDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
