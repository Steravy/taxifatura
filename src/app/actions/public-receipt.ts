"use server"

import { revalidatePath } from "next/cache"
import { VehicleService } from "@/lib/services/vehicle.service"
import { ReceiptService, type CreatePublicReceiptData } from "@/lib/services/receipt.service"
import { publicReceiptProcessingSchema, type PublicReceiptInput } from "@/lib/validators/receipt.schema"
import { SerializedReceipt, SerializedVehicle } from "./types"
import { serializeReceiptWithExtras } from "@/lib/utils"
import { sendReceiptEmail } from "@/lib/email/actions"

// Server action result types
type ActionResult<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string; message: string }

/**
 * Get vehicle data by slug for public pages
 */
export async function getVehicleBySlug(slug: string): Promise<ActionResult<{
  vehicle: SerializedVehicle & { user: { name: string; email: string } }
}>> {
  try {
    const vehicle = await VehicleService.findBySlug(slug)

    if (!vehicle) {
      return {
        success: false,
        error: "Vehicle not found",
        message: "Veículo não encontrado ou não disponível"
      }
    }

    return {
      success: true,
      data: {
        vehicle: {
          id: vehicle.id,
          licensePlate: vehicle.licensePlate,
          make: vehicle.make,
          model: vehicle.model,
          color: vehicle.color,
          slug: vehicle.slug,
          createdAt: vehicle.createdAt,
          updatedAt: vehicle.updatedAt,
          deletedAt: vehicle.deletedAt,
          userId: vehicle.userId,
          user: vehicle.user
        }
      },
      message: "Veículo carregado com sucesso"
    }
  } catch (error) {
    console.error("Error fetching vehicle by slug:", error)

    return {
      success: false,
      error: "Database error",
      message: "Erro ao carregar veículo"
    }
  }
}

/**
 * Create a public receipt from QR code form submission
 */
export async function createPublicReceipt(input: PublicReceiptInput): Promise<ActionResult<{ receiptId: string }>> {
  try {
    // Validate and transform the input data
    const validatedData = publicReceiptProcessingSchema.parse(input)

    // Find vehicle by slug
    const vehicle = await VehicleService.findBySlug(validatedData.vehicleSlug)
    if (!vehicle) {
      return {
        success: false,
        error: "Vehicle not found",
        message: "Veículo não encontrado ou não disponível"
      }
    }

    // Create receipt data structure
    const receiptData: CreatePublicReceiptData = {
      clientName: validatedData.clientName,
      origin: validatedData.origin,
      destination: validatedData.destination,
      distance: validatedData.distance,
      amount: validatedData.amount,
      tripDate: validatedData.tripDate,
      tripTime: validatedData.tripTime,
      notes: validatedData.notes,
      vehicleId: vehicle.id,
      userId: vehicle.userId,
    }

    // Create the receipt
    const receipt = await ReceiptService.createPublic(receiptData)

    // Save email recipients
    if (validatedData.emails && validatedData.emails.length > 0) {
      await ReceiptService.saveEmailRecipients(receipt.id, validatedData.emails)
    }

    // TODO: Send email notification to driver
    // TODO: Send confirmation email to client recipients

    try {

      const baseUrl = process.env.BETTER_AUTH_URL;
      const downloadLink = `${baseUrl}/receipt/${receipt.id}`;

      const vehicle = await VehicleService.findBySlug(validatedData.vehicleSlug);

      const vehicleData = vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : null;

      for (const email of validatedData.emails) {

        await sendReceiptEmail({
          username: receipt.clientName,
          downloadLink,
          trip: `${receipt.origin} - ${receipt.destination}`,
          receiptIssuerMail: email,
          vehicle: vehicleData
        })
      }

    } catch (error: unknown) {
      console.error("Error sending receipt email:", JSON.stringify(error, null, 2))
      // Handle email sending error (e.g., log it, notify admin, etc.)
    }

    // Revalidate dashboard for the vehicle owner
    revalidatePath("/dashboard")

    return {
      success: true,
      data: { receiptId: receipt.id },
      message: "Recibo criado com sucesso"
    }
  } catch (error) {
    console.error("Error creating public receipt:", error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        message: "Dados inválidos fornecidos"
      }
    }

    return {
      success: false,
      error: "Unknown error",
      message: "Erro ao criar recibo"
    }
  }
}

/**
 * Get receipt data for public success page
 */
export async function getPublicReceipt(receiptId: string): Promise<ActionResult<{
  receipt: SerializedReceipt & {
    vehicle: { licensePlate: string; make: string; model: string; color: string | null; slug: string }
    user: { name: string; email: string }
  }
}>> {
  try {
    const receipt = await ReceiptService.findByIdPublic(receiptId)

    if (!receipt) {
      return {
        success: false,
        error: "Receipt not found",
        message: "Recibo não encontrado"
      }
    }

    return {
      success: true,
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        receipt: serializeReceiptWithExtras(receipt as any)
      },
      message: "Recibo carregado com sucesso"
    }
  } catch (error) {
    console.error("Error fetching public receipt:", error)

    return {
      success: false,
      error: "Database error",
      message: "Erro ao carregar recibo"
    }
  }
}