import QRCode from "react-qr-code"
import { getReceiptViewUrl } from "@/lib/qr-utils"

interface ReceiptData {
  id: string
  clientName: string
  origin: string
  destination: string
  distance?: number | null
  amount: string
  status: string
  tripDate: string | Date
  tripTime: string
  notes?: string | null
  vehicle: {
    make: string
    model: string
    licensePlate: string
    color?: string | null
    user: {
      name: string
    }
  }
}

interface WebReceiptTemplateProps {
  receipt: ReceiptData
}

export function WebReceiptTemplate({ receipt }: WebReceiptTemplateProps) {
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

  const receiptUrl = getReceiptViewUrl(receipt.id)

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg border">
      {/* Header */}
      <div className="flex justify-between items-start p-6 pb-4">
        <div className="flex-1">
          <h1 className="text-lg font-bold text-black mb-1">TaxiFatura</h1>
          <div className="text-xs text-gray-600 leading-tight">
            <p>Serviço de Faturação para Táxis</p>
            <p>Cabo Verde</p>
            <p>www.taxifatura.cv</p>
          </div>
        </div>
        
        {/* QR Code */}
        <div className="w-20 h-20 flex items-center justify-center">
          <QRCode
            value={receiptUrl}
            size={80}
            level="M"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-b border-gray-300"></div>

      {/* Receipt Information */}
      <div className="flex justify-between p-6 py-4 text-xs">
        <div>
          <p className="text-gray-600 mb-1">Recibo</p>
          <p className="font-bold">#{receipt.id.slice(-8).toUpperCase()}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Data</p>
          <p className="font-bold">{formatDate(receipt.tripDate)}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Hora</p>
          <p className="font-bold">{receipt.tripTime}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-b border-gray-200"></div>

      {/* Service Details Table */}
      <div className="px-6 py-5">
        {/* Table Header */}
        <div className="flex mb-3">
          <div className="flex-2 text-xs font-bold text-gray-600 uppercase border-b border-gray-300 pb-2">Serviço</div>
          <div className="flex-2 text-xs font-bold text-gray-600 uppercase border-b border-gray-300 pb-2 px-2">Detalhes</div>
          <div className="flex-1 text-xs font-bold text-gray-600 uppercase text-right border-b border-gray-300 pb-2">Valor</div>
        </div>
        
        {/* Service Row */}
        <div className="flex mb-4 text-xs">
          <div className="flex-2 pr-2">Transporte de Táxi</div>
          <div className="flex-2 px-2 leading-relaxed">
            <p>Cliente: {receipt.clientName}</p>
            <p>Origem: {receipt.origin}</p>
            <p>Destino: {receipt.destination}</p>
            {receipt.distance && <p>Distância: {receipt.distance} km</p>}
          </div>
          <div className="flex-1 text-right">{formatCurrency(receipt.amount)}</div>
        </div>
        
        {/* Vehicle Info Row */}
        <div className="flex mb-6 text-xs">
          <div className="flex-2 pr-2">Veículo</div>
          <div className="flex-2 px-2 leading-relaxed">
            <p>{receipt.vehicle.make} {receipt.vehicle.model}</p>
            <p>Matrícula: {receipt.vehicle.licensePlate}</p>
            {receipt.vehicle.color && <p>Cor: {receipt.vehicle.color}</p>}
          </div>
          <div className="flex-1 text-right">-</div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-b border-gray-300"></div>

      {/* Totals */}
      <div className="px-6 py-5">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(receipt.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IVA</span>
            <div className="text-right leading-tight">
              <p>Isento de IVA</p>
              <p>Art. 9º CIVA</p>
            </div>
          </div>
          <div className="flex justify-between border-t-2 border-black pt-3 mt-3 font-bold">
            <span>TOTAL</span>
            <span>{formatCurrency(receipt.amount)}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-b border-gray-200"></div>

      {/* Footer */}
      <div className="flex justify-between px-6 py-4 text-xs">
        <div className="flex-1 pr-3">
          <p className="font-bold mb-1 text-xs">TaxiFatura</p>
          <div className="text-gray-600 leading-tight text-xs">
            <p>Sistema de Faturação</p>
            <p>para Serviços de Táxi</p>
            <p>Cabo Verde</p>
          </div>
        </div>
        
        <div className="flex-1 px-3">
          <p className="font-bold mb-1 text-xs">Condutor</p>
          <div className="text-gray-600 leading-tight text-xs">
            <p>{receipt.vehicle.user.name}</p>
            <p>Licenciado para Transporte</p>
            <p>de Passageiros</p>
          </div>
        </div>
        
        <div className="flex-1 pl-3">
          <p className="font-bold mb-1 text-xs">Validade</p>
          <div className="text-gray-600 leading-tight text-xs">
            <p>Escaneie o QR Code acima</p>
            <p>ou consulte no link:</p>
            <p className="break-all">{receiptUrl}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-3 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400 leading-tight" style={{ fontSize: '10px' }}>
          Este recibo é uma comprovação de prestação de serviço de transporte e não uma nota fiscal. 
          A validade deste documento depende das políticas da entidade que o solicita.
        </p>
      </div>
    </div>
  )
}