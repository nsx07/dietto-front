"use server";

import { AuthService } from "@/services/auth-service";
import { z } from "zod";

const SignupFormSchema = z.object({
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

type SignUpFormState =
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

export async function signup(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return AuthService.signUp({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }).then((response) => {
    if (!response.success) {
      return {
        message: response.message,
        status: "error",
      };
    }

    return {
      message: "Conta criada com sucesso! 💥",
      status: "success",
    };
  });
}

const SigninFormSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }).trim(),
  password: z.string().min(8, { message: "Deve ter pelo menos 8 caracteres." }).trim(),
});

type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      status?: "success" | "error";
    }
  | undefined;

export async function signin(state: SignInFormState, formData: FormData): Promise<SignInFormState> {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return AuthService.login({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })
    .then((response) => {
      if (!response.success) {
        return {
          message: response.message,
          status: "error",
        };
      }

      return {
        message: "Bem-vindo! 🎉",
        status: "success",
      };
    })
    .catch((e) => ({
      message: "Erro ao fazer login. Tente novamente mais tarde." + e,
      status: "error",
    })) as any;
}
