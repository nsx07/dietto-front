import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function BillingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Faturamento</CardTitle>
        <CardDescription>Gerencie seus dados fiscais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="company">Empresa/Nome</Label>
            <div className="mt-1 rounded-md border p-3">Nutrição Dietto LTDA</div>
          </div>
          <div>
            <Label htmlFor="tax-id">CNPJ/CPF</Label>
            <div className="mt-1 rounded-md border p-3">12.345.678/0001-90</div>
          </div>
          <div>
            <Label htmlFor="email">Email para fatura</Label>
            <div className="mt-1 rounded-md border p-3">financeiro@dietto.com.br</div>
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <div className="mt-1 rounded-md border p-3">(11) 98765-4321</div>
          </div>
        </div>

        <div>
          <Label>Endereço de Cobrança</Label>
          <div className="mt-1 rounded-md border p-3">
            <p>Av. Paulista, 1000, Sala 301</p>
            <p>Bela Vista, São Paulo - SP</p>
            <p>CEP: 01310-100</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Editar Informações de Faturamento
        </Button>
      </CardFooter>
    </Card>
  )
}

