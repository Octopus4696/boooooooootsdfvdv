"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex h-9 w-16 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary hover:bg-secondary/80"
      role="switch"
      aria-checked={theme === "dark"}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          theme === "dark" ? "translate-x-8" : "translate-x-1"
        } inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary transition-transform duration-200 shadow-md`}
      >
        <Sun className="h-4 w-4 text-primary-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 text-primary-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
    </button>
  )
}
