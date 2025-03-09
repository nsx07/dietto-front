"use client";

import Link from "next/link";
import { Bell, HelpCircle, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { signout } from "@/actions/auth-actions";
import { useAuthStore } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

const getInitials = (name?: string) => {
  if (!name) {
    return "U";
  }

  const [firstName, lastName] = name.split(" ");
  return firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");
};

export function AppNavbar() {
  const { removeToken, getPayload } = useAuthStore((a) => a);
  const { isMobile, setOpenMobile } = useSidebar();
  const router = useRouter();
  const user = {
    ...getPayload(),
    initials: getInitials(getPayload()?.name),
  };

  const handleLogout = () => {
    signout();
    removeToken();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {isMobile && (
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpenMobile(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      )}
      <Link href="/" className="flex items-center gap-2 md:mr-4">
        <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold">D</div>
        <span className="hidden font-bold md:inline-block">Dashboard</span>
      </Link>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificações</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Ajuda</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <span>{user?.initials}</span>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
