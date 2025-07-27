import { z } from "zod"

// Input schema - what the form sends (all strings)
export const invoiceInputSchema = z.object({
  clientName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  
  origin: z
    .string()
    .min(2, "Origem deve ter pelo menos 2 caracteres")
    .max(100, "Local muito longo")
    .trim(),
  
  destination: z
    .string()
    .min(2, "Destino deve ter pelo menos 2 caracteres")
    .max(100, "Local muito longo")
    .trim(),
  
  distance: z
    .string()
    .optional(),
  
  amount: z
    .string()
    .min(1, "Valor é obrigatório"),
  
  vehicleId: z
    .string()
    .min(1, "Veículo é obrigatório"),
  
  notes: z
    .string()
    .optional()
})

// Processing schema - transforms and validates the input
export const invoiceProcessingSchema = invoiceInputSchema.transform((data) => ({
  clientName: data.clientName,
  origin: data.origin,
  destination: data.destination,
  distance: (() => {
    if (!data.distance || data.distance.trim() === "") return undefined
    const parsed = parseFloat(data.distance)
    return isNaN(parsed) ? undefined : parsed
  })(),
  amount: (() => {
    const parsed = parseFloat(data.amount)
    if (isNaN(parsed)) throw new Error("Valor inválido")
    return parsed
  })(),
  vehicleId: data.vehicleId,
  notes: data.notes?.trim() || undefined
})).refine((data) => {
  return data.distance === undefined || data.distance > 0
}, {
  message: "Distância deve ser um número positivo",
  path: ["distance"]
}).refine((data) => {
  return data.distance === undefined || data.distance <= 1000
}, {
  message: "Distância muito elevada",
  path: ["distance"]
}).refine((data) => {
  return data.amount > 0
}, {
  message: "Valor deve ser positivo",
  path: ["amount"]
}).refine((data) => {
  return data.amount <= 10000
}, {
  message: "Valor muito elevado",
  path: ["amount"]
})

// Type definitions
export type InvoiceInput = z.infer<typeof invoiceInputSchema>
export type InvoiceData = z.infer<typeof invoiceProcessingSchema>