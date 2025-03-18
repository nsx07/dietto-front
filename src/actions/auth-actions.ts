"use server";

import { decrypt, encrypt } from "@/lib/session";
import { AuthService } from "@/services/auth-service";
import { SignUpFormState, SignupFormSchema, SignInFormState, SigninFormSchema, SendResetPasswordSchema, ResetPasswordSchema, SendResetPasswordState, ResetPasswordState } from "@/types/auth-actions";
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
  })
    .then((response) => {
      if (!response.success) {
        return {
          message: response.message,
          status: "error" as const,
        };
      }

      return {
        message: "Conta criada com sucesso! 💥",
        status: "success" as const,
      };
    })
    .catch((e) => ({
      message: "Erro ao criar conta." + e ? ` ${e}` : "",
      status: "error",
    }));
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
      message: "Erro ao fazer login." + e ? ` ${e}` : "",
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

export async function sendResetPassword(formData: FormData): Promise<SendResetPasswordState> {
  const validatedFields = SendResetPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return AuthService.sendResetPassword(formData.get("email") as string)
    .then((response) => {
      if (!response.success) {
        return {
          message: response.message,
          status: "error" as const,
        };
      }

      return {
        message: "Email enviado com sucesso! 🚀",
        success: "success" as const,
      };
    })
    .catch((e) => ({
      message: "Erro ao enviar email." + e ? ` ${e}` : "",
      status: "error",
    }));
}

export async function resetPassword(state: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
  const validatedFields = ResetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return AuthService.resetPassword(validatedFields.data.token, validatedFields.data.password, validatedFields.data.newPassword)
    .then((response) => {
      if (!response.success) {
        return {
          message: response.message,
          status: "error" as const,
        };
      }

      return {
        message: "Senha alterada com sucesso! 🎉",
        status: "success" as const,
      };
    })
    .catch((e) => ({
      message: "Erro ao alterar senha." + e ? ` ${e}` : "",
      status: "error",
    }));
}
