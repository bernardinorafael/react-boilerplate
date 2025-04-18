import { Button } from "@/src/components/button"
import { CheckboxWithLabel } from "@/src/components/checkbox-with-label"
import * as Dialog from "@/src/components/dialog"
import { RadioGroup } from "@/src/components/radio-group"
import { Separator } from "@/src/components/separator"
import { formatDate } from "@/src/util/date"
import { startOfMonth, subDays, subWeeks } from "date-fns"
import { FolderOutput } from "lucide-react"

export function ExportProductsDialog() {
  const now = new Date()
  const formattedDate = (date: Date) => formatDate(date, "PP")

  return (
    <Dialog.Root
      trigger={
        <Button size="sm" variant="secondary" icon={<FolderOutput />}>
          Exportar
        </Button>
      }
    >
      <Dialog.Content>
        <Dialog.Header
          hasBorder
          title="Relatório de produtos"
          description="Exporte seus produtos já criados"
        />

        <Dialog.Section>
          <h2 className="text-sm font-medium text-word-secondary">Período</h2>

          <section className="grid grid-cols-2 gap-8">
            <div>
              <RadioGroup
                layout="compact"
                defaultValue="today"
                items={[
                  {
                    label: "Hoje",
                    value: "today",
                  },
                  {
                    label: "Mês atual",
                    value: "current-month",
                  },
                  {
                    label: "Últimas 4 semanas",
                    value: "four-weeks",
                  },
                  {
                    label: "Último mês",
                    value: "last-month",
                  },
                  {
                    label: "Todos",
                    value: "all",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-[theme(spacing.3)] text-word-secondary">
              <p>{formattedDate(now)}</p>
              <p>
                {formattedDate(startOfMonth(now))} - {formattedDate(now)}
              </p>
              <p>
                {formattedDate(subDays(now, 7))} - {formattedDate(now)}
              </p>
              <p>
                {formattedDate(subWeeks(now, 4))} - {formattedDate(now)}
              </p>
              <div role="presentation" />
            </div>
          </section>
        </Dialog.Section>

        <Separator />

        <Dialog.Section>
          <h2 className="text-sm font-medium text-word-secondary">Colunas</h2>

          <section className="grid grid-cols-3 gap-2">
            <CheckboxWithLabel defaultChecked id="id">
              ID
            </CheckboxWithLabel>
            <CheckboxWithLabel defaultChecked id="name">
              Nome
            </CheckboxWithLabel>
            <CheckboxWithLabel defaultChecked id="price">
              Preço
            </CheckboxWithLabel>
            <CheckboxWithLabel defaultChecked id="created">
              Criado
            </CheckboxWithLabel>
            <CheckboxWithLabel defaultChecked id="updated">
              Atualizado
            </CheckboxWithLabel>
            <CheckboxWithLabel defaultChecked id="archived">
              Arquivado
            </CheckboxWithLabel>
          </section>
        </Dialog.Section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Close>Cancelar</Dialog.Close>
        <Button>Gerar relatório</Button>
      </Dialog.Footer>
    </Dialog.Root>
  )
}
