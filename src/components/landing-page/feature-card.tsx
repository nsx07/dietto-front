import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutIcon, UsersIcon, BarChartIcon, ShieldIcon, SmartphoneIcon, ZapIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  // Map string icon names to actual Lucide icon components
  const iconMap: Record<string, React.ReactNode> = {
    layout: <LayoutIcon className="h-5 w-5" />,
    users: <UsersIcon className="h-5 w-5" />,
    "bar-chart": <BarChartIcon className="h-5 w-5" />,
    shield: <ShieldIcon className="h-5 w-5" />,
    smartphone: <SmartphoneIcon className="h-5 w-5" />,
    zap: <ZapIcon className="h-5 w-5" />,
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
          {iconMap[icon] || <div className="h-5 w-5" />}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
