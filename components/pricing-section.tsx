"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function PricingSection() {
  const { t } = useLanguage()
  const plans = [
    {
      name: t("pricing.plans.starter.name"),
      price: t("pricing.plans.starter.price"),
      period: t("pricing.plans.starter.period"),
      description: t("pricing.plans.starter.description"),
      features: t("pricing.plans.starter.features") as string[],
      popular: false,
    },
    {
      name: t("pricing.plans.professional.name"),
      price: t("pricing.plans.professional.price"),
      period: t("pricing.plans.professional.period"),
      description: t("pricing.plans.professional.description"),
      features: t("pricing.plans.professional.features") as string[],
      popular: true,
    },
    {
      name: t("pricing.plans.enterprise.name"),
      price: t("pricing.plans.enterprise.price"),
      period: t("pricing.plans.enterprise.period"),
      description: t("pricing.plans.enterprise.description"),
      features: t("pricing.plans.enterprise.features") as string[],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pricing.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t("pricing.mostPopular")}
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
                  {plan.name === t("pricing.plans.enterprise.name") ? t("pricing.contactSales") : t("pricing.getStarted")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t("pricing.freeTrialNote")}
          </p>
          <Button variant="outline" size="lg">
            {t("pricing.compareFeatures")}
          </Button>
        </div>
      </div>
    </section>
  )
}
