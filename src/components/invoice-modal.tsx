"use client"

import React from "react"
import { FileText } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { InvoiceForm } from "@/components/forms/invoice-form"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { Receipt } from "@/generated/prisma"

interface InvoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (receipt: Receipt) => void
}

export function InvoiceModal({ open, onOpenChange, onSuccess }: InvoiceModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  const handleSuccess = (receipt: Receipt) => {
    onSuccess?.(receipt)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Nova Fatura
            </DialogTitle>
          </DialogHeader>
          <div className="px-1">
            <InvoiceForm onSuccess={handleSuccess} onCancel={handleCancel} />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Nova Fatura
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8">
            <InvoiceForm onSuccess={handleSuccess} onCancel={handleCancel} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}