"use client"

import React from "react"
import { Car } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { VehicleForm } from "@/components/forms/vehicle-form"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle?: SerializedVehicle // For editing existing vehicle
  onSuccess?: (vehicle: SerializedVehicle) => void
}

export function VehicleModal({ open, onOpenChange, vehicle, onSuccess }: VehicleModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isEditing = !!vehicle

  const handleSuccess = (updatedVehicle: SerializedVehicle) => {
    onSuccess?.(updatedVehicle)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              {isEditing ? "Editar Veículo" : "Registar Veículo"}
            </DialogTitle>
          </DialogHeader>
          <div className="px-1">
            <VehicleForm 
              vehicle={vehicle} 
              onSuccess={handleSuccess} 
              onCancel={handleCancel} 
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <Car className="w-5 h-5" />
              {isEditing ? "Editar Veículo" : "Registar Veículo"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8">
            <VehicleForm 
              vehicle={vehicle} 
              onSuccess={handleSuccess} 
              onCancel={handleCancel} 
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}