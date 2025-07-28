"use client"

import { useState, useEffect } from "react"
import { Car, QrCode } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { VehicleQRModal } from "@/components/vehicle-qr-modal"
import { useMediaQuery } from "@/hooks/use-media-query"
import { getVehicles } from "@/app/actions/vehicle"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleQRSelectionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VehicleQRSelectionSheet({ 
  open, 
  onOpenChange 
}: VehicleQRSelectionSheetProps) {
  const [vehicles, setVehicles] = useState<SerializedVehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVehicle, setSelectedVehicle] = useState<SerializedVehicle | null>(null)
  
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const loadVehicles = async () => {
    try {
      setIsLoading(true)
      const result = await getVehicles()
      
      if (result.success) {
        setVehicles(result.data)
      } else {
        toast.error("Erro ao carregar veículos")
      }
    } catch (error) {
      toast.error("Erro ao carregar veículos")
      console.error("Error loading vehicles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      loadVehicles()
    }
  }, [open])

  const handleVehicleSelect = (vehicle: SerializedVehicle) => {
    setSelectedVehicle(vehicle)
  }

  const VehicleSelectionContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Selecionar Veículo</h3>
            <p className="text-sm text-slate-600">
              Escolha um veículo para ver o QR Code
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-24"></div>
                      <div className="h-3 bg-slate-200 rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Car className="w-16 h-16 text-slate-300 mb-4" />
            <h4 className="font-medium text-slate-600 mb-2">Nenhum veículo registado</h4>
            <p className="text-sm text-slate-500">
              Precisa de registar um veículo primeiro para poder ver QR Codes
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className="hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                onClick={() => handleVehicleSelect(vehicle)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-200">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">
                        {vehicle.make} {vehicle.model}
                      </div>
                      <Badge variant="outline" className="font-mono text-xs mt-1">
                        {vehicle.licensePlate}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      <VehicleQRModal
        vehicle={selectedVehicle}
        open={!!selectedVehicle}
        onOpenChange={(open) => !open && setSelectedVehicle(null)}
      />
    </div>
  )

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[50vw] min-w-[600px] max-w-[800px] p-0 overflow-hidden sm:max-w-none">
          <SheetHeader className="sr-only">
            <SheetTitle>Selecionar Veículo para QR Code</SheetTitle>
            <SheetDescription>Escolha um veículo para gerar o QR Code</SheetDescription>
          </SheetHeader>
          <VehicleSelectionContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Selecionar Veículo para QR Code</DrawerTitle>
          <DrawerDescription>Escolha um veículo para gerar o QR Code</DrawerDescription>
        </DrawerHeader>
        <VehicleSelectionContent />
      </DrawerContent>
    </Drawer>
  )
}