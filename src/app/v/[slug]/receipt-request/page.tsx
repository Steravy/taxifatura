import { Car, User, Receipt, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PublicReceiptForm } from "@/components/public-receipt-form"
import { BackButton } from "@/components/back-button"
import { getVehicleBySlug } from "@/app/actions/public-receipt"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ReceiptRequestPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch vehicle data on the server
  const result = await getVehicleBySlug(slug)

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-red-700 mb-2">
              Veículo Não Encontrado
            </h1>
            <p className="text-red-600 mb-4">
              {result.message}
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

  const { vehicle } = result.data

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mx-auto">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Solicitação de Recibo
          </h1>
          <p className="text-slate-600">
            Preencha os dados da sua viagem para receber o recibo
          </p>
        </div>

        {/* Vehicle Information */}
        <Card className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Car className="w-5 h-5 text-blue-600" />
              Informações do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="font-mono font-bold text-lg px-3 py-1">
                  {vehicle.licensePlate}
                </Badge>
                {vehicle.color && (
                  <Badge variant="secondary">{vehicle.color}</Badge>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-600">Veículo</Label>
                <p className="font-medium">{vehicle.make} {vehicle.model}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600">Condutor</Label>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{vehicle.user.name}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Form */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Dados da Viagem</CardTitle>
          </CardHeader>
          <CardContent>
            <PublicReceiptForm vehicleSlug={slug} />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>O recibo será processado e enviado por email.</p>
        </div>
      </div>
    </div>
  )
}