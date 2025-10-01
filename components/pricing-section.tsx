import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Débutant",
      price: "29€",
      period: "/mois",
      description: "Parfait pour les petites entreprises qui commencent",
      features: [
        "Jusqu'à 1 000 produits",
        "Rapports de base",
        "Support par email",
        "Accès application mobile",
        "2 comptes utilisateur",
      ],
      popular: false,
    },
    {
      name: "Professionnel",
      price: "79€",
      period: "/mois",
      description: "Idéal pour les entreprises en croissance",
      features: [
        "Jusqu'à 10 000 produits",
        "Analyses avancées",
        "Support prioritaire",
        "Accès API",
        "10 comptes utilisateur",
        "Intégrations personnalisées",
      ],
      popular: true,
    },
    {
      name: "Entreprise",
      price: "Sur mesure",
      period: "",
      description: "Pour les grandes organisations aux besoins complexes",
      features: [
        "Produits illimités",
        "Rapports personnalisés",
        "Support dédié 24/7",
        "Options marque blanche",
        "Utilisateurs illimités",
        "Sécurité avancée",
        "Développement personnalisé",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tarification Simple et Transparente</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan parfait pour votre entreprise. Tous les plans incluent nos fonctionnalités principales de
            gestion d'inventaire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Le Plus Populaire
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80"}`}
                  variant={plan.popular ? "default" : "secondary"}
                >
                  {plan.name === "Entreprise" ? "Contacter les Ventes" : "Commencer"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Tous les plans incluent un essai gratuit de 14 jours. Aucune carte de crédit requise.
          </p>
          <Button variant="outline" size="lg">
            Comparer Toutes les Fonctionnalités
          </Button>
        </div>
      </div>
    </section>
  )
}
