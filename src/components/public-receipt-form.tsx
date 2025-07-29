"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Receipt, Loader2, Mail } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { EmailRecipientsInput } from "@/components/email-recipients-input"
import { publicReceiptInputSchema, type PublicReceiptInput } from "@/lib/validators/receipt.schema"
import { createPublicReceipt } from "@/app/actions/public-receipt"

interface PublicReceiptFormProps {
  vehicleSlug: string
}

export function PublicReceiptForm({ vehicleSlug }: PublicReceiptFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<PublicReceiptInput>({
    resolver: zodResolver(publicReceiptInputSchema),
    defaultValues: {
      clientName: "",
      origin: "",
      destination: "",
      distance: "",
      amount: "",
      notes: "",
      tripDate: new Date().toISOString().split('T')[0],
      tripTime: new Date().toTimeString().slice(0, 5),
      vehicleSlug: vehicleSlug,
      emails: [],
    },
  })

  const onSubmit = (data: PublicReceiptInput) => {
    startTransition(async () => {
      try {
        const result = await createPublicReceipt(data)

        if (result.success) {
          toast.success(result.message)
          router.push(`/v/${vehicleSlug}/receipt-success/${result.data.receiptId}`)
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error("Error submitting receipt:", error)
        toast.error("Erro ao submeter o recibo. Tente novamente.")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Client Information */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o seu nome completo"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Trip Details */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Detalhes da Viagem
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origem *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Local de partida"
                      {...field}
                      disabled={isPending}
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
                  <FormLabel>Destino *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Local de chegada"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distância (km)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tripDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da Viagem *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      disabled
                      className="bg-slate-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tripTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora da Viagem *</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      disabled
                      className="bg-slate-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Payment */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Corrida (CVE) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informações adicionais sobre a viagem (opcional)"
                    rows={3}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Email Recipients */}
        <FormField
          control={form.control}
          name="emails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Receber Recibo por Email
              </FormLabel>
              <FormControl>
                <EmailRecipientsInput
                  emails={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                  maxEmails={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              A processar...
            </>
          ) : (
            <>
              <Receipt className="w-4 h-4 mr-2" />
              Solicitar Recibo
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}