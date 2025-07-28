"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, FileText, Car } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { invoiceInputSchema, type InvoiceInput } from "@/lib/validators/invoice.schema"
import { createInvoice } from "@/app/actions/invoice"
import { getVehicles } from "@/app/actions/vehicle"
import { SerializedReceipt, SerializedVehicle } from "@/app/actions/types"

interface InvoiceFormProps {
  onSuccess?: (receipt: SerializedReceipt) => void
  onCancel?: () => void
}

export function InvoiceForm({ onSuccess, onCancel }: InvoiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vehicles, setVehicles] = useState<SerializedVehicle[]>([])
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true)

  const form = useForm<InvoiceInput>({
    resolver: zodResolver(invoiceInputSchema),
    defaultValues: {
      clientName: "",
      origin: "",
      destination: "",
      distance: "",
      amount: "",
      vehicleId: "",
      notes: "",
    },
  })

  // Load vehicles on component mount
  useEffect(() => {
    async function loadVehicles() {
      try {
        const result = await getVehicles()
        if (result.success) {
          setVehicles(result.data)
          // Auto-select if only one vehicle
          if (result.data.length === 1) {
            form.setValue("vehicleId", result.data[0].id)
          }
        } else {
          toast.error("Erro ao carregar veículos")
        }
      } catch (error) {
        toast.error("Erro ao carregar veículos")
        console.error("Error loading vehicles:", error)
      } finally {
        setIsLoadingVehicles(false)
      }
    }

    loadVehicles()
  }, [form])

  async function onSubmit(data: InvoiceInput) {
    try {
      setIsSubmitting(true)

      // Validate that a vehicle is selected
      if (!data.vehicleId || vehicles.length === 0) {
        toast.error("Deve registar pelo menos um veículo antes de criar faturas")
        return
      }

      const result = await createInvoice(data)

      if (result.success) {
        toast.success(result.message)
        form.reset()
        // Reset vehicle selection to first one if available
        if (vehicles.length === 1) {
          form.setValue("vehicleId", vehicles[0].id)
        }
        onSuccess?.(result.data)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Erro inesperado ao criar fatura")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veículo</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isSubmitting || isLoadingVehicles}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        isLoadingVehicles 
                          ? "Carregando veículos..." 
                          : vehicles.length === 0 
                            ? "Nenhum veículo registado" 
                            : "Selecione um veículo"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          <div className="flex items-center space-x-2">
                            <Car className="w-4 h-4" />
                            <span>{vehicle.licensePlate} - {vehicle.make} {vehicle.model}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Maria Santos"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Aeroporto"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Hotel Pestana"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distância (km) - opcional</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="12.5"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="25.00"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: Cliente com bagagem extra"
                    className="resize-none"
                    rows={3}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 pb-safe">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Criar Fatura
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}