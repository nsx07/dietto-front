"use server";

import { decrypt, encrypt } from "@/lib/session";
import { AuthService } from "@/services/auth-service";
import { SignUpFormState, SignupFormSchema, SignInFormState, SigninFormSchema } from "@/types/auth-actions";
import { cookies } from "next/headers";

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
        data: encrypt(response.data.token),
      };
    })
    .catch((e) => ({
      message: "Erro ao fazer login. Tente novamente mais tarde." + e,
      status: "error",
    }));

  if (response.status === "success") {
    const payload = decrypt(response.data!);
    (await cookies()).set("session", response.data!, {
      expires: new Date(payload?.exp ?? Date.now() + 1000 * 60 * 60 * 3),
    });
  }

  return response;
}

export async function signout() {
  (await cookies()).delete("session");
}
