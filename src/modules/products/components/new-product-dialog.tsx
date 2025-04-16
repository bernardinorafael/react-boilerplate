import { Button } from "@/src/components/button"
import * as Dialog from "@/src/components/dialog"
import type { DialogProps } from "@/src/components/dialog/root"
import { Field } from "@/src/components/field"
import { Input } from "@/src/components/input"
import { nameSchema } from "@/src/schemas"
import { getQueryClient } from "@/src/util/get-query-client"
import { request } from "@/src/util/http/request"
import { zodResolver } from "@hookform/resolvers/zod"
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

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      await request({
        path: "api/v1/products",
        method: "POST",
        data: {
          name: data.name,
          price: Number(data.price),
        },
      })

      await query.invalidateQueries({ queryKey: ["products"] })
      onOpenChange(false)
    } catch (error) {
      console.error(error)
    }
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
        <Dialog.Close disabled={form.formState.isSubmitting}>Cancelar</Dialog.Close>
        <Button
          type="submit"
          form={formId}
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Adicionar produto
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  )
}
