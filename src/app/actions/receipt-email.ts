"use server"

import { revalidatePath } from "next/cache"
import { ReceiptService } from "@/lib/services/receipt.service"
import { sendReceiptEmail } from "@/lib/email/actions"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// Server action result types
type ActionResult<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string; message: string }

/**
 * Send receipt email to specified recipients
 */
export async function sendReceiptEmailAction(receiptId: string, emails: string[]): Promise<ActionResult<{ sent: number }>> {
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

    // Validate input
    if (!receiptId || !emails || emails.length === 0) {
      return {
        success: false,
        error: "Invalid input",
        message: "ID do recibo e emails são obrigatórios"
      }
    }

    if (emails.length > 3) {
      return {
        success: false,
        error: "Too many emails",
        message: "Máximo 3 emails permitidos"
      }
    }

    // Get receipt data
    const receipt = await ReceiptService.findByIdWithDetails(receiptId, session.user.id)
    if (!receipt) {
      return {
        success: false,
        error: "Receipt not found",
        message: "Recibo não encontrado ou você não tem permissão para acessá-lo"
      }
    }

    // Send emails
    const baseUrl = process.env.BETTER_AUTH_URL
    const downloadLink = `${baseUrl}/receipt/${receipt.id}`

    const vehicleData = receipt.vehicle
      ? `${receipt.vehicle.make} ${receipt.vehicle.model} (${receipt.vehicle.licensePlate})`
      : null

    let sentCount = 0
    const errors: string[] = []

    for (const email of emails) {
      try {
        await sendReceiptEmail({
          username: receipt.clientName,
          downloadLink,
          trip: `${receipt.origin} - ${receipt.destination}`,
          receiptIssuerMail: email,
          vehicle: vehicleData
        })
        sentCount++
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error)
        errors.push(`Erro ao enviar para ${email}`)
      }
    }

    // Save email recipients to database for record keeping
    try {
      await ReceiptService.saveEmailRecipients(receiptId, emails)
    } catch (error) {
      console.error("Error saving email recipients:", error)
      // Don't fail the entire operation for this
    }

    // Revalidate dashboard
    revalidatePath("/dashboard")

    if (sentCount === emails.length) {
      return {
        success: true,
        data: { sent: sentCount },
        message: `Recibo enviado com sucesso para ${sentCount} ${sentCount === 1 ? 'email' : 'emails'}`
      }
    } else if (sentCount > 0) {
      return {
        success: true,
        data: { sent: sentCount },
        message: `Recibo enviado para ${sentCount} de ${emails.length} emails. Alguns emails falharam.`
      }
    } else {
      return {
        success: false,
        error: "Email sending failed",
        message: "Falha ao enviar emails. Tente novamente."
      }
    }

  } catch (error) {
    console.error("Error in sendReceiptEmailAction:", error)

    return {
      success: false,
      error: "Server error",
      message: "Erro interno do servidor. Tente novamente."
    }
  }
}