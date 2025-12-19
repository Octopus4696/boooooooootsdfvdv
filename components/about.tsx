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
                "Je suis un développeur full stack en alternance, passionné par la création d’applications web modernes. J’apprends actuellement différentes technologies du développement, aussi bien côté front-end que back-end, et je m’intéresse de plus en plus au cloud et au DevOps, domaines dans lesquels j’ai prévu de me former davantage."
              }
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {
                "Je cherche à évoluer au sein d’équipes dynamiques et à contribuer à des projets innovants, tout en continuant à développer mes compétences et à élargir mon champ d’expertise."
              }
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
