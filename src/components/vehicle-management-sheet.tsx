"use client"

import { useState, useEffect } from "react"
import { Car, Edit, Trash2, Plus, Search, QrCode } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { VehicleModal } from "@/components/vehicle-modal"
import { VehicleDeleteDialog } from "@/components/vehicle-delete-dialog"
import { VehicleQRModal } from "@/components/vehicle-qr-modal"
import { useMediaQuery } from "@/hooks/use-media-query"
import { getVehicles } from "@/app/actions/vehicle"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleManagementSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVehicleChange?: () => void
}

export function VehicleManagementSheet({ 
  open, 
  onOpenChange, 
  onVehicleChange 
}: VehicleManagementSheetProps) {
  const [vehicles, setVehicles] = useState<SerializedVehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<SerializedVehicle | null>(null)
  const [deletingVehicle, setDeletingVehicle] = useState<SerializedVehicle | null>(null)
  const [qrVehicle, setQrVehicle] = useState<SerializedVehicle | null>(null)
  
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const loadVehicles = async () => {
    try {
      setIsLoading(true)
      const result = await getVehicles(searchTerm || undefined)
      
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
  }, [open, searchTerm])

  const handleVehicleSuccess = () => {
    loadVehicles()
    onVehicleChange?.()
    setShowCreateModal(false)
    setEditingVehicle(null)
  }

  const handleDeleteSuccess = () => {
    loadVehicles()
    onVehicleChange?.()
    setDeletingVehicle(null)
  }

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vehicle.color && vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const VehicleManagementContent = () => (
    <div className="flex flex-col h-full">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 p-6 border-b bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Gestão de Veículos</h3>
              <p className="text-sm text-slate-600">
                {vehicles.length} veículo{vehicles.length !== 1 ? 's' : ''} registado{vehicles.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Adicionar</span>
          </Button>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Pesquisar veículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center p-6">
            <Car className="w-12 h-12 text-slate-300 mb-3" />
            <h4 className="font-medium text-slate-600 mb-1">
              {vehicles.length === 0 ? "Nenhum veículo registado" : "Nenhum veículo encontrado"}
            </h4>
            <p className="text-sm text-slate-500 mb-4">
              {vehicles.length === 0 
                ? "Adicione o seu primeiro veículo para começar"
                : "Tente ajustar os termos de pesquisa"
              }
            </p>
            {vehicles.length === 0 && (
              <Button 
                onClick={() => setShowCreateModal(true)}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Veículo
              </Button>
            )}
          </div>
        ) : (
          <div className="p-4">
            <Card className="border shadow-sm bg-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/50">
                        <TableHead className="font-semibold">Matrícula</TableHead>
                        <TableHead className="font-semibold">Veículo</TableHead>
                        <TableHead className="font-semibold">Cor</TableHead>
                        <TableHead className="font-semibold">Registado</TableHead>
                        <TableHead className="text-center font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id} className="hover:bg-slate-50/50">
                          <TableCell>
                            <Badge variant="outline" className="font-mono font-medium">
                              {vehicle.licensePlate}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{vehicle.make}</div>
                              <div className="text-sm text-slate-500">{vehicle.model}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {vehicle.color ? (
                              <Badge variant="secondary">{vehicle.color}</Badge>
                            ) : (
                              <span className="text-slate-400 text-sm">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-slate-500">
                            {new Date(vehicle.createdAt).toLocaleDateString("pt-PT")}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setQrVehicle(vehicle)}
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Gerar QR Code"
                              >
                                <QrCode className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingVehicle(vehicle)}
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeletingVehicle(vehicle)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Create Vehicle Modal */}
      <VehicleModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={handleVehicleSuccess}
      />

      {/* Edit Vehicle Modal */}
      <VehicleModal
        open={!!editingVehicle}
        onOpenChange={(open) => !open && setEditingVehicle(null)}
        vehicle={editingVehicle || undefined}
        onSuccess={handleVehicleSuccess}
      />

      {/* Delete Vehicle Dialog */}
      <VehicleDeleteDialog
        vehicle={deletingVehicle}
        open={!!deletingVehicle}
        onOpenChange={(open) => !open && setDeletingVehicle(null)}
        onSuccess={handleDeleteSuccess}
      />

      {/* QR Code Modal */}
      <VehicleQRModal
        vehicle={qrVehicle}
        open={!!qrVehicle}
        onOpenChange={(open) => !open && setQrVehicle(null)}
      />
    </div>
  )

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[60vw] min-w-[700px] max-w-[900px] p-0 overflow-hidden sm:max-w-none">
          <SheetHeader className="sr-only">
            <SheetTitle>Gestão de Veículos</SheetTitle>
            <SheetDescription>Gerir os seus veículos registados</SheetDescription>
          </SheetHeader>
          <VehicleManagementContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Gestão de Veículos</DrawerTitle>
          <DrawerDescription>Gerir os seus veículos registados</DrawerDescription>
        </DrawerHeader>
        <VehicleManagementContent />
      </DrawerContent>
    </Drawer>
  )
}