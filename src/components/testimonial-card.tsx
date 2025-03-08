import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 text-muted-foreground">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-500">
              ★
            </span>
          ))}
        </div>
        <blockquote className="mb-6 text-base italic">&#34;{quote}&#34;</blockquote>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Image src={avatar || "/placeholder.svg"} alt={author} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
