import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, FileText, Zap, Shield, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Suivi de Stock en Temps Réel",
      description:
        "Surveillez les niveaux d'inventaire en temps réel avec des alertes automatisées pour les stocks faibles et les points de réapprovisionnement.",
    },
    {
      icon: Users,
      title: "Gestion des Fournisseurs",
      description:
        "Gérez les relations avec les fournisseurs, suivez les bons de commande et maintenez les métriques de performance des vendeurs.",
    },
    {
      icon: FileText,
      title: "Rapports Automatisés",
      description:
        "Générez des rapports complets sur la rotation des stocks, les coûts et les analyses de performance.",
    },
    {
      icon: Zap,
      title: "Intégration Rapide",
      description: "Intégrez-vous facilement avec vos plateformes ERP, comptabilité et e-commerce existantes.",
    },
    {
      icon: Shield,
      title: "Sécurisé et Conforme",
      description: "Sécurité de niveau entreprise avec contrôle d'accès basé sur les rôles et pistes d'audit.",
    },
    {
      icon: Globe,
      title: "Support Multi-sites",
      description: "Gérez l'inventaire sur plusieurs entrepôts et emplacements depuis un seul tableau de bord.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            Fonctionnalités Puissantes pour les Entreprises Modernes
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour gérer efficacement votre inventaire et développer vos opérations
            commerciales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
