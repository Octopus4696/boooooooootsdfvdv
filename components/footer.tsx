export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-8 mt-20">
      <div className="container mx-auto px-6 text-center">
        <p className="text-muted-foreground">© {currentYear} Isaac Hassani. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
