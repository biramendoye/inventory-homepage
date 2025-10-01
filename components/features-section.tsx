"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartBar as BarChart3, Users, FileText, Zap, Shield, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: BarChart3,
      title: t("features.realTimeTracking.title"),
      description: t("features.realTimeTracking.description"),
    },
    {
      icon: Users,
      title: t("features.supplierManagement.title"),
      description: t("features.supplierManagement.description"),
    },
    {
      icon: FileText,
      title: t("features.automatedReports.title"),
      description: t("features.automatedReports.description"),
    },
    {
      icon: Zap,
      title: t("features.quickIntegration.title"),
      description: t("features.quickIntegration.description"),
    },
    {
      icon: Shield,
      title: t("features.secureCompliant.title"),
      description: t("features.secureCompliant.description"),
    },
    {
      icon: Globe,
      title: t("features.multiLocationSupport.title"),
      description: t("features.multiLocationSupport.description"),
    },
  ]

  return (
    <section id="features" className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            {t("features.subtitle")}
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
