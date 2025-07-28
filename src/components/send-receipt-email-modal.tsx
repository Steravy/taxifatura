"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/use-media-query"

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
})

type EmailFormData = z.infer<typeof emailSchema>

interface SendReceiptEmailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  receiptId: string
}

export function SendReceiptEmailModal({ open, onOpenChange, receiptId }: SendReceiptEmailModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: EmailFormData) => {
    try {
      setIsSubmitting(true)
      
      // TODO: Implement actual email sending
      console.log("Sending receipt to email:", data.email, "for receipt:", receiptId)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Recibo enviado por email com sucesso!")
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao enviar email. Tente novamente.")
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="exemplo@email.com"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Enviar Recibo por Email
            </DialogTitle>
          </DialogHeader>
          <div className="px-1">
            <FormContent />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[96vh] flex flex-col">
        <div className="flex-shrink-0">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Enviar Recibo por Email
            </DrawerTitle>
          </DrawerHeader>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-safe">
          <div className="mx-auto w-full max-w-lg pb-8">
            <FormContent />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}