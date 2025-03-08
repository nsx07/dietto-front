"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { AppNavbar } from "@/components/structure/navbar";
import { AppSidebar } from "@/components/structure/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppNavbar />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex-1 pt-16">
            <main className="flex-1">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
