"use client"

import { useState, useEffect, useCallback } from "react"

export function useMediaQuery(query: string): boolean {
  // Initialize with null to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean | null>(null)

  // Memoize the handler to avoid recreating it on each render
  const handleChange = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
    setMatches(e.matches)
  }, [])

  useEffect(() => {
    // Safely access window only on client side
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", handleChange)
      return () => media.removeEventListener("change", handleChange)
    }
    // Fallback for older browsers
    else {
      // @ts-ignore - For older browsers that don't support addEventListener
      media.addListener(handleChange)
      return () => {
        // @ts-ignore - For older browsers
        media.removeListener(handleChange)
      }
    }
  }, [query, handleChange])

  // Return false during SSR to avoid hydration mismatch
  return matches ?? false
}

