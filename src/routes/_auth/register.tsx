import { useEffect } from "react"

import { Button } from "@/src/components/button"
import { CustomLink } from "@/src/components/custom-link"
import { Field } from "@/src/components/field"
import { Input } from "@/src/components/input"
import { LogoIcon } from "@/src/components/logo-icon"
import { Separator } from "@/src/components/separator"
import { toast } from "@/src/components/toast/toast"
import { useTokens } from "@/src/hooks/use-tokens"
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  surnameSchema,
  usernameSchema,
} from "@/src/schemas"
import { isHTTPError } from "@/src/util/http/error"
import { request } from "@/src/util/http/request"
import { TagsEnum } from "@/src/util/http/tags"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: nameSchema,
  surname: surnameSchema,
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
})

function RouteComponent() {
  const navigate = useNavigate({ from: "/register" })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      await request({
        path: "api/v1/auth/register",
        method: "POST",
        data: {
          name: `${data.name} ${data.surname}`,
          password: data.password,
          username: data.username,
          email: data.email,
        },
      })

      await navigate({ to: "/login" })
      toast.success("Enviamos um link de ativação para seu e-mail")
    } catch (err) {
      if (isHTTPError(err)) {
        if (err.tag === TagsEnum.Conflict) {
          if (err.message.includes("username")) {
            form.setError("username", {
              message: "Este username já está indisponível",
              type: "manual",
            })
            return
          }
          if (err.message.includes("e-mail")) {
            form.setError("email", {
              message: "Este e-mail está indisponível",
              type: "manual",
            })
            return
          }
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

        <span className="mb-px text-2xl font-medium">Criar conta</span>
      </div>

      <Separator />

      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field label="Nome" message={fieldState.error?.message}>
                <Input
                  autoFocus
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Insira seu nome"
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="surname"
            render={({ field, fieldState }) => (
              <Field label="Sobrenome" message={fieldState.error?.message}>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Insira seu sobrenome"
                />
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field label="E-mail" message={fieldState.error?.message}>
              <Input
                onChange={field.onChange}
                value={field.value}
                placeholder="seu-email@email.com"
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field
              label="Username"
              message={fieldState.error?.message}
              description="Pode conter apenas letras, números, sublinhados e pontos"
            >
              <Input
                onChange={field.onChange}
                value={field.value}
                placeholder="Insira seu username"
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field
              label="Senha"
              description="A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial"
              message={fieldState.error?.message}
            >
              <Input
                type="password"
                value={field.value}
                onChange={field.onChange}
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
          Criar conta
        </Button>
      </form>

      <CustomLink to="/login" size="base">
        Clique para entrar
      </CustomLink>
    </div>
  )
}

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
})
