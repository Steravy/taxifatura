"use client"

import { useState, useEffect } from "react"
import { Car, Edit, Trash2, Plus, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { getVehicles } from "@/app/actions/vehicle"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleManagementProps {
  onClose?: () => void
}

export function VehicleManagement({ onClose }: VehicleManagementProps) {
  const [vehicles, setVehicles] = useState<SerializedVehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<SerializedVehicle | null>(null)
  const [deletingVehicle, setDeletingVehicle] = useState<SerializedVehicle | null>(null)

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
    loadVehicles()
  }, [searchTerm])

  const handleVehicleSuccess = () => {
    loadVehicles()
    setShowCreateModal(false)
    setEditingVehicle(null)
  }

  const handleDeleteSuccess = () => {
    loadVehicles()
    setDeletingVehicle(null)
  }

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vehicle.color && vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Gestão de Veículos</h2>
          <p className="text-sm text-slate-600 mt-1">
            Gerir os seus veículos registados
          </p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Voltar
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Pesquisar veículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Veículo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Veículos Registados ({vehicles.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-12 px-6">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-48 mx-auto mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-64 mx-auto"></div>
              </div>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-12 px-6">
              <Car className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                {vehicles.length === 0 ? "Nenhum veículo registado" : "Nenhum veículo encontrado"}
              </h3>
              <p className="text-slate-500 mb-6">
                {vehicles.length === 0 
                  ? "Adicione o seu primeiro veículo para começar"
                  : "Tente ajustar os termos de pesquisa"
                }
              </p>
              {vehicles.length === 0 && (
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Veículo
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-semibold">Matrícula</TableHead>
                    <TableHead className="font-semibold">Marca</TableHead>
                    <TableHead className="font-semibold">Modelo</TableHead>
                    <TableHead className="font-semibold">Cor</TableHead>
                    <TableHead className="font-semibold">Registado</TableHead>
                    <TableHead className="text-center font-semibold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {vehicle.licensePlate}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {vehicle.make}
                      </TableCell>
                      <TableCell>
                        {vehicle.model}
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
                            onClick={() => setEditingVehicle(vehicle)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingVehicle(vehicle)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
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
          )}
        </CardContent>
      </Card>

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
    </div>
  )
}