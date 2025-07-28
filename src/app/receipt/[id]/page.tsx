import { AlertCircle, Receipt } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { WebReceiptTemplate } from "@/components/web-receipt-template"
import { ReceiptViewActions } from "@/components/receipt-view-actions"
import { getPublicReceipt } from "@/app/actions/public-receipt"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ReceiptViewPage({ params }: PageProps) {
  const { id } = await params

  // Fetch receipt data on the server
  const receiptResult = await getPublicReceipt(id)

  if (!receiptResult.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-red-700 mb-2">
              Recibo Não Encontrado
            </h1>
            <p className="text-red-600 mb-4">
              {receiptResult.message}
            </p>
            <BackButton
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50"
            >
              Voltar
            </BackButton>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { receipt } = receiptResult.data
  const { vehicle } = receipt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="space-y-6">
        {/* Receipt Template */}
        <WebReceiptTemplate receipt={{ ...receipt, vehicle: { make: vehicle.make, model: vehicle.model, licensePlate: vehicle.licensePlate, color: vehicle.color!, user: { name: receipt.user.name } } }} />

        {/* Action Buttons */}
        <ReceiptViewActions receipt={{ ...receipt, vehicle: { make: vehicle.make, model: vehicle.model, licensePlate: vehicle.licensePlate, color: vehicle.color!, user: { name: receipt.user.name } } }} />

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>Recibo válido e verificável • TaxiFatura © 2025</p>
        </div>
      </div>
    </div>
  )
}