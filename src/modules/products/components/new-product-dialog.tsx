import { Button } from "@/src/components/button"
import * as Dialog from "@/src/components/dialog"
import type { DialogProps } from "@/src/components/dialog/root"
import { Field } from "@/src/components/field"
import { Input } from "@/src/components/input"
import { toast } from "@/src/components/toast/toast"
import { nameSchema } from "@/src/schemas"
import { getQueryClient } from "@/src/util/get-query-client"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formId = "new-product-form"

const schema = z.object({
  name: nameSchema,
  price: z
    .string({ invalid_type_error: "O preço do produto deve ser um número" })
    .min(0, "O preço do produto deve ser maior que 0"),
})

export function NewProductDialog(
  props: Required<Pick<DialogProps, "onOpenChange" | "open">>
) {
  const query = getQueryClient()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: handleCreateProduct, isPending: isCreatingProduct } = useMutation({
    mutationFn: (data: z.infer<typeof schema>) => {
      return request({
        path: "api/v1/products",
        method: "POST",
        data: {
          name: data.name,
          price: Number(data.price),
        },
      })
    },
    onSuccess: async () => {
      await query.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produto adicionado ao catálogo")
      onOpenChange(false)
    },
    onError: (err) => {
      if (isHTTPError(err)) {
        onOpenChange(false)
        toast.error("Houve um erro ao cadastrar um produto")
        return
      }
    },
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    await handleCreateProduct(data)
  }

  function onOpenChange(open: boolean) {
    form.reset({ name: "", price: "" })
    props.onOpenChange(open)
  }

  return (
    <Dialog.Root open={props.open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header
          hasBorder
          title="Novo produto"
          description="Crie um novo produto para começar a vender"
        />

        <Dialog.Section>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field label="Nome" message={fieldState.error?.message}>
                  <Input
                    size="sm"
                    autoFocus
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Insira o nome do produto"
                  />
                </Field>
              )}
            />

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
                    placeholder="0,00"
                  />
                </Field>
              )}
            />
          </form>
        </Dialog.Section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Close disabled={isCreatingProduct}>Cancelar</Dialog.Close>
        <Button
          type="submit"
          form={formId}
          disabled={isCreatingProduct}
          loading={isCreatingProduct}
        >
          Adicionar produto
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  )
}
