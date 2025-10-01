"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Minus,
  Search,
  X,
  User,
  Building2,
  Mail,
  Phone,
  ShoppingCart,
  Calculator,
  AlertCircle,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Mock products data (same as in products-content.tsx)
const mockProducts = [
  {
    id: 1,
    name: "MacBook Air M2",
    sku: "MBA-M2-256",
    category: "electronics",
    quantity: 15,
    price: 1299,
    status: "inStock",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    sku: "IP15P-128",
    category: "electronics",
    quantity: 3,
    price: 1199,
    status: "lowStock",
  },
  {
    id: 4,
    name: "Dell XPS 13",
    sku: "DXP13-512",
    category: "electronics",
    quantity: 8,
    price: 1599,
    status: "inStock",
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    sku: "IPP129-256",
    category: "electronics",
    quantity: 12,
    price: 1099,
    status: "inStock",
  },
]

interface SaleItem {
  product: (typeof mockProducts)[0]
  quantity: number
  unitPrice: number
  subtotal: number
}

interface NewSaleFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (saleData: any) => void
}

export function NewSaleForm({ isOpen, onClose, onSave }: NewSaleFormProps) {
  const { t } = useLanguage()
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const [saleItems, setSaleItems] = useState<SaleItem[]>([])
  const [productSearch, setProductSearch] = useState("")
  const [showProductSelector, setShowProductSelector] = useState(false)
  const [taxRate, setTaxRate] = useState(20) // 20% TVA by default
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.sku.toLowerCase().includes(productSearch.toLowerCase()),
  )

  const addProduct = (product: (typeof mockProducts)[0]) => {
    const existingItem = saleItems.find((item) => item.product.id === product.id)
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      const newItem: SaleItem = {
        product,
        quantity: 1,
        unitPrice: product.price,
        subtotal: product.price,
      }
      setSaleItems([...saleItems, newItem])
    }
    setShowProductSelector(false)
    setProductSearch("")
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeProduct(productId)
      return
    }
    setSaleItems(
      saleItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.unitPrice }
          : item,
      ),
    )
  }

  const updateUnitPrice = (productId: number, newPrice: number) => {
    setSaleItems(
      saleItems.map((item) =>
        item.product.id === productId ? { ...item, unitPrice: newPrice, subtotal: item.quantity * newPrice } : item,
      ),
    )
  }

  const removeProduct = (productId: number) => {
    setSaleItems(saleItems.filter((item) => item.product.id !== productId))
  }

  const subtotal = saleItems.reduce((sum, item) => sum + item.subtotal, 0)
  const taxAmount = (subtotal * taxRate) / 100
  const grandTotal = subtotal + taxAmount

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!customer.name.trim()) {
      newErrors.name = t("forms.validation.required")
    }

    if (!customer.email.trim()) {
      newErrors.email = t("forms.validation.required")
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = t("forms.validation.email")
    }

    if (saleItems.length === 0) {
      newErrors.items =
        t("sales.selectProduct") === "Select Product"
          ? "At least one product must be added"
          : "Au moins un produit doit être ajouté"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = () => {
    const saleData = {
      customer,
      items: saleItems,
      subtotal,
      taxRate,
      taxAmount,
      grandTotal,
      notes,
      status: "draft",
      date: new Date().toISOString(),
    }
    onSave(saleData)
    resetForm()
    onClose()
  }

  const handleConfirmSale = () => {
    if (!validateForm()) {
      return
    }

    const saleData = {
      customer,
      items: saleItems,
      subtotal,
      taxRate,
      taxAmount,
      grandTotal,
      notes,
      status: "confirmed",
      date: new Date().toISOString(),
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    }
    onSave(saleData)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setCustomer({ name: "", email: "", phone: "", company: "" })
    setSaleItems([])
    setTaxRate(20)
    setNotes("")
    setErrors({})
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "inStock":
        return t("products.inStock")
      case "lowStock":
        return t("products.lowStock")
      case "outOfStock":
        return t("products.outOfStock")
      default:
        return status
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-amber-600" />
            <DialogTitle className="text-xl">{t("sales.newSale")}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-amber-600" />
                {t("sales.customer") === "Customer" ? "Customer Information" : "Informations Client"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("common.name")} *
                  </Label>
                  <Input
                    id="customerName"
                    value={customer.name}
                    onChange={(e) => {
                      setCustomer({ ...customer, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: "" })
                    }}
                    placeholder={
                      t("sales.customerName") === "Customer Name" ? "Full customer name" : "Nom complet du client"
                    }
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t("common.email")} *
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customer.email}
                    onChange={(e) => {
                      setCustomer({ ...customer, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: "" })
                    }}
                    placeholder={t("common.email") === "Email" ? "email@example.com" : "email@exemple.com"}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t("common.phone")}
                  </Label>
                  <Input
                    id="customerPhone"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="01 23 45 67 89"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerCompany" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {t("common.name") === "Name" ? "Company" : "Entreprise"}
                  </Label>
                  <Input
                    id="customerCompany"
                    value={customer.company}
                    onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                    placeholder={t("common.name") === "Name" ? "Company name" : "Nom de l'entreprise"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  {t("sales.selectProduct") === "Select Product" ? "Product Selection" : "Sélection des Produits"}
                </CardTitle>
                <Button
                  onClick={() => setShowProductSelector(true)}
                  variant="outline"
                  className="gap-2 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" />
                  {t("sales.addItem")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {errors.items && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.items}
                  </p>
                </div>
              )}

              {saleItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">
                    {t("sales.selectProduct") === "Select Product"
                      ? "No product selected"
                      : "Aucun produit sélectionné"}
                  </p>
                  <p className="text-sm">
                    {t("sales.addItem") === "Add Item"
                      ? 'Click "Add Item" to get started'
                      : 'Cliquez sur "Ajouter un article" pour commencer'}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">{t("sales.itemDescription")}</TableHead>
                        <TableHead className="font-semibold">{t("common.quantity")}</TableHead>
                        <TableHead className="font-semibold">{t("sales.unitPrice")}</TableHead>
                        <TableHead className="font-semibold">{t("common.subtotal")}</TableHead>
                        <TableHead className="font-semibold">{t("common.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {saleItems.map((item) => (
                        <TableRow key={item.product.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{item.product.name}</div>
                              <div className="text-sm text-gray-500 font-mono">{item.product.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent hover:bg-red-50"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 0)}
                                className="w-20 text-center"
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent hover:bg-green-50"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateUnitPrice(item.product.id, Number.parseFloat(e.target.value) || 0)}
                              className="w-28"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">€{item.subtotal.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProduct(item.product.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-green-600" />
                {t("common.notes") === "Notes" ? "Notes and Comments" : "Notes et Commentaires"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  t("common.notes") === "Notes"
                    ? "Add notes or comments for this sale..."
                    : "Ajoutez des notes ou commentaires pour cette vente..."
                }
                className="min-h-[80px]"
              />
            </CardContent>
          </Card>

          {/* Totals */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-purple-600" />
                {t("common.total") === "Total" ? "Summary" : "Récapitulatif"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>{t("common.subtotal")}:</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>{t("common.tax")}:</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number.parseFloat(e.target.value) || 0)}
                        className="w-20 text-center"
                        step="0.1"
                      />
                      <span>% = €{taxAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>{t("common.total").toUpperCase()}:</span>
                    <span className="text-amber-600">€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} className="gap-2 bg-transparent">
              <AlertCircle className="h-4 w-4" />
              {t("sales.draft") === "Draft" ? "Save as Draft" : "Sauvegarder comme Brouillon"}
            </Button>
            <Button onClick={handleConfirmSale} className="bg-amber-600 hover:bg-amber-700 gap-2">
              <ShoppingCart className="h-4 w-4" />
              {t("sales.newSale") === "New Sale" ? "Confirm Sale" : "Confirmer la Vente"}
            </Button>
          </div>
        </div>

        {/* Product Selector Dialog */}
        <Dialog open={showProductSelector} onOpenChange={setShowProductSelector}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                {t("sales.selectProduct")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={
                    t("common.search") === "Search" ? "Search by name or SKU..." : "Rechercher par nom ou SKU..."
                  }
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="max-h-80 overflow-y-auto space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    onClick={() => addProduct(product)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 font-mono">
                        {product.sku} • €{product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={product.status === "inStock" ? "default" : "secondary"}
                        className={
                          product.status === "inStock" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {getStatusText(product.status)}
                      </Badge>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {t("common.quantity") === "Quantity" ? "Qty" : "Qté"}: {product.quantity}
                      </span>
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>{t("common.search") === "Search" ? "No product found" : "Aucun produit trouvé"}</p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}
