import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Front-end",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript ES6+"],
  },
  {
    title: "Back-end",
    skills: ["Node.js", "Express", "API REST", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    title: "Outils & Autres",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Responsive Design", "Agile/Scrum"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{"Compétences"}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
