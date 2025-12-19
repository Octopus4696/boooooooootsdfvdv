import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Application E-commerce",
    description: "Une plateforme e-commerce complète avec panier d'achat, gestion des produits et paiement intégré.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/modern-ecommerce-application.jpg",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Dashboard Analytique",
    description:
      "Un tableau de bord interactif pour visualiser et analyser des données en temps réel avec des graphiques dynamiques.",
    tags: ["React", "TypeScript", "Chart.js", "API REST"],
    image: "/analytics-dashboard.png",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Réseau Social",
    description:
      "Une application de réseau social avec authentification, publications, commentaires et système de likes.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    image: "/social-media-app-interface.png",
    github: "https://github.com",
    demo: "https://example.com",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{"Mes Projets"}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      {"Code"}
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {"Demo"}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
