"use server";

import { AuthService } from "@/services/auth-service";
import { cookies } from "next/headers";
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

  const response: {
    message: string;
    status: "success" | "error";
    data?: string;
  } = await AuthService.login({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })
    .then(async (response) => {
      if (!response.success) {
        return {
          message: response.message,
          status: "error" as const,
        };
      }

      return {
        message: "Bem-vindo! 🎉",
        status: "success" as const,
        data: response.data.token,
      };
    })
    .catch((e) => ({
      message: "Erro ao fazer login. Tente novamente mais tarde." + e,
      status: "error",
    }));

  if (response.status === "success") {
    (await cookies()).set("session", response.data!, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
    });
  }

  return {
    message: response.message,
    status: response.status,
  };
}

export async function signout() {
  (await cookies()).set("session", "", {
    expires: new Date(Date.now() - 1000),
  });
}
