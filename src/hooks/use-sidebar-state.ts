"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

const STORAGE_KEY = "sidebar-state";

export function useSidebarState() {
  const { state, setOpen, isMobile } = useSidebar();
  const [isInitialized, setIsInitialized] = useState(false);

  // Load the saved state from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && !isMobile) {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState !== null) {
        setOpen(savedState === "expanded");
      }
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [isMobile, setOpen]);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized && !isMobile) {
      localStorage.setItem(STORAGE_KEY, state);
    }
  }, [state, isInitialized, isMobile]);

  return {
    isCollapsed: state === "collapsed",
    isExpanded: state === "expanded",
    isInitialized,
  };
}
