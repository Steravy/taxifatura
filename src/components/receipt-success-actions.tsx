"use client"

import { Button } from "@/components/ui/button"
import { Download, CheckCircle } from "lucide-react"

interface ReceiptSuccessActionsProps {
  receiptId: string
}

export function ReceiptSuccessActions({ receiptId: _receiptId }: ReceiptSuccessActionsProps) {
  const handlePrint = () => {
    window.print()
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