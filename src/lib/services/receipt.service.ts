import { Receipt, ReceiptStatus } from "../../../generated/prisma"
import { db } from "../db"


export interface CreateReceiptData {
  clientName: string
  origin: string
  destination: string
  distance?: number
  amount: number
  vehicleId: string
  notes?: string
  userId: string
}

export interface CreatePublicReceiptData {
  clientName: string
  origin: string
  destination: string
  distance?: number
  amount: number
  tripDate: Date
  tripTime: string
  notes?: string
  vehicleId: string
  userId: string
}

export interface ReceiptFilters {
  userId: string
  status?: ReceiptStatus
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface ReceiptStats {
  totalAmount: number
  tripCount: number
  totalDistance: number
}

export class ReceiptService {

  /**
   * Create a new receipt
   */
  static async create(data: CreateReceiptData): Promise<Receipt> {
    const now = new Date()

    return db.receipt.create({
      data: {
        clientName: data.clientName,
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        amount: data.amount,
        vehicleId: data.vehicleId,
        notes: data.notes,
        userId: data.userId,
        tripDate: now,
        tripTime: now.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
        status: "COMPLETED",
      },
    })
  }

  /**
   * Create a public receipt (from QR code form submission)
   */
  static async createPublic(data: CreatePublicReceiptData): Promise<Receipt> {
    return db.receipt.create({
      data: {
        clientName: data.clientName,
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        amount: data.amount,
        vehicleId: data.vehicleId,
        notes: data.notes,
        userId: data.userId,
        tripDate: data.tripDate,
        tripTime: data.tripTime,
        status: "PENDING", // Public receipts start as pending for driver review
      },
      include: {
        vehicle: {
          select: {
            licensePlate: true,
            make: true,
            model: true,
            color: true,
            slug: true,
          }
        },
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
   * Get receipts with filters and pagination
   */
  static async findMany(filters: ReceiptFilters, page = 1, limit = 50): Promise<Receipt[]> {
    const skip = (page - 1) * limit

    return db.receipt.findMany({
      where: {
        userId: filters.userId,
        deletedAt: null, // Soft delete filter
        status: filters.status,
        tripDate: {
          gte: filters.dateFrom,
          lte: filters.dateTo,
        },
        OR: filters.search ? [
          { clientName: { contains: filters.search, mode: "insensitive" } },
          { origin: { contains: filters.search, mode: "insensitive" } },
          { destination: { contains: filters.search, mode: "insensitive" } },
          { vehicle: { licensePlate: { contains: filters.search, mode: "insensitive" } } },
          { vehicle: { make: { contains: filters.search, mode: "insensitive" } } },
          { vehicle: { model: { contains: filters.search, mode: "insensitive" } } },
        ] : undefined,
      },
      include: {
        vehicle: {
          select: {
            id: true,
            licensePlate: true,
            make: true,
            model: true,
            color: true,
          }
        }
      },
      orderBy: {
        tripDate: "desc",
      },
      skip,
      take: limit,
    })
  }

  /**
   * Get receipt by ID
   */
  static async findById(id: string, userId: string): Promise<Receipt | null> {
    return db.receipt.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        vehicle: {
          select: {
            id: true,
            licensePlate: true,
            make: true,
            model: true,
            color: true,
          }
        }
      }
    })
  }

  /**
   * Get receipt by ID for public access (no user ID required)
   */
  static async findByIdPublic(id: string) {
    return db.receipt.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        vehicle: {
          select: {
            id: true,
            licensePlate: true,
            make: true,
            model: true,
            color: true,
            slug: true,
          }
        }
      }
    })
  }

  /**
   * Update receipt
   */
  static async update(id: string, userId: string, data: Partial<CreateReceiptData>): Promise<Receipt | null> {
    // Verify ownership
    const receipt = await this.findById(id, userId)
    if (!receipt) return null

    return db.receipt.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
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
   * Update receipt status
   */
  static async updateStatus(id: string, userId: string, status: ReceiptStatus): Promise<Receipt | null> {
    // Verify ownership
    const receipt = await this.findById(id, userId)
    if (!receipt) return null

    return db.receipt.update({
      where: { id },
      data: {
        status: status,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        vehicle: {
          select: {
            id: true,
            licensePlate: true,
            make: true,
            model: true,
            color: true,
          }
        }
      }
    })
  }

  /**
   * Soft delete receipt
   */
  static async softDelete(id: string, userId: string): Promise<boolean> {
    try {
      // Verify ownership
      const receipt = await this.findById(id, userId)
      if (!receipt) return false

      await db.receipt.update({
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
   * Get today's stats for a user
   */
  static async getTodayStats(userId: string): Promise<ReceiptStats> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const result = await db.receipt.aggregate({
      where: {
        userId,
        deletedAt: null,
        status: "COMPLETED",
        tripDate: {
          gte: today,
          lt: tomorrow,
        },
      },
      _sum: {
        amount: true,
        distance: true,
      },
      _count: {
        id: true,
      },
    })

    return {
      totalAmount: Number(result._sum.amount || 0),
      tripCount: result._count.id,
      totalDistance: Number(result._sum.distance || 0),
    }
  }

  /**
   * Get week stats for a user
   */
  static async getWeekStats(userId: string): Promise<ReceiptStats> {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    const result = await db.receipt.aggregate({
      where: {
        userId,
        deletedAt: null,
        status: "COMPLETED",
        tripDate: {
          gte: weekAgo,
          lte: today,
        },
      },
      _sum: {
        amount: true,
        distance: true,
      },
      _count: {
        id: true,
      },
    })

    return {
      totalAmount: Number(result._sum.amount || 0),
      tripCount: result._count.id,
      totalDistance: Number(result._sum.distance || 0),
    }
  }

  /**
   * Get total count for pagination
   */
  static async count(filters: ReceiptFilters): Promise<number> {
    return db.receipt.count({
      where: {
        userId: filters.userId,
        deletedAt: null,
        status: filters.status,
        tripDate: {
          gte: filters.dateFrom,
          lte: filters.dateTo,
        },
        OR: filters.search ? [
          { clientName: { contains: filters.search, mode: "insensitive" } },
          { origin: { contains: filters.search, mode: "insensitive" } },
          { destination: { contains: filters.search, mode: "insensitive" } },
        ] : undefined,
      },
    })
  }

  /**
   * Save email recipients for a receipt
   */
  static async saveEmailRecipients(receiptId: string, emails: string[]): Promise<void> {
    try {
      // Create receipt recipients for each email
      const recipients = emails.map(email => ({
        receiptId,
        email: email.toLowerCase().trim(),
      }))

      await db.receiptRecipient.createMany({
        data: recipients,
        skipDuplicates: true, // Prevent duplicate emails for same receipt
      })
    } catch (error) {
      console.error("Error saving email recipients:", error)
      throw error
    }
  }
}

// Export singleton instance
export const receiptService = ReceiptService