"use client";

import type React from "react";

import { startTransition, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { signup } from "@/actions/auth-actions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const passwordRequirements = [
    { regex: /.{8,}/, message: "Pelo menos 8 caracteres" },
    { regex: /[a-z]/, message: "Pelo menos 1 letra minúscula" },
    { regex: /[A-Z]/, message: "Pelo menos 1 letra maiúscula" },
    { regex: /[0-9]/, message: "Pelo menos 1 númeri" },
    { regex: /[^A-Za-z0-9]/, message: "Pelo menos 1 caracter especial" },
  ];

  const validatePassword = (password: string) => {
    if (!password) {
      return "Senha é obrigatória";
    }

    const failedRequirements = passwordRequirements.filter((requirement) => !requirement.regex.test(password));

    if (failedRequirements.length > 0) {
      return "Senha não atende aos requisitos";
    }

    return "";
  };

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

  const validateName = (name: string) => {
    if (!name) {
      return "Nome é obrigatório";
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

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    if (!nameError && !emailError && !passwordError) {
      const fData = new FormData();
      fData.append("name", formData.name);
      fData.append("email", formData.email);
      fData.append("password", formData.password);

      startTransition(() => {
        action(fData);
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="text-xl font-bold text-slate-900">dietto</span>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Criar uma conta</CardTitle>
          <CardDescription>Digite suas informações para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input disabled={pending} id="name" name="name" placeholder="Digite seu nome" value={formData.name} onChange={handleChange} className={errors.name ? "border-red-500" : ""} />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={pending}
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                disabled={pending}
                id="password"
                name="password"
                type="password"
                placeholder="Crie uma senha"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

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

            <Button type="submit" className="w-full mt-6" disabled={pending}>
              Cadastrar {pending && <LoaderPinwheel className="h-4 w-4 ml-2 animate-spin" />}
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
            Já possui uma conta?{" "}
            <Link href="/auth/signin" className="text-primary font-medium">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
