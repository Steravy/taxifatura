"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Car } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { vehicleInputSchema, type VehicleInput } from "@/lib/validators/vehicle.schema"
import { createVehicle } from "@/app/actions/vehicle"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleFormProps {
  onSuccess?: (vehicle: SerializedVehicle) => void
  onCancel?: () => void
}

export function VehicleForm({ onSuccess, onCancel }: VehicleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<VehicleInput>({
    resolver: zodResolver(vehicleInputSchema),
    defaultValues: {
      licensePlate: "",
      make: "",
      model: "",
      color: "",
    },
  })

  async function onSubmit(data: VehicleInput) {
    try {
      setIsSubmitting(true)

      const result = await createVehicle(data)

      if (result.success) {
        toast.success(result.message)
        form.reset()
        onSuccess?.(result.data)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Erro inesperado ao registar veículo")
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
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrícula</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: ST-71-EU"
                    {...field}
                    disabled={isSubmitting}
                    style={{ textTransform: "uppercase" }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Toyota"
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
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Corolla 2020"
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
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor (opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Branco"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
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
                Registando...
              </>
            ) : (
              <>
                <Car className="w-4 h-4 mr-2" />
                Registar Veículo
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}