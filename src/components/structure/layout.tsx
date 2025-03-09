"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { AppNavbar } from "@/components/structure/navbar";
import { AppSidebar } from "@/components/structure/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { cn } from "@/lib/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    // Check localStorage for saved state
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-state");
      if (savedState !== null) {
        setDefaultOpen(savedState === "expanded");
      }
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen flex-col">
        <AppNavbar />
        <div className="flex flex-1">
          <AppSidebar />
          <AppWrapper>{children}</AppWrapper>
          <SidebarInset className="flex-1 pt-16"></SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarState();
  return (
    <div
      className={cn("w-svw mt-16", {
        "md:w-[calc(100svw-50px)]": isCollapsed,
        "md:w-[calc(100svw-270px)]": !isCollapsed,
      })}
    >
      <main className="flex-1">{children}</main>
    </div>
  );
}
