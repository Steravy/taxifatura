"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { invoiceProcessingSchema, type InvoiceInput } from "@/lib/validators/invoice.schema"
import { receiptService, type CreateReceiptData } from "@/lib/services/receipt.service"
import { headers } from "next/headers"
import { serializeReceipt } from "@/lib/utils"
import { SerializedReceipt } from "./types"

// Server action result types
type ActionResult<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string; message: string }

export async function createInvoice(input: InvoiceInput): Promise<ActionResult<SerializedReceipt>> {
  try {

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
        message: "Sessão expirada. Faça login novamente."
      }
    }

    console.log(JSON.stringify(session, null, 2))

    // Validate and transform the input data
    const validatedData = invoiceProcessingSchema.parse(input)

    // Create receipt data structure
    const receiptData: CreateReceiptData = {
      clientName: validatedData.clientName,
      origin: validatedData.origin,
      destination: validatedData.destination,
      distance: validatedData.distance,
      amount: validatedData.amount,
      vehicleId: validatedData.vehicleId,
      notes: validatedData.notes,
      userId: session.user.id,
    }

    // Save to database
    const receipt = await receiptService.create(receiptData)

    // Revalidate the dashboard page to reflect changes
    revalidatePath("/dashboard")

    return {
      success: true,
      data: serializeReceipt(receipt as any), // eslint-disable-line @typescript-eslint/no-explicit-any
      message: "Fatura criada com sucesso"
    }
  } catch (error) {
    console.error("Error creating invoice:", error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        message: "Erro ao criar fatura"
      }
    }

    return {
      success: false,
      error: "Erro desconhecido",
      message: "Erro ao criar fatura"
    }
  }
}

export async function getReceipts(page = 1, search?: string): Promise<ActionResult<SerializedReceipt[]>> {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
        message: "Sessão expirada. Faça login novamente."
      }
    }

    // Fetch receipts from database
    const receipts = await receiptService.findMany({
      userId: session.user.id,
      search,
    }, page, 50)

    return {
      success: true,
      data: receipts.map(r => serializeReceipt(r as any)), // eslint-disable-line @typescript-eslint/no-explicit-any
      message: "Recibos carregados com sucesso"
    }
  } catch (error) {
    console.error("Error fetching receipts:", error)

    return {
      success: false,
      error: "Erro ao carregar recibos",
      message: "Erro ao carregar recibos"
    }
  }
}

export async function getStats(): Promise<ActionResult<{ today: { totalAmount: number; tripCount: number; totalDistance: number }; week: { totalAmount: number; tripCount: number; totalDistance: number } }>> {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
        message: "Sessão expirada. Faça login novamente."
      }
    }

    // Fetch stats from database
    const [todayStats, weekStats] = await Promise.all([
      receiptService.getTodayStats(session.user.id),
      receiptService.getWeekStats(session.user.id),
    ])

    return {
      success: true,
      data: { today: todayStats, week: weekStats },
      message: "Estatísticas carregadas com sucesso"
    }
  } catch (error) {
    console.error("Error fetching stats:", error)

    return {
      success: false,
      error: "Erro ao carregar estatísticas",
      message: "Erro ao carregar estatísticas"
    }
  }
}

export async function markReceiptCompleted(receiptId: string): Promise<ActionResult<SerializedReceipt>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
        message: "Sessão expirada. Faça login novamente."
      }
    }

    // Update receipt status to COMPLETED
    const updatedReceipt = await receiptService.updateStatus(receiptId, session.user.id, "COMPLETED")

    if (!updatedReceipt) {
      return {
        success: false,
        error: "Receipt not found",
        message: "Recibo não encontrado ou não autorizado"
      }
    }

    // Revalidate the dashboard page to reflect changes
    revalidatePath("/dashboard")

    return {
      success: true,
      data: serializeReceipt(updatedReceipt as any), // eslint-disable-line @typescript-eslint/no-explicit-any
      message: "Recibo marcado como concluído"
    }
  } catch (error) {
    console.error("Error marking receipt as completed:", error)

    return {
      success: false,
      error: "Erro ao atualizar recibo",
      message: "Erro ao marcar recibo como concluído"
    }
  }
}