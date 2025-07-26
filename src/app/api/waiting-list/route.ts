import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@/generated/prisma"
import { z } from "zod"

const prisma = new PrismaClient()

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = emailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if email already exists
    const existingEmail = await prisma.waitingList.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email já foi registado" },
        { status: 200 }
      )
    }

    // Create new waiting list entry
    const waitingListEntry = await prisma.waitingList.create({
      data: { email }
    })

    return NextResponse.json(
      { message: "Email registado com sucesso!", id: waitingListEntry.id },
      { status: 201 }
    )

  } catch (error) {
    console.error("Error saving email to waiting list:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}