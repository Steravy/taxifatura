import { SerializedReceipt } from "@/app/actions/types";
import { BetterAuthErrorCode } from "@/components/auth/schemas";
import { Receipt } from "@/generated/prisma";
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

export function serializeReceipt(receipt: Receipt): SerializedReceipt {
  return {
    ...receipt,
    amount: receipt.amount.toString(), // convert Decimal to string
  }
}