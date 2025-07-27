"use client"

import { useTransition } from "react"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { markReceiptCompleted } from "@/app/actions/invoice"

interface ReceiptStatusButtonProps {
  receiptId: string
  currentStatus: string
  onStatusUpdate?: () => void
}

export function ReceiptStatusButton({ 
  receiptId, 
  currentStatus, 
  onStatusUpdate 
}: ReceiptStatusButtonProps) {
  const [isPending, startTransition] = useTransition()
  const isCompleted = currentStatus === "COMPLETED"

  const handleMarkCompleted = () => {
    if (isCompleted) return

    startTransition(async () => {
      try {
        const result = await markReceiptCompleted(receiptId)
        
        if (result.success) {
          toast.success(result.message)
          onStatusUpdate?.()
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error("Error marking receipt as completed:", error)
        toast.error("Erro ao marcar recibo como concluído")
      }
    })
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`h-8 w-8 p-0 ${
        isCompleted 
          ? "text-green-600 hover:text-green-700 hover:bg-green-50" 
          : "text-slate-400 hover:text-green-600 hover:bg-green-50"
      }`}
      onClick={handleMarkCompleted}
      disabled={isPending || isCompleted}
      title={isCompleted ? "Recibo concluído" : "Marcar como concluído"}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <CheckCircle className={`w-4 h-4 ${isCompleted ? "fill-current" : ""}`} />
      )}
    </Button>
  )
}