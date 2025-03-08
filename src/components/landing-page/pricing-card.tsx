import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export function PricingCard({ name, description, price, period, features, popular }: PricingCardProps) {
  return (
    <Card className={`h-full overflow-hidden transition-all border duration-300 hover:shadow-md ${popular ? "border-primary shadow-md" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <Button className={`w-full ${popular ? "bg-primary" : ""}`}>Get Started</Button>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
