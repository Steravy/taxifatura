import { z } from "zod"

// Input schema - what the form sends (all strings)
export const vehicleInputSchema = z.object({
  licensePlate: z
    .string()
    .min(6, "Matrícula deve ter pelo menos 6 caracteres")
    .max(10, "Matrícula muito longa")
    .trim()
    .transform(s => s.toUpperCase()),
  
  make: z
    .string()
    .min(2, "Marca deve ter pelo menos 2 caracteres")
    .max(50, "Marca muito longa")
    .trim(),
  
  model: z
    .string()
    .min(2, "Modelo deve ter pelo menos 2 caracteres")
    .max(100, "Modelo muito longo")
    .trim(),
  
  color: z
    .string()
    .optional()
})

// Processing schema - transforms and validates the input
export const vehicleProcessingSchema = vehicleInputSchema.transform((data) => ({
  licensePlate: data.licensePlate,
  make: data.make,
  model: data.model,
  color: data.color?.trim() || undefined
})).refine((data) => {
  // Cape Verde license plate format validation - ST-71-EU format
  const plateRegex = /^[A-Z]{2}-\d{2}-[A-Z]{2}$/
  return plateRegex.test(data.licensePlate)
}, {
  message: "Formato de matrícula inválido (ex: ST-71-EU)",
  path: ["licensePlate"]
}).refine((data) => {
  return data.color === undefined || data.color.length >= 3
}, {
  message: "Cor deve ter pelo menos 3 caracteres",
  path: ["color"]
})

// Alternative Cape Verde formats (commented out for now)
// .refine((data) => {
//   const altRegex = /^[A-Z]{2}\d{2}[A-Z]{2}$|^[A-Z]\d{3}[A-Z]{2}$|^[A-Z]{3}\d{3}$/
//   return altRegex.test(data.licensePlate)
// }, {
//   message: "Formato alternativo inválido",
//   path: ["licensePlate"]
// })

// Type definitions
export type VehicleInput = z.infer<typeof vehicleInputSchema>
export type VehicleData = z.infer<typeof vehicleProcessingSchema>