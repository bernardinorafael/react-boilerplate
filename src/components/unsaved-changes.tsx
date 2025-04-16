import { useCallback, useEffect } from "react"

import { toast } from "@/src/components/toast/toast"
import { useBlocker } from "@tanstack/react-router"
import { useFormContext } from "react-hook-form"

/**
 * useBlocker documentation
 * @see https://tanstack.com/router/latest/docs/framework/react/api/router/useBlockerHook
 */

type UnsavedChangesProps = {
  formId: string
  onReset?: () => void
}

export function UnsavedChanges(props: UnsavedChangesProps) {
  return <UnsavedChangesToast {...props} />
}

function UnsavedChangesToast({ formId, onReset }: UnsavedChangesProps) {
  const form = useFormContext()

  const isFormSubmitting = form.formState.isSubmitting
  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0
  const hasFormErrors = Object.keys(form.formState.errors).length > 0

  useBlocker({
    shouldBlockFn: () => {
      if (!isFormDirty) return false
      toast.update(formId, { jiggle: true })
      return true
    },
    disabled: !isFormDirty,
  })

  useEffect(() => {
    if (!isFormSubmitting && !hasFormErrors) return

    if (hasFormErrors) {
      toast.update(formId, {
        jiggle: true,
        intent: "error",
        message: "Verifique os campos destacados e tente novamente",
        confirm: {
          label: "Tentar novamente",
          form: formId,
        },
      })
    }

    toast.update(formId, {
      isLoading: isFormSubmitting,
      disabled: isFormSubmitting,
    })

    return () => {
      toast.update(formId, {
        isLoading: false,
        disabled: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFormErrors, isFormSubmitting])

  const onResetForm = useCallback(
    () => (onReset ? onReset() : form.reset()),
    [form, onReset]
  )

  const showToast = useCallback(() => {
    return toast("Alterações não salvas", {
      id: formId,
      duration: Infinity,
      deny: {
        label: "Descartar",
        onClick: onResetForm,
      },
      confirm: {
        label: "Salvar",
        form: formId,
      },
    })
  }, [formId, onResetForm])

  useEffect(() => {
    if (!isFormDirty) {
      toast.dismiss(formId)
      return
    }

    const isExisting = toast.get(formId)
    if (isExisting) return

    showToast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId, isFormDirty])

  return null
}
