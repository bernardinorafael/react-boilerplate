import { useState } from "react"

import { Badge } from "@/src/components/badge"
import { Chip } from "@/src/components/chip"
import { CopyTrigger } from "@/src/components/copy-trigger"
import * as DataTable from "@/src/components/data-table"
import { EmptyState } from "@/src/components/empty-state"
import { Input } from "@/src/components/input"
import { TableWithFilter } from "@/src/components/layout/table-with-filter"
import { TableSkeletonWrapper } from "@/src/components/table-skeleton-wrapper"
import { useQuerySearch } from "@/src/hooks/use-query-search"
import { ExportProductsDialog } from "@/src/modules/products/components/export-products-dialog"
import { ImportProductsDialog } from "@/src/modules/products/components/import-products-dialog"
import type { PaginatedPayload } from "@/src/types/pagination"
import type { Product } from "@/src/types/product"
import { formatDate } from "@/src/util/date"
import { request } from "@/src/util/http/request"
import { truncate } from "@/src/util/strings"
import { Squircle } from "@squircle-js/react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Package, PackageSearch, SearchSlash } from "lucide-react"
import { useDebounce } from "react-use"
import { currency } from "remask"

const tableHeaders = [
  { label: "Nome", key: "name", width: "40%" },
  { label: "ID", key: "id", width: "20%" },
  { label: "Preço", key: "price", width: "20%" },
  { label: "Criado em", key: "created", width: "20%" },
]

export function ArchivedProductsTable() {
  const [term, setTerm] = useState("")
  const [{ limit, page, searchTerm }, setSearch] = useQuerySearch({
    defaultLimit: 25,
    defaultPage: 1,
  })

  useDebounce(
    () => {
      setSearch({ searchTerm: term })
    },
    300,
    [term]
  )

  const { data: response, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["archived-products", limit, page, searchTerm],
    queryFn: () => {
      const params = new URLSearchParams()
      let url = "/api/v1/products/archived"

      if (searchTerm) params.set("term", searchTerm)
      if (limit) params.set("limit", String(limit))
      if (page) params.set("page", String(page))

      url += `?${params}`

      return request<PaginatedPayload<Product>>({
        path: url,
      })
    },
  })

  const isProductsEmpty = !response?.data.length

  return (
    <TableWithFilter
      search={
        <Input
          size="sm"
          type="search"
          value={term}
          placeholder="Pesquisar produto"
          onChange={(e) => setTerm(e.target.value)}
        />
      }
      action={
        <div className="inline-flex items-center gap-2">
          <ImportProductsDialog />
          <ExportProductsDialog />
        </div>
      }
    >
      {isLoadingProducts ? (
        <ProductSkeleton />
      ) : (
        <DataTable.Root
          count={response?.meta.total_items ?? 0}
          limit={response?.meta.items_per_page ?? 0}
          page={response?.meta.current_page ?? 0}
          hasNextPage={response?.meta.has_next_page ?? false}
          hasPreviousPage={response?.meta.has_previous_page ?? false}
          onLimitChange={() => {}}
          onPageChange={(page) => setSearch({ page })}
        >
          <DataTable.Head>
            <DataTable.Row>
              {tableHeaders.map((item) => (
                <DataTable.Header key={item.key} width={item.width}>
                  {item.label}
                </DataTable.Header>
              ))}
            </DataTable.Row>
          </DataTable.Head>

          <DataTable.Body>
            {isProductsEmpty ? (
              <DataTable.Cell colSpan={4}>
                {searchTerm ? (
                  <EmptyState
                    title={`Nenhum produto encontrado para "${truncate(searchTerm, 15)}"`}
                    description="Tente alterar seu termo de busca"
                    icon={SearchSlash}
                  />
                ) : (
                  <EmptyState
                    title="Parece que não há produtos arquivados"
                    description="Navegue até todos os produtos para arquivar um produto"
                    icon={PackageSearch}
                  />
                )}
              </DataTable.Cell>
            ) : (
              response?.data.map((product) => (
                <DataTable.Row key={product.id}>
                  <DataTable.Cell className="font-medium">
                    <div className="flex items-center gap-4">
                      <Package className="size-5 stroke-[1.5px] text-gray-500" />
                      <DataTable.RowLink asChild>
                        <Link
                          to="/products/$productId"
                          params={{ productId: product.id }}
                        >
                          {truncate(product.name, 50)}
                        </Link>
                      </DataTable.RowLink>

                      {!product.enabled && (
                        <Badge intent="slate" className="-ml-2">
                          Arquivado
                        </Badge>
                      )}
                    </div>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <CopyTrigger text={product.id}>
                      <Chip font="mono">{truncate(product.id, 20)}</Chip>
                    </CopyTrigger>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {currency.mask({
                      locale: "pt-BR",
                      currency: "BRL",
                      value: product.price / 100,
                    })}
                  </DataTable.Cell>
                  <DataTable.Cell>{formatDate(product.created)}</DataTable.Cell>
                </DataTable.Row>
              ))
            )}
          </DataTable.Body>
        </DataTable.Root>
      )}
    </TableWithFilter>
  )
}

const ProductSkeleton = () => (
  <TableSkeletonWrapper
    head={tableHeaders.map((item) => ({
      label: item.label,
      width: item.width,
    }))}
  >
    {[...Array(5)].map((_, index) => (
      <DataTable.Row key={index}>
        <DataTable.Cell>
          <div className="flex items-center gap-4">
            <Squircle
              cornerSmoothing={1}
              cornerRadius={10}
              className="bg-gray-100 p-2 shadow-xs"
            >
              <Package className="size-5 text-gray-700" />
            </Squircle>
            consequat aliqua officia ipsum
          </div>
        </DataTable.Cell>
        <DataTable.Cell>1990</DataTable.Cell>
        <DataTable.Cell>{formatDate(new Date())}</DataTable.Cell>
      </DataTable.Row>
    ))}
  </TableSkeletonWrapper>
)
