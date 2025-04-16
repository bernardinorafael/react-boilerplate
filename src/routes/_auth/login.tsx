import { useEffect } from "react"

import { Button } from "@/src/components/button"
import { CustomLink } from "@/src/components/custom-link"
import { Field } from "@/src/components/field"
import { Input } from "@/src/components/input"
import { LogoIcon } from "@/src/components/logo-icon"
import { Separator } from "@/src/components/separator"
import { toast } from "@/src/components/toast/toast"
import { Tokens } from "@/src/enums/tokens"
import { useTokens } from "@/src/hooks/use-tokens"
import { emailSchema, passwordSchema } from "@/src/schemas"
import { setCookie } from "@/src/util/cookie"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { TagsEnum } from "@/src/util/http/tags"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

function RouteComponent() {
  const navigate = useNavigate({ from: "/login" })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const res = await request<{
        session_id: string
        access_token: string
        refresh_token: string
      }>({
        path: "api/v1/auth/login",
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        },
      })

      setCookie({ name: Tokens.SessionID, value: res.session_id, days: 1 })
      setCookie({ name: Tokens.AccessToken, value: res.access_token, days: 1 })
      setCookie({ name: Tokens.RefreshToken, value: res.refresh_token, days: 30 })

      await navigate({ to: "/" })
    } catch (err) {
      if (isHTTPError(err)) {
        if (err.tag === TagsEnum.Unauthorized) {
          toast.error("Credenciais inválidas")
          return
        }

        if (err.tag === TagsEnum.DisabledUser) {
          toast.error("Verifique seu e-mail e ative sua conta")
          return
        }

        toast.error("Houve um erro na requisição! Tente novamente mais tarde!")
        return
      }
    }
  }

  const { hasTokens } = useTokens()

  useEffect(() => {
    if (hasTokens) navigate({ to: "/" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-1">
        <LogoIcon />

        <svg
          width="16"
          height="24"
          viewBox="0 0 16 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2L2 30"
            className="stroke-zinc-300"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>

        <span className="mb-px text-2xl font-medium">Entrar</span>
      </div>

      <Separator />

      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field label="E-mail" message={fieldState.error?.message}>
              <Input
                autoFocus
                onChange={field.onChange}
                value={field.value}
                placeholder="seu-email@email.com"
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field label="Senha" message={fieldState.error?.message}>
              <Input
                type="password"
                onChange={field.onChange}
                value={field.value}
                placeholder="Insira sua senha"
              />
            </Field>
          )}
        />

        <Button
          full
          type="submit"
          size="lg"
          variant="primary"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Continuar
        </Button>
      </form>

      <CustomLink to="/register" size="base">
        Clique para criar uma conta
      </CustomLink>
    </div>
  )
}
export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
})
