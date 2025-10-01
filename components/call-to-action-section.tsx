import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function CallToActionSection() {
  const benefits = [
    "Réduisez les coûts d'inventaire jusqu'à 30%",
    "Éliminez les ruptures et les surstocks",
    "Économisez 10+ heures par semaine sur les tâches manuelles",
    "Améliorez les relations avec vos fournisseurs",
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Prêt à Transformer Votre Gestion d'Inventaire ?
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Rejoignez des milliers d'entreprises qui font confiance à FIBEM STOCK pour optimiser leurs opérations et
                augmenter leur rentabilité.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-base">
                  Commencer Maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/connexion">
                <Button variant="outline" size="lg" className="text-base bg-transparent">
                  Planifier une Démo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Aucun frais d'installation • Annulation à tout moment • Support 24/7 inclus
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
