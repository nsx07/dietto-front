"use client";

import { BarChart3, Calendar, CreditCard, FileText, Home, Inbox, LayoutDashboard, Settings, Users } from "lucide-react";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import Link from "next/link";

// Navigation items for the sidebar
const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    isActive: true,
  },
  {
    title: "Home",
    icon: Home,
    href: "/home",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Mensagens",
    icon: Inbox,
    href: "/messages",
    badge: "12",
  },
  {
    title: "Calendario",
    icon: Calendar,
    href: "/scheduler",
  },
  {
    title: "Documentos",
    icon: FileText,
    href: "/documents",
  },
];

// Secondary navigation items
const secondaryItems = [
  {
    title: "Time",
    icon: Users,
    href: "/team",
  },
  {
    title: "Assinatura",
    icon: CreditCard,
    href: "/billing",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/settings",
  },
];

export function AppSidebar() {
  const { isInitialized } = useSidebarState();

  return (
    <Sidebar className="mt-16" collapsible="icon">
      <SidebarHeader className="flex justify-end p-2">{isInitialized && <SidebarToggle />}</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
