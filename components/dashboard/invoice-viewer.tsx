"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Building2, Calendar, CreditCard, FileText } from "lucide-react"

interface InvoiceData {
  id: string
  customer: {
    name: string
    email: string
    phone?: string
    company?: string
  }
  date: string
  dueDate: string
  items: Array<{
    name: string
    sku: string
    quantity: number
    unitPrice: number
    subtotal: number
  }>
  subtotal: number
  taxRate: number
  taxAmount: number
  grandTotal: number
  status: string
}

interface InvoiceViewerProps {
  isOpen: boolean
  onClose: () => void
  invoiceData: InvoiceData | null
}

export function InvoiceViewer({ isOpen, onClose, invoiceData }: InvoiceViewerProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  if (!invoiceData) return null

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Facture ${invoiceData.id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 0; 
              color: #1f2937; 
              line-height: 1.6;
              background: #ffffff;
            }
            .container { max-width: 800px; margin: 0 auto; padding: 40px; }
            .header { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start;
              margin-bottom: 50px; 
              padding-bottom: 30px;
              border-bottom: 3px solid #f59e0b;
            }
            .company-info { display: flex; align-items: flex-start; gap: 20px; }
            .logo { 
              width: 80px; 
              height: 80px; 
              border-radius: 12px;
              overflow: hidden;
              flex-shrink: 0;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .logo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .company-details h1 { 
              color: #f59e0b; 
              font-size: 2.5em; 
              font-weight: 700; 
              margin-bottom: 10px;
              letter-spacing: -0.5px;
            }
            .company-details p { 
              color: #6b7280; 
              font-size: 0.95em; 
              line-height: 1.5;
            }
            .invoice-info { text-align: right; }
            .invoice-info h2 { 
              font-size: 2em; 
              color: #1f2937; 
              margin-bottom: 15px;
              font-weight: 600;
            }
            .invoice-number { 
              font-size: 1.3em; 
              font-weight: 700; 
              color: #f59e0b; 
              margin-bottom: 8px;
            }
            .dates { color: #6b7280; font-size: 0.95em; margin-bottom: 15px; }
            .status { 
              padding: 8px 16px; 
              border-radius: 20px; 
              font-size: 0.85em; 
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .status-paid { background-color: #d1fae5; color: #065f46; }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .customer-section { 
              margin-bottom: 40px; 
              background: #f9fafb;
              padding: 25px;
              border-radius: 12px;
              border-left: 4px solid #f59e0b;
            }
            .customer-section h3 { 
              color: #1f2937; 
              font-size: 1.2em; 
              margin-bottom: 15px;
              font-weight: 600;
            }
            .customer-details { color: #374151; }
            .customer-name { font-weight: 700; font-size: 1.1em; color: #1f2937; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 40px; 
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            th { 
              background: linear-gradient(135deg, #f59e0b, #f97316); 
              color: white; 
              padding: 16px 12px; 
              text-align: left; 
              font-weight: 600;
              font-size: 0.9em;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            td { 
              padding: 16px 12px; 
              border-bottom: 1px solid #f3f4f6; 
            }
            tr:hover { background-color: #fafafa; }
            .item-name { font-weight: 600; color: #1f2937; }
            .item-sku { color: #6b7280; font-size: 0.9em; }
            .totals-section { 
              background: #f9fafb; 
              padding: 30px; 
              border-radius: 12px;
              margin-bottom: 30px;
            }
            .totals { 
              max-width: 350px; 
              margin-left: auto; 
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              padding: 8px 0; 
              font-size: 1em;
            }
            .total-row.subtotal { color: #6b7280; }
            .total-row.tax { color: #6b7280; }
            .total-row.grand { 
              font-weight: 700; 
              font-size: 1.3em; 
              color: #1f2937;
              border-top: 2px solid #f59e0b;
              padding-top: 15px;
              margin-top: 10px;
            }
            .payment-terms { 
              background: #fef7ed; 
              padding: 25px; 
              border-radius: 12px;
              border: 1px solid #fed7aa;
            }
            .payment-terms h4 { 
              color: #ea580c; 
              font-size: 1.1em; 
              margin-bottom: 12px;
              font-weight: 600;
            }
            .payment-terms p { 
              color: #9a3412; 
              font-size: 0.95em; 
              line-height: 1.6;
            }
            .footer { 
              text-align: center; 
              margin-top: 50px; 
              padding-top: 30px; 
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="company-info">
                <div class="logo">
                  <img src="/images/fibem-logo.jpg" alt="Fibem Stock Logo" />
                </div>
                <div class="company-details">
                  <h1>FIBEM STOCK</h1>
                  <p>
                    Système de Gestion d'Inventaire<br>
                    123 Rue de l'Entreprise<br>
                    75001 Paris, France<br>
                    Tél: +33 1 23 45 67 89<br>
                    Email: contact@fibemstock.fr<br>
                    SIRET: 123 456 789 00012
                  </p>
                </div>
              </div>
              <div class="invoice-info">
                <h2>FACTURE</h2>
                <div class="invoice-number">N° ${invoiceData.id}</div>
                <div class="dates">
                  Date: ${new Date(invoiceData.date).toLocaleDateString("fr-FR")}<br>
                  Échéance: ${new Date(invoiceData.dueDate).toLocaleDateString("fr-FR")}
                </div>
                <div class="status ${invoiceData.status === "Payée" ? "status-paid" : "status-pending"}">
                  ${invoiceData.status}
                </div>
              </div>
            </div>

            <div class="customer-section">
              <h3>Facturé à:</h3>
              <div class="customer-details">
                <div class="customer-name">${invoiceData.customer.name}</div>
                ${invoiceData.customer.company ? `<div>${invoiceData.customer.company}</div>` : ""}
                <div>Email: ${invoiceData.customer.email}</div>
                ${invoiceData.customer.phone ? `<div>Tél: ${invoiceData.customer.phone}</div>` : ""}
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>SKU</th>
                  <th style="text-align: center;">Quantité</th>
                  <th style="text-align: right;">Prix Unitaire</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items
                  .map(
                    (item) => `
                  <tr>
                    <td class="item-name">${item.name}</td>
                    <td class="item-sku">${item.sku}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">€${item.unitPrice.toFixed(2)}</td>
                    <td style="text-align: right; font-weight: 600;">€${item.subtotal.toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="totals-section">
              <div class="totals">
                <div class="total-row subtotal">
                  <span>Sous-total:</span>
                  <span>€${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row tax">
                  <span>TVA (${invoiceData.taxRate}%):</span>
                  <span>€${invoiceData.taxAmount.toFixed(2)}</span>
                </div>
                <div class="total-row grand">
                  <span>TOTAL:</span>
                  <span>€${invoiceData.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="payment-terms">
              <h4>Conditions de paiement</h4>
              <p>
                <strong>Échéance:</strong> Paiement dû sous 30 jours à réception de facture<br>
                <strong>Modalités:</strong> Virement bancaire ou chèque à l'ordre de FIBEM STOCK<br>
                <strong>Pénalités:</strong> En cas de retard, pénalités de 3 fois le taux légal
              </p>
            </div>

            <div class="footer">
              <p>Merci de votre confiance • FIBEM STOCK • www.fibemstock.fr</p>
            </div>
          </div>
        </body>
      </html>
    `

    const blob = new Blob([invoiceHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Facture_${invoiceData.id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsGeneratingPDF(false)
  }

  const handleSendEmail = () => {
    const subject = `Facture ${invoiceData.id} - FIBEM STOCK`
    const body = `Bonjour ${invoiceData.customer.name},

Veuillez trouver ci-joint votre facture ${invoiceData.id} d'un montant de €${invoiceData.grandTotal.toFixed(2)}.

Date d'échéance: ${new Date(invoiceData.dueDate).toLocaleDateString("fr-FR")}

Cordialement,
L'équipe FIBEM STOCK`

    const mailtoLink = `mailto:${invoiceData.customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[98vw] max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-amber-600" />
              <DialogTitle className="text-xl">Facture {invoiceData.id}</DialogTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleSendEmail} className="gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Envoyer par Email</span>
                <span className="sm:hidden">Email</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{isGeneratingPDF ? "Génération..." : "Télécharger PDF"}</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Card className="bg-white shadow-lg mx-6 mb-6">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8 pb-6 border-b-2 border-amber-500">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white border border-gray-200">
                  <img src="/images/fibem-logo.jpg" alt="Fibem Stock Logo" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600 mb-3 tracking-tight">
                    FIBEM STOCK
                  </h1>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p className="font-medium">Système de Gestion d'Inventaire</p>
                    <p>123 Rue de l'Entreprise</p>
                    <p>75001 Paris, France</p>
                    <p>Tél: +33 1 23 45 67 89</p>
                    <p>Email: contact@fibemstock.fr</p>
                    <p className="text-xs">SIRET: 123 456 789 00012</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto lg:text-right">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-900">FACTURE</h2>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-lg sm:text-xl font-bold text-amber-700 mb-2">N° {invoiceData.id}</p>
                  <div className="space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>Date: {new Date(invoiceData.date).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 flex-shrink-0" />
                      <span>Échéance: {new Date(invoiceData.dueDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge
                      variant={invoiceData.status === "Payée" ? "default" : "secondary"}
                      className={
                        invoiceData.status === "Payée" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {invoiceData.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Facturé à:</h3>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-amber-500">
                <p className="font-bold text-lg text-gray-900 mb-1 break-words">{invoiceData.customer.name}</p>
                {invoiceData.customer.company && (
                  <p className="text-gray-700 font-medium mb-1 break-words">{invoiceData.customer.company}</p>
                )}
                <div className="space-y-1 text-gray-600 text-sm">
                  <p className="break-all">📧 {invoiceData.customer.email}</p>
                  {invoiceData.customer.phone && <p>📞 {invoiceData.customer.phone}</p>}
                </div>
              </div>
            </div>

            <div className="mb-8">
              {/* Desktop table view */}
              <div className="hidden md:block rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <th className="text-left py-3 px-3 font-semibold text-sm">Description</th>
                      <th className="text-left py-3 px-3 font-semibold text-sm">SKU</th>
                      <th className="text-center py-3 px-3 font-semibold text-sm">Qté</th>
                      <th className="text-right py-3 px-3 font-semibold text-sm">Prix Unit.</th>
                      <th className="text-right py-3 px-3 font-semibold text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                        </td>
                        <td className="py-3 px-3 text-gray-600 font-mono text-xs">{item.sku}</td>
                        <td className="py-3 px-3 text-center font-medium text-sm">{item.quantity}</td>
                        <td className="py-3 px-3 text-right text-gray-700 text-sm">€{item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right font-semibold text-gray-900 text-sm">
                          €{item.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card view */}
              <div className="md:hidden space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 font-mono">{item.sku}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-gray-900 text-sm">€{item.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Quantité: {item.quantity}</span>
                      <span>Prix unitaire: €{item.unitPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-full max-w-sm bg-gray-50 p-4 sm:p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Sous-total:</span>
                    <span>€{invoiceData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>TVA (${invoiceData.taxRate}%):</span>
                    <span>€{invoiceData.taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                    <span>TOTAL:</span>
                    <span className="text-amber-600">€{invoiceData.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 sm:p-6 rounded-lg border border-amber-200">
              <h4 className="font-semibold mb-3 text-amber-800 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Conditions de paiement
              </h4>
              <div className="text-amber-700 space-y-1 text-sm">
                <p>
                  <strong>Échéance:</strong> Paiement dû sous 30 jours à réception de facture
                </p>
                <p>
                  <strong>Modalités:</strong> Virement bancaire ou chèque à l'ordre de FIBEM STOCK
                </p>
                <p>
                  <strong>Pénalités:</strong> En cas de retard, pénalités de 3 fois le taux légal
                </p>
              </div>
            </div>

            <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-xs sm:text-sm">
                Merci de votre confiance • FIBEM STOCK • www.fibemstock.fr
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
