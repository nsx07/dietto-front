"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/providers/auth-provider";
import WaveDots from "./wave-dots";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="text-xl font-bold">dietto</span>
        </Link>

        {!isMobile ? (
          <nav className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <AuthButtons />
            </div>
          </nav>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto overflow-hidden bg-background px-4 pb-6"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <AuthButtons />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function AuthButtons() {
  const getPayload = useAuthStore((state) => state.getPayload);
  const [name, setName] = useState<string | 1>(1);

  useEffect(() => {
    const payload = getPayload();
    if (payload) {
      setName(payload.name);
      // setTimeout(() => {
      // }, 10000);
    }
  }, [getPayload]);

  return (
    <>
      {name === 1 ? (
        <Button variant="outline" size="sm">
          <WaveDots />
        </Button>
      ) : !name ? (
        <>
          <Link href="/auth/signin" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Entrar
          </Link>
          <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
            Criar conta
          </Link>
        </>
      ) : (
        <Link href="/home" className={buttonVariants({ variant: "outline", size: "sm" })}>
          {name}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      )}
    </>
  );
}
