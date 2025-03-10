import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HistoryTab() {
  const invoices = [
    { date: "15/09/2025", desc: "Plano Profissional", amount: "R$ 99,90", status: "Pago" },
    { date: "15/08/2025", desc: "Plano Profissional", amount: "R$ 99,90", status: "Pago" },
    { date: "15/07/2025", desc: "Plano Profissional", amount: "R$ 99,90", status: "Pago" },
    { date: "15/06/2025", desc: "Plano Básico", amount: "R$ 49,90", status: "Pago" },
    { date: "15/05/2025", desc: "Plano Básico", amount: "R$ 49,90", status: "Pago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pagamentos</CardTitle>
        <CardDescription>Visualize suas faturas anteriores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Data</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Descrição</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Valor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Fatura</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-3 text-sm">{invoice.date}</td>
                      <td className="px-4 py-3 text-sm">{invoice.desc}</td>
                      <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

