import { useState } from "react"

import { Button } from "@/src/components/button"
import * as Dialog from "@/src/components/dialog"
import { formatBytes, useFileUpload } from "@/src/hooks/use-file-upload"
import { cn } from "@/src/util/cn"
import { truncate } from "@/src/util/strings"
import { FolderUp, PaperclipIcon, UploadIcon } from "lucide-react"

const maxSize = 10 * 1024 * 1024 // 10MB default

export function ImportProductsDialog() {
  const [open, setOpen] = useState(false)

  const [
    { files, isDragging },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      clearFiles,
    },
  ] = useFileUpload({
    maxSize,
    maxFiles: 1,
  })

  const file = files[0]
  const isUploaderDisabled = Boolean(file)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) clearFiles()
        setOpen(open)
      }}
      trigger={
        <Button size="sm" variant="secondary" icon={<FolderUp />}>
          Importar
        </Button>
      }
    >
      <Dialog.Content>
        <Dialog.Header
          hasBorder
          title="Importar produtos"
          description="Importe seus produtos já criados"
        />

        <Dialog.Section>
          <div className="flex flex-col gap-2">
            <div
              role="button"
              onClick={openFileDialog}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-dragging={isDragging || undefined}
              className={cn(
                "flex min-h-32 flex-col data-[dragging=true]:bg-gray-50",
                "items-center justify-center rounded-xl border-2 border-dashed border-border-100",
                "has-[input:focus]:border-ring has-[input:focus]:ring-gray-200",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "p-4 transition-colors has-[input:focus]:ring-[3px]",
                isUploaderDisabled && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                {...getInputProps()}
                className="sr-only"
                aria-label="Importar planilha"
                disabled={isUploaderDisabled}
              />

              <div className="flex flex-col items-center justify-center text-center">
                <div
                  className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <UploadIcon className="size-4 opacity-60" />
                </div>
                <p className="mb-1.5 font-medium">Importar planilha</p>
                <p className="text-sm text-word-secondary">
                  Arraste e solte ou clique para navegar (máx. {formatBytes(maxSize)})
                </p>
                <p className="text-sm text-word-secondary">
                  Apenas arquivos .CSV, .XLSX ou .ods
                </p>
              </div>
            </div>

            {file && (
              <div className="space-y-2">
                <div
                  key={file.id}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl border px-4 py-4"
                  )}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <PaperclipIcon
                      className="mr-1 size-4 shrink-0 opacity-60"
                      aria-hidden="true"
                    />
                    <div className="flex min-w-0 flex-col">
                      <p className="font-medium">{truncate(file.file.name, 30)}</p>
                      <span className="text-sm text-word-secondary">
                        {formatBytes(file.file.size)}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => removeFile(files[0]?.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Section>
      </Dialog.Content>

      <Dialog.Footer>
        <Button variant="link" className="mr-auto">
          Baixar planilha base
        </Button>

        <Dialog.Close>Cancelar</Dialog.Close>
        <Button>Importar produtos</Button>
      </Dialog.Footer>
    </Dialog.Root>
  )
}
