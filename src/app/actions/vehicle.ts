"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { vehicleProcessingSchema, type VehicleInput } from "@/lib/validators/vehicle.schema"
import { vehicleService, type CreateVehicleData } from "@/lib/services/vehicle.service"
import { headers } from "next/headers"
import { serializeVehicle } from "@/lib/utils"
import { SerializedVehicle } from "./types"

// Server action result types
type ActionResult<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string; message: string }

export async function createVehicle(input: VehicleInput): Promise<ActionResult<SerializedVehicle>> {
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

    // Validate and transform the input data
    const validatedData = vehicleProcessingSchema.parse(input)

    // Check if license plate already exists for this user
    const existsAlready = await vehicleService.existsByLicensePlate(
      validatedData.licensePlate, 
      session.user.id
    )

    if (existsAlready) {
      return {
        success: false,
        error: "License plate already exists",
        message: "Esta matrícula já está registada"
      }
    }

    // Create vehicle data structure
    const vehicleData: CreateVehicleData = {
      licensePlate: validatedData.licensePlate,
      make: validatedData.make,
      model: validatedData.model,
      color: validatedData.color,
      userId: session.user.id,
    }

    // Save to database
    const vehicle = await vehicleService.create(vehicleData)

    // Revalidate the dashboard page to reflect changes
    revalidatePath("/dashboard")

    return {
      success: true,
      data: serializeVehicle(vehicle),
      message: "Veículo registado com sucesso"
    }
  } catch (error) {
    console.error("Error creating vehicle:", error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        message: "Erro ao registar veículo"
      }
    }

    return {
      success: false,
      error: "Erro desconhecido",
      message: "Erro ao registar veículo"
    }
  }
}

export async function getVehicles(search?: string): Promise<ActionResult<SerializedVehicle[]>> {
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

    // Fetch vehicles from database
    const vehicles = await vehicleService.findMany({
      userId: session.user.id,
      search,
    })

    return {
      success: true,
      data: vehicles.map(v => serializeVehicle(v)),
      message: "Veículos carregados com sucesso"
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error)

    return {
      success: false,
      error: "Erro ao carregar veículos",
      message: "Erro ao carregar veículos"
    }
  }
}

export async function updateVehicle(id: string, input: VehicleInput): Promise<ActionResult<SerializedVehicle>> {
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

    // Validate and transform the input data
    const validatedData = vehicleProcessingSchema.parse(input)

    // Check if license plate already exists for this user (excluding current vehicle)
    const existsAlready = await vehicleService.existsByLicensePlate(
      validatedData.licensePlate, 
      session.user.id,
      id
    )

    if (existsAlready) {
      return {
        success: false,
        error: "License plate already exists",
        message: "Esta matrícula já está registada"
      }
    }

    // Update vehicle
    const vehicle = await vehicleService.update(id, session.user.id, {
      licensePlate: validatedData.licensePlate,
      make: validatedData.make,
      model: validatedData.model,
      color: validatedData.color,
    })

    if (!vehicle) {
      return {
        success: false,
        error: "Vehicle not found",
        message: "Veículo não encontrado"
      }
    }

    // Revalidate the dashboard page to reflect changes
    revalidatePath("/dashboard")

    return {
      success: true,
      data: serializeVehicle(vehicle),
      message: "Veículo atualizado com sucesso"
    }
  } catch (error) {
    console.error("Error updating vehicle:", error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        message: "Erro ao atualizar veículo"
      }
    }

    return {
      success: false,
      error: "Erro desconhecido",
      message: "Erro ao atualizar veículo"
    }
  }
}

export async function deleteVehicle(id: string): Promise<ActionResult<boolean>> {
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

    // Soft delete vehicle
    const success = await vehicleService.softDelete(id, session.user.id)

    if (!success) {
      return {
        success: false,
        error: "Vehicle not found or has receipts",
        message: "Veículo não encontrado ou tem recibos associados"
      }
    }

    // Revalidate the dashboard page to reflect changes
    revalidatePath("/dashboard")

    return {
      success: true,
      data: true,
      message: "Veículo eliminado com sucesso"
    }
  } catch (error) {
    console.error("Error deleting vehicle:", error)

    return {
      success: false,
      error: "Erro ao eliminar veículo",
      message: "Erro ao eliminar veículo"
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getVehicleStats(): Promise<ActionResult<{totalVehicles: number, mostUsedVehicle: any}>> {
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

    // Get vehicle stats
    const stats = await vehicleService.getVehicleStats(session.user.id)

    return {
      success: true,
      data: stats,
      message: "Estatísticas carregadas com sucesso"
    }
  } catch (error) {
    console.error("Error fetching vehicle stats:", error)

    return {
      success: false,
      error: "Erro ao carregar estatísticas",
      message: "Erro ao carregar estatísticas"
    }
  }
}