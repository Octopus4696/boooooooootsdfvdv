"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{"Contactez-moi"}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6">{"Envoyez-moi un message"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Votre message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {"Envoyer"}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{"Email"}</h4>
                  <p className="text-muted-foreground">{"isaac.hassani@example.com"}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{"Téléphone"}</h4>
                  <p className="text-muted-foreground">{"+33 6 12 34 56 78"}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{"Localisation"}</h4>
                  <p className="text-muted-foreground">{"Paris, France"}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>{"© 2025 Isaac Hassani. Tous droits réservés."}</p>
        </div>
      </div>
    </section>
  )
}
