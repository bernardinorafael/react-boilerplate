import { z } from "zod"

export const emailSchema = z
  .string({ required_error: "E-mail é um campo obrigatório" })
  .email("Insira um endereço de e-mail válido")
  .trim()

export const passwordSchema = z
  .string({ required_error: "A senha é um campo obrigatório" })
  .min(6, "A senha deve ter pelo menos 6 caracteres")
  .max(35, "A senha não pode exceder 35 caracteres")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/\d/, "A senha deve conter pelo menos um número")
  .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial")
  .trim()

export const nameSchema = z
  .string({ required_error: "Nome é um campo obrigatório" })
  .min(3, "Nome deve ter pelo menos 3 caracteres")
  .max(255, "Nome não pode exceder 255 caracteres")
  .trim()

export const surnameSchema = z
  .string({ required_error: "Sobrenome é um campo obrigatório" })
  .min(3, "Sobrenome deve ter pelo menos 3 caracteres")
  .max(255, "Sobrenome não pode exceder 255 caracteres")
  .trim()

export const usernameSchema = z
  .string({ required_error: "Username é um campo obrigatório" })
  .min(3, "Username deve ter pelo menos 3 caracteres")
  .max(18, "Username não pode exceder 18 caracteres")
  .regex(
    /^[a-zA-Z0-9_.]*$/,
    "Username pode conter apenas letras, números, sublinhados e pontos"
  )
  .trim()
