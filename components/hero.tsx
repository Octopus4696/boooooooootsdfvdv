import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-balance">{"Isaac Hassani"}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">{"Développeur Full Stack Junior"}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {
              " Développeur full stack, intéressé par la conception d’expériences web modernes et intuitives, tout en approfondissant mes compétences en cloud et DevOps. "
            }
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="default" size="lg" asChild>
              <a href="#contact">{"Me contacter"}</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">{"Voir mes projets"}</a>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 pt-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:isaac.hassani@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
