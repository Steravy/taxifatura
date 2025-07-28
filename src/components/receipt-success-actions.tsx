"use client"

import { Button } from "@/components/ui/button"
import { Download, CheckCircle } from "lucide-react"
import { pdf } from '@react-pdf/renderer'
import { MinimalReceiptPDFTemplate } from './minimal-receipt-pdf-template'
import { generateQRCodeDataUrl, getReceiptViewUrl } from '@/lib/qr-utils'

export interface ReceiptData {
  id: string
  clientName: string
  origin: string
  destination: string
  distance: number | null
  amount: string
  status: string
  tripDate: string | Date
  tripTime: string
  notes: string | null
  vehicle: {
    make: string
    model: string
    licensePlate: string
    color?: string
    user: {
      name: string
    }
  }
}

interface ReceiptSuccessActionsProps {
  receiptId?: string
  receipt: ReceiptData
}

export function ReceiptSuccessActions({ receipt }: ReceiptSuccessActionsProps) {
  const handlePrint = async () => {
    try {
      // Generate QR code for receipt viewing page
      const receiptUrl = getReceiptViewUrl(receipt.id)
      const qrCodeDataUrl = await generateQRCodeDataUrl(receiptUrl)
      
      // Generate PDF with QR code
      const blob = await pdf(
        <MinimalReceiptPDFTemplate receipt={receipt} qrCodeDataUrl={qrCodeDataUrl} />
      ).toBlob()
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `recibo-${receipt.id.slice(-8).toUpperCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        onClick={handlePrint}
        className="flex-1"
      >
        <Download className="w-4 h-4 mr-2" />
        Imprimir Confirmação
      </Button>
      <Button
        onClick={handleGoHome}
        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        Concluído
      </Button>
    </div>
  )
}