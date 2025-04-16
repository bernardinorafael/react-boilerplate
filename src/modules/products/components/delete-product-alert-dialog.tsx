import * as AlertDialog from "@/src/components/alert-dialog"
import type { AlertDialogRootProps } from "@/src/components/alert-dialog/root"
import { toast } from "@/src/components/toast/toast"
import type { Product } from "@/src/types/product"
import { getQueryClient } from "@/src/util/get-query-client"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { truncate } from "@/src/util/strings"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function DeleteProductAlertDialog(
  props: Required<Pick<AlertDialogRootProps, "open" | "onOpenChange">> & {
    product: Product
  }
) {
  const navigate = useNavigate({ from: "/products/$productId" })
  const query = getQueryClient()

  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } = useMutation({
    mutationFn: async () => {
      return request({
        method: "DELETE",
        path: `api/v1/products/${props.product.id}`,
      })
    },
    onSuccess: async () => {
      await query.invalidateQueries({ queryKey: ["products"] })
      await navigate({ to: "/products" })
    },
    onError: (err) => {
      if (isHTTPError(err)) {
        toast.error("Houve um erro ao deletar o produto")
        return
      }
    },
  })

  return (
    <AlertDialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialog.Content>
        <AlertDialog.Body>
          <AlertDialog.Header>
            <AlertDialog.Title>Confirmar exclusão do produto</AlertDialog.Title>
            <AlertDialog.Description>
              Você deseja excluir permanentemente o produto:
              <p className="font-medium text-word-primary">
                {truncate(props.product.name, 35)}?
              </p>
            </AlertDialog.Description>
          </AlertDialog.Header>

          <AlertDialog.Notice intent="danger">
            Esta ação é irreversível e removerá permanentemente todos os dados associados
            a este item
          </AlertDialog.Notice>
        </AlertDialog.Body>

        <AlertDialog.Footer>
          <AlertDialog.Cancel disabled={isDeletingProduct}>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={() => deleteProduct()}
            loading={isDeletingProduct}
            disabled={isDeletingProduct}
          >
            Excluir produto
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
