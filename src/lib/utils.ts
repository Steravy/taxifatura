import { SerializedReceipt, SerializedVehicle } from "@/app/actions/types";
import { BetterAuthErrorCode } from "@/components/auth/schemas";
import { Receipt, Vehicle } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthErrorMessage = (error: Record<string, string>): string => {
  switch (error.code) {
    case BetterAuthErrorCode.USER_ALREADY_EXISTS:
      return 'O utilizador já existe.';
    case BetterAuthErrorCode.INVALID_EMAIL_OR_PASSWORD:
      return 'Email ou palavra-passe inválido.'
    case BetterAuthErrorCode.EMAIL_NOT_VERIFIED:
      return 'Verifique seu e-mail antes de entrar.'
    default:
      return error.message ?? 'Ocorreu um erro. Tente novamente.';
  }
};

export function serializeReceipt(receipt: any): SerializedReceipt {
  return {
    ...receipt,
    amount: receipt.amount.toString(), // convert Decimal to string
    vehicle: receipt.vehicle ? {
      id: receipt.vehicle.id,
      licensePlate: receipt.vehicle.licensePlate,
      make: receipt.vehicle.make,
      model: receipt.vehicle.model,
      color: receipt.vehicle.color,
    } : undefined,
  }
}

export function serializeReceiptWithExtras(receipt: any): SerializedReceipt & {
  vehicle: { id: string; licensePlate: string; make: string; model: string; color: string | null; slug: string }
  user: { name: string; email: string }
} {
  return {
    ...receipt,
    amount: receipt.amount.toString(), // convert Decimal to string
    vehicle: receipt.vehicle!,
    user: receipt.user!,
  }
}

export function serializeVehicle(vehicle: Vehicle): SerializedVehicle {
  return {
    ...vehicle,
  }
}