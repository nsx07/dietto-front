"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "@/components/tabs/overview-tab"
import { PlansTab } from "@/components/tabs/plans-tab"
import { BillingTab } from "@/components/tabs/billing-tab"
import { HistoryTab } from "@/components/tabs/history-tab"

export function SubscriptionDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Assinatura</h1>
          <p className="text-muted-foreground">Gerencie seu plano, pagamentos e informações de faturamento</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="billing">Faturamento</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="plans" className="space-y-4 pt-4">
            <PlansTab />
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 pt-4">
            <BillingTab />
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pt-4">
            <HistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

