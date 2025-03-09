"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarState } from "@/hooks/use-sidebar-state";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();
  const { isCollapsed } = useSidebarState();

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md" onClick={toggleSidebar} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
      {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
    </Button>
  );
}
