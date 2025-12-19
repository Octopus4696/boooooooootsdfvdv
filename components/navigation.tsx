"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            {"IH"}
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              {"À propos"}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-foreground hover:text-primary transition-colors"
            >
              {"Projets"}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-foreground hover:text-primary transition-colors"
            >
              {"Compétences"}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              {"Contact"}
            </button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              {"À propos"}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              {"Projets"}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              {"Compétences"}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              {"Contact"}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
