import { z } from "zod"

// Input schema for form validation (all strings from form inputs)
export const publicReceiptInputSchema = z.object({
  clientName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  
  origin: z
    .string()
    .min(2, "Origem deve ter pelo menos 2 caracteres")
    .max(200, "Origem muito longa")
    .trim(),
  
  destination: z
    .string()
    .min(2, "Destino deve ter pelo menos 2 caracteres")
    .max(200, "Destino muito longo")
    .trim(),
  
  distance: z
    .string()
    .optional(),
  
  amount: z
    .string()
    .min(1, "Valor é obrigatório"),
  
  tripDate: z
    .string()
    .min(1, "Data da viagem é obrigatória"),
  
  tripTime: z
    .string()
    .min(1, "Hora da viagem é obrigatória")
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Formato de hora inválido (HH:MM)"
    }),
  
  notes: z
    .string()
    .max(500, "Observações muito longas")
    .trim()
    .optional(),
  
  vehicleSlug: z
    .string()
    .min(1, "Slug do veículo é obrigatório"),

  emails: z
    .array(z.string().email("Formato de email inválido"))
    .min(1, "Pelo menos um email é obrigatório")
    .max(3, "Máximo de 3 emails permitidos")
})

// Processing schema for server-side handling (transforms and validates)
export const publicReceiptProcessingSchema = z.object({
  clientName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  
  origin: z
    .string()
    .min(2, "Origem deve ter pelo menos 2 caracteres")
    .max(200, "Origem muito longa")
    .trim(),
  
  destination: z
    .string()
    .min(2, "Destino deve ter pelo menos 2 caracteres")
    .max(200, "Destino muito longo")
    .trim(),
  
  distance: z
    .string()
    .optional()
    .transform(val => val && val.trim() !== "" ? parseFloat(val) : undefined)
    .refine(val => val === undefined || (val > 0 && val <= 1000), {
      message: "Distância deve estar entre 0.1 e 1000 km"
    }),
  
  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .transform(val => parseFloat(val))
    .refine(val => !isNaN(val) && val > 0, {
      message: "Valor deve ser maior que 0"
    })
    .refine(val => val <= 100000, {
      message: "Valor muito alto"
    }),
  
  tripDate: z
    .string()
    .min(1, "Data da viagem é obrigatória")
    .transform(val => new Date(val))
    .refine(val => !isNaN(val.getTime()), {
      message: "Data inválida"
    })
    .refine(val => {
      const today = new Date()
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      return val >= thirtyDaysAgo && val <= tomorrow
    }, {
      message: "Data deve estar entre 30 dias atrás e amanhã"
    }),
  
  tripTime: z
    .string()
    .min(1, "Hora da viagem é obrigatória")
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Formato de hora inválido (HH:MM)"
    }),
  
  notes: z
    .string()
    .max(500, "Observações muito longas")
    .trim()
    .optional(),
  
  vehicleSlug: z
    .string()
    .min(1, "Slug do veículo é obrigatório"),

  emails: z
    .array(z.string().email("Formato de email inválido"))
    .min(1, "Pelo menos um email é obrigatório")
    .max(3, "Máximo de 3 emails permitidos")
})

// Type definitions
export type PublicReceiptInput = z.infer<typeof publicReceiptInputSchema>
export type PublicReceiptData = z.infer<typeof publicReceiptProcessingSchema>