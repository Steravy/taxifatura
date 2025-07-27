"use client"

import { useState } from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteVehicle } from "@/app/actions/vehicle"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleDeleteDialogProps {
  vehicle: SerializedVehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function VehicleDeleteDialog({ 
  vehicle, 
  open, 
  onOpenChange, 
  onSuccess 
}: VehicleDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!vehicle) return

    try {
      setIsDeleting(true)
      
      const result = await deleteVehicle(vehicle.id)
      
      if (result.success) {
        toast.success(result.message)
        onSuccess?.()
        onOpenChange(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Erro inesperado ao eliminar veículo")
      console.error("Delete error:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!vehicle) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Eliminar Veículo
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2">
              <div>
                Tem a certeza que deseja eliminar o veículo{" "}
                <span className="font-semibold">{vehicle.licensePlate}</span>?
              </div>
              <div className="text-sm text-slate-600">
                <strong>{vehicle.make} {vehicle.model}</strong>
                {vehicle.color && ` - ${vehicle.color}`}
              </div>
              <div className="text-sm text-red-600 font-medium">
                Esta ação não pode ser desfeita. O veículo não pode ser eliminado se tiver recibos associados.
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Trash2 className="w-4 h-4 mr-2 animate-pulse" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}