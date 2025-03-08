import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }).trim(),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }).trim(),
  password: z
    .string()
    .min(8, { message: "Deve ter pelo menos 8 caracteres." })
    .regex(/[a-z]/, { message: "Deve conter pelo menos uma letra minúscula." })
    .regex(/[A-Z]/, { message: "Deve conter pelo menos uma letra maiúscula." })
    .regex(/[0-9]/, { message: "Deve conter pelo menos um número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Deve conter pelo menos um caractere especial.",
    })
    .trim(),
});

export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      status?: "success" | "error";
    }
  | undefined;

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }).trim(),
  password: z.string().min(8, { message: "Deve ter pelo menos 8 caracteres." }).trim(),
});

export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      status?: "success" | "error";
      data?: string;
    }
  | undefined;
