import { AppLayout } from "@/components/structure/layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
