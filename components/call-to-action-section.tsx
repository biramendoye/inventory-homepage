"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CircleCheck as CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function CallToActionSection() {
  const { t } = useLanguage()
  const benefits = t("cta.benefits") as string[]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                {t("cta.subtitle")}
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
                  {t("cta.startNow")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/connexion">
                <Button variant="outline" size="lg" className="text-base bg-transparent">
                  {t("cta.scheduleDemo")}
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              {t("cta.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
