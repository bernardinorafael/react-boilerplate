import { useEffect, useState } from "react"

import { ActionDropdown } from "@/src/components/action-dropdown"
import { Badge } from "@/src/components/badge"
import { Button } from "@/src/components/button"
import { Card } from "@/src/components/card"
import { Chip } from "@/src/components/chip"
import { CopyTrigger } from "@/src/components/copy-trigger"
import { Field } from "@/src/components/field"
import { Fieldset } from "@/src/components/fieldset"
import { Input } from "@/src/components/input"
import { PageLayout } from "@/src/components/layout/page-layout"
import { PageLoader } from "@/src/components/page-loader"
import { toast } from "@/src/components/toast/toast"
import { UnsavedChanges } from "@/src/components/unsaved-changes"
import { DeleteProductAlertDialog } from "@/src/modules/products/components/delete-product-alert-dialog"
import { nameSchema } from "@/src/schemas"
import type { Product } from "@/src/types/product"
import { formatDate } from "@/src/util/date"
import { getQueryClient } from "@/src/util/get-query-client"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { truncate } from "@/src/util/strings"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Calendar1, CalendarSync, Ellipsis } from "lucide-react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

export const Route = createFileRoute("/_dashboard/products/$productId")({
  component: RouteComponent,
})

const formId = "update-product-form"

const schema = z.object({
  name: nameSchema,
  price: z
    .string({ invalid_type_error: "O preço do produto deve ser um número" })
    .min(0, "O preço do produto deve ser maior que 0"),
})

function RouteComponent() {
  const { productId } = Route.useParams()

  const [open, setOpen] = useState(false)
  const query = getQueryClient()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      return request<Product>({
        path: `api/v1/products/${productId}`,
        method: "GET",
      })
    },
  })

  function onResetForm() {
    form.reset({
      name: product?.name,
      price: String(product?.price),
    })
  }

  useEffect(() => {
    if (product && !isLoadingProduct) onResetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingProduct])

  const { mutateAsync: handleUpdateProduct } = useMutation({
    mutationFn: (data: z.infer<typeof schema>) => {
      return request({
        method: "PATCH",
        path: `api/v1/products/${product?.id}`,
        data: {
          name: data.name,
          price: Number(data.price),
        },
      })
    },
    onSuccess: async (_, prod) => {
      await Promise.all([
        query.invalidateQueries({ queryKey: ["product", product?.id] }),
        query.invalidateQueries({ queryKey: ["products"] }),
      ])
      form.reset({
        name: prod.name,
        price: prod.price,
      })
    },
    onError: (err) => {
      if (isHTTPError(err)) {
        toast.error("Houve um erro ao atualizar o produto")
        onResetForm()
        return
      }
    },
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    await handleUpdateProduct(data)
  }

  if (isLoadingProduct) return <PageLoader />

  return (
    <>
      <PageLayout
        title={truncate(product?.name as string, 70)}
        description="Visualize e edite as informações do produto"
        titleBadge={<Badge intent="success">Ativo</Badge>}
        actions={
          <ActionDropdown
            className="w-[200px]"
            align="end"
            items={[
              {
                label: "Excluir produto",
                intent: "danger",
                onAction: () => setOpen(true),
              },
              {
                label: "Arquivar produto",
                tooltipLabel: "Não implementado",
                disabled: true,
                intent: "danger",
              },
            ]}
          >
            <Button shape="icon" size="sm" icon={<Ellipsis />} variant="secondary">
              Ver mais
            </Button>
          </ActionDropdown>
        }
      >
        <div className="grid grid-cols-[auto_250px] gap-8">
          <div className="space-y-8">
            <Card.Root spacing="compact">
              <Card.Header>
                <Card.Title>Editar produto</Card.Title>
                <Card.Description>Altere as informações do produto</Card.Description>
              </Card.Header>

              <FormProvider {...form}>
                <UnsavedChanges formId={formId} onReset={onResetForm} />

                <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                  <Card.Body>
                    <Card.Row>
                      <Fieldset
                        legend="Nome do produto"
                        description={[
                          "consectetur incididunt reprehenderit",
                          "aliqua reprehenderit adipisicing qui sit magna in excepteur",
                        ]}
                      >
                        <Controller
                          control={form.control}
                          name="name"
                          render={({ field, fieldState }) => (
                            <Field label="Nome" message={fieldState.error?.message}>
                              <Input
                                size="sm"
                                value={field.value}
                                onChange={field.onChange}
                                className="max-w-[70%]"
                                placeholder="Insira o nome do produto"
                              />
                            </Field>
                          )}
                        />
                      </Fieldset>
                    </Card.Row>

                    <Card.Row>
                      <Fieldset
                        legend="Preço do produto"
                        description={["consectetur incididunt reprehenderit"]}
                      >
                        <Controller
                          control={form.control}
                          name="price"
                          render={({ field, fieldState }) => (
                            <Field label="Preço" message={fieldState.error?.message}>
                              <Input
                                size="sm"
                                prefix="R$"
                                value={field.value}
                                onChange={field.onChange}
                                className="max-w-[70%]"
                                placeholder="0,00"
                                defaultValue={product?.price}
                              />
                            </Field>
                          )}
                        />
                      </Fieldset>
                    </Card.Row>
                  </Card.Body>
                </form>
              </FormProvider>
            </Card.Root>
          </div>

          <aside className="space-y-6">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Detalhes</h3>

              <div className="space-y-2">
                <p className="text-base font-medium">ID do produto</p>
                <CopyTrigger text={product?.id as string}>
                  <Chip font="mono">{truncate(product?.id as string, 25)}</Chip>
                </CopyTrigger>
              </div>
            </section>

            <section className="space-y-2">
              <p className="text-base font-medium">Descrição</p>
              <p>-</p>
            </section>

            <section className="space-y-2">
              <p className="text-base font-medium">Criado em</p>
              <div className="flex items-center gap-1.5 text-base">
                <Calendar1 size={16} className="text-app-gray-700" />
                <span>{formatDate(product?.created as string)}</span>
              </div>
            </section>

            <section className="space-y-2">
              <p className="text-base font-medium">Atualizado em</p>
              <div className="flex items-center gap-1.5 text-base">
                <CalendarSync size={16} className="text-app-gray-700" />
                <span>{formatDate(product?.updated as string)}</span>
              </div>
            </section>
          </aside>
        </div>
      </PageLayout>

      <DeleteProductAlertDialog
        open={open}
        onOpenChange={setOpen}
        product={product as Product}
      />
    </>
  )
}
