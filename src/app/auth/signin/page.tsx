"use client";

import type React from "react";

import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, LoaderPinwheel, Mailbox } from "lucide-react";
import Link from "next/link";
import { sendResetPassword, signin } from "@/actions/auth-actions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/auth-provider";

export default function LoginForm() {
  const [view, setView] = useState<"login" | "forgotPassword" | "resetSent">("login");
  const [state, action, pending] = useActionState(signin, undefined);
  const [countDown, setCountDown] = useState(0);
  const auth = useAuthStore((r) => r);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
    resetEmail: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    resetEmail: "",
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

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, remember: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (formData.remember) {
      localStorage.setItem("remember", Buffer.from(formData.email).toString("base64"));
    }

    setErrors((e) => ({
      ...e,
      email: emailError,
      password: passwordError,
    }));

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

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resetEmailError = validateEmail(formData.resetEmail);

    setErrors({
      ...errors,
      resetEmail: resetEmailError,
    });

    if (!resetEmailError) {
      startTransition(() => {
        const sendResetPasswordData = new FormData();
        sendResetPasswordData.append("email", formData.resetEmail);
        sendResetPassword(sendResetPasswordData).then(console.log).catch(console.log);
      });
      console.log("Password reset requested for:", formData.resetEmail);
      setView("resetSent");
      handleCountDown();
    }
  };

  const handleCountDown = () => {
    const _countDown = 45;
    setCountDown(_countDown);

    setTimeout(() => {
      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });
  };

  const goToForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setView("forgotPassword");
    if (formData.email) {
      setFormData((prev) => ({ ...prev, resetEmail: prev.email }));
    }
  };

  const goToLogin = () => {
    setView("login");
  };

  useEffect(() => {
    if (state?.status === "success" && state.data) {
      auth.setToken(state.data);
      router.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, router]);

  useEffect(() => {
    const remember = localStorage.getItem("remember");
    if (remember) {
      const email = Buffer.from(remember, "base64").toString("utf-8");
      setFormData((prev) => ({ ...prev, email, remember: true }));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md overflow-hidden gap-0">
        <div className="relative">
          {/* login */}
          <div className={`flex flex-col gap-6 transition-all duration-500 ${view !== "login" ? "translate-x-[-100%] absolute" : "translate-x-0"} w-full`}>
            <CardHeader>
              <CardDescription>
                <Link href="/" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary" />
                  <span className="text-xl font-bold text-slate-900">dietto</span>
                </Link>
              </CardDescription>
            </CardHeader>
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
                  <label className="flex items-center space-x-2" htmlFor="remember">
                    <input type="checkbox" name="remember" className="form-checkbox" checked={formData.remember} onChange={handleRememberChange} />
                    <span className="text-sm text-gray-600">Lembrar</span>
                  </label>
                  <Button variant={"link"} type="button" onClick={goToForgotPassword} className="text-sm text-primary hover:underline cursor-pointer">
                    Esqueceu a senha
                  </Button>
                </div>

                <Button type="submit" className="w-full" disabled={pending}>
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
          </div>

          {/* forgot */}
          <div className={`flex flex-col gap-6 transition-all duration-500 ${view === "forgotPassword" ? "translate-x-0" : "translate-x-[100%] absolute"} w-full`}>
            <CardHeader>
              <div className="flex items-center mb-2">
                <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={goToLogin}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold">Recupere sua senha</CardTitle>
              </div>
              <CardDescription>Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">E-mail</Label>
                  <Input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.resetEmail}
                    onChange={handleChange}
                    className={errors.resetEmail ? "border-red-500" : ""}
                  />
                  {errors.resetEmail && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.resetEmail}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full mt-6">
                  Enviar Link de Recuperação
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-gray-500">
                Lembrou sua senha?{" "}
                <a href="#" onClick={goToLogin} className="text-primary font-medium hover:underline">
                  Voltar ao login
                </a>
              </p>
            </CardFooter>
          </div>

          {/* Reset Email Sent Confirmation */}
          <div className={`flex flex-col gap-6 transition-all duration-500 ${view === "resetSent" ? "translate-x-0" : "translate-x-[100%] absolute"} w-full`}>
            <CardHeader>
              <div className="flex items-center mb-2">
                <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={goToLogin}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold">Verifique seu e-mail</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-4">
                <Mailbox className="h-16 w-16 text-green-500" />
              </div>
              <p className="mb-4">Enviamos um link de redefinição de senha para:</p>
              <p className="font-medium mb-6">{formData.resetEmail}</p>
              <p className="text-sm text-muted-foreground mb-6">Por favor, verifique seu e-mail e clique no link para redefinir sua senha. Se não encontrá-lo, verifique sua pasta de spam.</p>
              <Button
                disabled={countDown > 0}
                variant="outline"
                className="w-full"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, resetEmail: "" }));
                  handleResetSubmit(new Event("submit") as unknown as React.FormEvent);
                }}
              >
                Reenviar E-mail {countDown > 0 && `(${countDown}s)`}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-gray-500">
                Lembrou sua senha?{" "}
                <a href="#" onClick={goToLogin} className="text-primary font-medium hover:underline">
                  Voltar ao login
                </a>
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
