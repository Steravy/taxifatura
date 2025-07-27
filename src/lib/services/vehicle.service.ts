import { PrismaClient, type Vehicle } from "@/generated/prisma"

// Initialize Prisma client (will be singleton in production)
const prisma = new PrismaClient()

export interface CreateVehicleData {
  licensePlate: string
  make: string
  model: string
  color?: string
  userId: string
}

export interface VehicleFilters {
  userId: string
  search?: string
}

export class VehicleService {
  
  /**
   * Create a new vehicle
   */
  static async create(data: CreateVehicleData): Promise<Vehicle> {
    return prisma.vehicle.create({
      data: {
        licensePlate: data.licensePlate,
        make: data.make,
        model: data.model,
        color: data.color,
        userId: data.userId,
      },
    })
  }

  /**
   * Get vehicles with filters
   */
  static async findMany(filters: VehicleFilters): Promise<Vehicle[]> {
    return prisma.vehicle.findMany({
      where: {
        userId: filters.userId,
        deletedAt: null, // Soft delete filter
        OR: filters.search ? [
          { licensePlate: { contains: filters.search, mode: "insensitive" } },
          { make: { contains: filters.search, mode: "insensitive" } },
          { model: { contains: filters.search, mode: "insensitive" } },
          { color: { contains: filters.search, mode: "insensitive" } },
        ] : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  /**
   * Get vehicle by ID
   */
  static async findById(id: string, userId: string): Promise<Vehicle | null> {
    return prisma.vehicle.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    })
  }

  /**
   * Update vehicle
   */
  static async update(id: string, userId: string, data: Partial<CreateVehicleData>): Promise<Vehicle | null> {
    // Verify ownership
    const vehicle = await this.findById(id, userId)
    if (!vehicle) return null

    return prisma.vehicle.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  /**
   * Soft delete vehicle
   */
  static async softDelete(id: string, userId: string): Promise<boolean> {
    try {
      // Verify ownership
      const vehicle = await this.findById(id, userId)
      if (!vehicle) return false

      // Check if vehicle has receipts
      const receiptCount = await prisma.receipt.count({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
      })

      if (receiptCount > 0) {
        throw new Error("Não é possível eliminar veículo com recibos associados")
      }

      await prisma.vehicle.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          updatedAt: new Date(),
        },
      })
      
      return true
    } catch {
      return false
    }
  }

  /**
   * Check if license plate exists for user
   */
  static async existsByLicensePlate(licensePlate: string, userId: string, excludeId?: string): Promise<boolean> {
    const count = await prisma.vehicle.count({
      where: {
        licensePlate,
        userId,
        deletedAt: null,
        id: excludeId ? { not: excludeId } : undefined,
      },
    })
    return count > 0
  }

  /**
   * Get total count for pagination
   */
  static async count(filters: VehicleFilters): Promise<number> {
    return prisma.vehicle.count({
      where: {
        userId: filters.userId,
        deletedAt: null,
        OR: filters.search ? [
          { licensePlate: { contains: filters.search, mode: "insensitive" } },
          { make: { contains: filters.search, mode: "insensitive" } },
          { model: { contains: filters.search, mode: "insensitive" } },
          { color: { contains: filters.search, mode: "insensitive" } },
        ] : undefined,
      },
    })
  }
}

// Export singleton instance
export const vehicleService = VehicleService