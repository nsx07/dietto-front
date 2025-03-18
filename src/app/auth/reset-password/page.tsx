"use client";

import { CardFooter } from "@/components/ui/card";
import type React from "react";
import { startTransition, Suspense, useActionState, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, LoaderPinwheel } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { resetPassword } from "@/actions/auth-actions";

// Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function Any() {
  return (
    <Suspense fallback={<LoaderPinwheel className="h-8 w-8 animate-spin" />}>
      <PasswordResetForm />
    </Suspense>
  );
}

function PasswordResetForm() {
  const [state, action, pending] = useActionState(resetPassword, undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || undefined;
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordRequirements = [
    { regex: /.{8,}/, message: "Pelo menos 8 caracteres" },
    { regex: /[a-z]/, message: "Pelo menos 1 letra minúscula" },
    { regex: /[A-Z]/, message: "Pelo menos 1 letra maiúscula" },
    { regex: /[0-9]/, message: "Pelo menos 1 número" },
    { regex: /[^A-Za-z0-9]/, message: "Pelo menos 1 caractere especial" },
  ];

  const validatePassword = (password: string) => {
    if (!password) {
      return "Senha é obrigatória";
    }

    const failedRequirements = passwordRequirements.filter((requirement) => !requirement.regex.test(password));

    if (failedRequirements.length > 0) {
      return "A senha não atende aos requisitos";
    }

    return "";
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      return "Por favor, confirme sua senha";
    }

    if (confirmPassword !== formData.password) {
      return "As senhas não coincidem";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // If no errors, proceed with form submission
    if (!passwordError && !confirmPasswordError) {
      try {
        startTransition(() => {
          const fform = new FormData();
          fform.append("token", token?.toString() || "");
          fform.append("password", formData.password);
          fform.append("newPassword", formData.confirmPassword);
          action(fform);
        });
      } catch (error) {
        console.error("Error resetting password:", error);
        // Handle error - you could set a general form error state here
      }
    }
  };

  if (state?.status === "success") {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Senha Redefinida com Sucesso</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <p className="mb-6">Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.</p>
            <Link className={buttonVariants({ className: "w-full" })} href="/auth/signin">
              Ir para Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Redefinir Sua Senha</CardTitle>
          <CardDescription>Crie uma nova senha para sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Crie uma nova senha"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}

              <div className="mt-2 space-y-2">
                <p className="text-sm font-medium">Requisitos da senha:</p>
                <ul className="space-y-1">
                  {passwordRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-center text-sm">
                      {requirement.regex.test(formData.password) ? <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> : <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />}
                      {requirement.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {state?.message && state.status == "error" && (
              <Alert className={"bg-red-50 text-red-700"}>
                <AlertTitle>{"Erro!"}</AlertTitle>
                <AlertDescription className={"text-red-900"}>{state.message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full mt-6" disabled={pending}>
              {pending ? "Redefinindo Senha..." : "Redefinir Senha"} {pending && <LoaderPinwheel className="h-4 w-4 ml-2 animate-spin" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-gray-500">
            Lembrou sua senha?{" "}
            <Link href="/auth/signin" className="text-primary font-medium hover:underline">
              Voltar para login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
