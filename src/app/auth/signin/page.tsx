"use client";

import type React from "react";

import { startTransition, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { signin } from "@/actions/auth-actions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  const [state, action, pending] = useActionState(signin, undefined);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email é obrigatório";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Informe um email válido";
    }

    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Senha é obrigatória";
    }

    if (password.length < 8) {
      return "Senha deve ter pelo menos 8 caracteres";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      const { email, password } = formData;
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      startTransition(() => {
        action(form);
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Entre na sua conta</CardTitle>
          <CardDescription>Digite seu e-mail e senha para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                disabled={pending}
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                disabled={pending}
                id="password"
                name="password"
                type="password"
                placeholder="Informe sua senha"
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm text-gray-600">Lembrar</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Esqueceu a senha
              </Link>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={pending}>
              Logar {pending && <LoaderPinwheel className="h-4 w-4 ml-2 animate-spin" />}
            </Button>

            {state?.message && (
              <Alert className={state.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}>
                <AlertTitle>{state.status == "success" ? "Sucesso!" : "Erro!"}</AlertTitle>
                <AlertDescription className={state.status === "success" ? "text-green-900" : "text-red-900"}>{state.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-gray-500">
            Não tem conta?{" "}
            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
