"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function PlansTab() {
  const [selectedPlan, setSelectedPlan] = useState("pro")

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={selectedPlan === "basic" ? "border-2 border-emerald-500" : ""}>
          <CardHeader>
            <CardTitle>Básico</CardTitle>
            <CardDescription>Para nutricionistas iniciantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold">R$ 49,90</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <Separator />
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Até 50 pacientes</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Planos alimentares básicos</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Suporte por email</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlan === "basic" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPlan("basic")}
            >
              {selectedPlan === "basic" ? "Plano Atual" : "Selecionar Plano"}
            </Button>
          </CardFooter>
        </Card>

        <Card className={selectedPlan === "pro" ? "border-2 border-emerald-500" : ""}>
          <CardHeader>
            <CardTitle>Profissional</CardTitle>
            <CardDescription>Para clínicas em crescimento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold">R$ 99,90</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <Separator />
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Até 200 pacientes</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Planos alimentares ilimitados</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Agendamento online</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlan === "pro" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPlan("pro")}
            >
              {selectedPlan === "pro" ? "Plano Atual" : "Selecionar Plano"}
            </Button>
          </CardFooter>
        </Card>

        <Card className={selectedPlan === "enterprise" ? "border-2 border-emerald-500" : ""}>
          <CardHeader>
            <CardTitle>Empresarial</CardTitle>
            <CardDescription>Para grandes clínicas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold">R$ 199,90</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <Separator />
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Pacientes ilimitados</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Recursos avançados de análise</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Múltiplos profissionais</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Suporte 24/7</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>API personalizada</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlan === "enterprise" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPlan("enterprise")}
            >
              {selectedPlan === "enterprise" ? "Plano Atual" : "Selecionar Plano"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {selectedPlan !== "pro" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <AlertCircle className="h-12 w-12 text-amber-500" />
              <div>
                <h3 className="text-lg font-semibold">Confirmar alteração de plano</h3>
                <p className="text-sm text-muted-foreground">
                  Você está prestes a mudar do plano Profissional para o plano{" "}
                  {selectedPlan === "basic" ? "Básico" : "Empresarial"}.
                  {selectedPlan === "basic" ? " Isso pode limitar alguns recursos que você utiliza atualmente." : ""}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setSelectedPlan("pro")}>
                  Cancelar
                </Button>
                <Button>Confirmar Alteração</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

