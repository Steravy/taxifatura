"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { SendReceiptEmailModal } from "@/components/send-receipt-email-modal"
import { pdf } from '@react-pdf/renderer'
import { MinimalReceiptPDFTemplate } from './minimal-receipt-pdf-template'
import { generateQRCodeDataUrl, getReceiptViewUrl } from '@/lib/qr-utils'

interface ReceiptData {
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

interface ReceiptViewActionsProps {
  receipt: ReceiptData
}

export function ReceiptViewActions({ receipt }: ReceiptViewActionsProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const handleDownloadPDF = async () => {
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

  // const handleSendEmail = () => {
  //   setIsEmailModalOpen(true)
  // }

  return (
    <>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-lg shadow-sm border">
          <Button
            // variant="outline"
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
          {/* <Button
            onClick={handleSendEmail}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar por Email
          </Button> */}
        </div>
      </div>

      <SendReceiptEmailModal
        open={isEmailModalOpen}
        onOpenChange={setIsEmailModalOpen}
        receiptId={receipt.id}
      />
    </>
  )
}