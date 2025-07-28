import { CheckCircle, Car, Receipt, Clock, Mail, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/back-button"
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

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount)
    return new Intl.NumberFormat('pt-CV', {
      style: 'currency',
      currency: 'CVE'
    }).format(num)
  }

  const formatDate = (dateStr: string | Date) => {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          label: 'Em Processamento',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock
        }
      case 'COMPLETED':
        return {
          label: 'Concluído',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle
        }
      case 'SENT':
        return {
          label: 'Enviado',
          color: 'bg-blue-100 text-blue-800',
          icon: Mail
        }
      default:
        return {
          label: 'Pendente',
          color: 'bg-slate-100 text-slate-800',
          icon: Clock
        }
    }
  }

  const statusInfo = getStatusInfo(receipt.status)
  const StatusIcon = statusInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
            <Receipt className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Recibo Digital
            </h1>
            <p className="text-blue-700">
              Visualização online do seu recibo de táxi
            </p>
          </div>
        </div>

        {/* Receipt Details */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                Detalhes do Recibo
              </div>
              <Badge className={statusInfo.color}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.label}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Receipt ID */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-center">
                <Label className="text-sm font-medium text-slate-600">ID do Recibo</Label>
                <p className="font-mono text-lg font-semibold text-slate-800 mt-1">
                  #{receipt.id.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-800">Veículo</h3>
              </div>
              <div className="space-y-1">
                <p className="font-medium">{receipt.vehicle.make} {receipt.vehicle.model}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {receipt.vehicle.licensePlate}
                  </Badge>
                  {receipt.vehicle.color && (
                    <Badge variant="secondary">{receipt.vehicle.color}</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">Condutor: {receipt.user.name}</p>
              </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Dados da Viagem</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-slate-600">Cliente</Label>
                    <p className="font-medium">{receipt.clientName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Origem</Label>
                    <p>{receipt.origin}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Destino</Label>
                    <p>{receipt.destination}</p>
                  </div>
                  {receipt.distance && (
                    <div>
                      <Label className="text-sm text-slate-600">Distância</Label>
                      <p>{receipt.distance} km</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Detalhes do Pagamento</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-slate-600">Data da Viagem</Label>
                    <p>{formatDate(receipt.tripDate)}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Hora</Label>
                    <p>{receipt.tripTime}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Valor</Label>
                    <p className="text-lg font-semibold text-blue-700">
                      {formatCurrency(receipt.amount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>Recibo válido e verificável • TaxiFatura © 2024</p>
        </div>
      </div>
    </div>
  )
}