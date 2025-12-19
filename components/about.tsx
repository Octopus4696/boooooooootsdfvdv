import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{"À propos de moi"}</h2>
        <Card className="p-8 md:p-12">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {
                "Je suis un développeur full stack junior passionné par la création d'applications web modernes et performantes. Avec une solide base en JavaScript et React, je m'efforce constamment d'apprendre et de maîtriser les dernières technologies du web."
              }
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {
                "Mon parcours m'a permis de développer des compétences aussi bien en front-end qu'en back-end. J'aime transformer des idées en produits fonctionnels et élégants, en mettant l'accent sur l'expérience utilisateur et la qualité du code."
              }
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {
                "Je suis actuellement à la recherche de nouvelles opportunités pour continuer à grandir en tant que développeur et contribuer à des projets innovants au sein d'une équipe dynamique."
              }
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
