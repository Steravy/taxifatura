import { generateVehicleSlug } from "@/lib/vehicle-utils"
import { db } from "../db"
import { Vehicle } from "../../../generated/prisma"


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
    // Generate unique slug for QR code URLs
    const slug = generateVehicleSlug(data.licensePlate)

    return db.vehicle.create({
      data: {
        licensePlate: data.licensePlate,
        make: data.make,
        model: data.model,
        color: data.color,
        slug: slug,
        userId: data.userId,
      },
    })
  }

  /**
   * Get vehicles with filters
   */
  static async findMany(filters: VehicleFilters): Promise<Vehicle[]> {
    return db.vehicle.findMany({
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
    return db.vehicle.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    })
  }

  /**
   * Get vehicle by slug (for public QR code pages)
   */
  static async findBySlug(slug: string): Promise<(Vehicle & { user: { name: string; email: string } }) | null> {
    return db.vehicle.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    })
  }

  /**
   * Update vehicle
   */
  static async update(id: string, userId: string, data: Partial<CreateVehicleData>): Promise<Vehicle | null> {
    // Verify ownership
    const vehicle = await this.findById(id, userId)
    if (!vehicle) return null

    return db.vehicle.update({
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
      const receiptCount = await db.receipt.count({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
      })

      if (receiptCount > 0) {
        throw new Error("Não é possível eliminar veículo com recibos associados")
      }

      await db.vehicle.update({
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
    const count = await db.vehicle.count({
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
    return db.vehicle.count({
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

  /**
   * Get vehicle stats for dashboard
   */
  static async getVehicleStats(userId: string) {
    const [vehicleCount, mostUsedVehicle] = await Promise.all([
      // Total vehicle count
      db.vehicle.count({
        where: {
          userId,
          deletedAt: null,
        },
      }),

      // Most used vehicle (by receipt count)
      db.vehicle.findFirst({
        where: {
          userId,
          deletedAt: null,
        },
        include: {
          _count: {
            select: {
              receipts: {
                where: {
                  deletedAt: null,
                }
              }
            }
          }
        },
        orderBy: {
          receipts: {
            _count: 'desc'
          }
        }
      })
    ])

    return {
      totalVehicles: vehicleCount,
      mostUsedVehicle: mostUsedVehicle ? {
        ...mostUsedVehicle,
        receiptCount: mostUsedVehicle._count.receipts
      } : null
    }
  }
}

// Export singleton instance
export const vehicleService = VehicleService