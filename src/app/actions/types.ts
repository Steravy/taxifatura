import { ReceiptStatus } from "@/generated/prisma";

export type SerializedReceipt = {
    id: string;
    clientName: string;
    origin: string;
    destination: string;
    distance: number | null;
    amount: string;
    status: ReceiptStatus // adjust based on your enum
    notes: string | null;
    tripDate: Date;
    tripTime: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: string;
    vehicleId: string;
};

export type SerializedVehicle = {
    id: string;
    licensePlate: string;
    make: string;
    model: string;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: string;
};
