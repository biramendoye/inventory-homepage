import { Package, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Fonctionnalités", href: "#features" },
      { name: "Tarifs", href: "#pricing" },
      { name: "Intégrations", href: "#integrations" },
      { name: "API", href: "#api" },
    ],
    company: [
      { name: "À Propos", href: "#about" },
      { name: "Carrières", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Presse", href: "#press" },
    ],
    support: [
      { name: "Centre d'Aide", href: "#help" },
      { name: "Documentation", href: "#docs" },
      { name: "Support Contact", href: "#support" },
      { name: "État du Système", href: "#status" },
    ],
    legal: [
      { name: "Politique de Confidentialité", href: "#privacy" },
      { name: "Conditions d'Utilisation", href: "#terms" },
      { name: "Politique des Cookies", href: "#cookies" },
      { name: "RGPD", href: "#gdpr" },
    ],
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">FIBEM</span>
            </div>

            <p className="text-background/80 text-pretty max-w-md">
              Optimisez votre gestion d'inventaire avec notre logiciel puissant et intuitif conçu pour les entreprises
              modernes.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Avenue des Affaires, Suite 100, 75001 Paris, France</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@fibem.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-background/80 hover:text-background transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-background/80 hover:text-background transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-background/80 hover:text-background transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <p className="text-sm text-background/80">© 2024 FIBEM. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
