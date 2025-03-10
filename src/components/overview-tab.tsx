"use client"

import { useState } from "react"
import { CheckCircle2, CreditCard, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function OverviewTab() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

  return (
    <>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Informação</AlertTitle>
        <AlertDescription>Sua próxima cobrança será em 15/10/2025.</AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Assinatura Atual</span>
            <Badge className="bg-emerald-500">Ativo</Badge>
          </CardTitle>
          <CardDescription>Detalhes do seu plano atual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Plano Profissional</h3>
                <p className="text-sm text-muted-foreground">Faturamento mensal</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  R$ 99,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-500" />
                <span>Até 200 pacientes</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-500" />
                <span>Planos alimentares ilimitados</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-500" />
                <span>Agendamento online</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-500" />
                <span>Suporte prioritário</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button variant="outline" className="flex-1">
              Alterar Plano
            </Button>
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 text-destructive">
                  Cancelar Assinatura
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancelar assinatura</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja cancelar sua assinatura? Você perderá acesso a todos os recursos premium.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Motivo do cancelamento</Label>
                    <RadioGroup defaultValue="expensive">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expensive" id="expensive" />
                        <Label htmlFor="expensive">Muito caro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="features" id="features" />
                        <Label htmlFor="features">Faltam recursos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="competitor" id="competitor" />
                        <Label htmlFor="competitor">Mudando para concorrente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Outro motivo</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                    Voltar
                  </Button>
                  <Button variant="destructive">Confirmar Cancelamento</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Método de Pagamento</CardTitle>
          <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Mastercard •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expira em 12/2026</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Editar
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Adicionar Novo Método de Pagamento
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

