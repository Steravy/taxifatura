"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
import { EmailRecipientsInput } from "@/components/email-recipients-input"
import { useMediaQuery } from "@/hooks/use-media-query"
import { sendReceiptEmailAction } from "@/app/actions/receipt-email"

const sendEmailSchema = z.object({
  emails: z.array(z.string().email("Email inválido")).min(1, "Pelo menos um email é obrigatório").max(3, "Máximo 3 emails permitidos"),
})

type SendEmailFormData = z.infer<typeof sendEmailSchema>

interface SendReceiptEmailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  receiptId: string | null
}

export function SendReceiptEmailSheet({ open, onOpenChange, receiptId }: SendReceiptEmailSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const form = useForm<SendEmailFormData>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      emails: [],
    },
  })

  const onSubmit = async (data: SendEmailFormData) => {
    if (!receiptId) return

    try {
      setIsSubmitting(true)

      const result = await sendReceiptEmailAction(receiptId, data.emails)

      if (result.success) {
        toast.success(result.message)
        form.reset()
        onOpenChange(false)
      } else {
        toast.error(result.message)
      }
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

  const FormFields = () => (
    <FormField
      control={form.control}
      name="emails"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Emails dos destinatários</FormLabel>
          <FormControl>
            <EmailRecipientsInput
              emails={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              maxEmails={3}
              showDisclaimer={false}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const ActionButtons = () => (
    <div className="flex flex-col-reverse sm:flex-row gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={isSubmitting}
        className="flex-1"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting || form.watch("emails").length === 0}
        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Enviar Email
          </>
        )}
      </Button>
    </div>
  )

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Enviar Recibo por Email
            </SheetTitle>
            <SheetDescription>
              Adicione até 3 emails para enviar o recibo do cliente.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
              <div className="space-y-4">
                <FormFields />
              </div>

              <SheetFooter>
                <ActionButtons />
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Enviar Recibo por Email
          </DrawerTitle>
          <DrawerDescription className="text-center">
            Adicione até 3 emails para enviar o recibo do cliente.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="px-4 space-y-4">
              <FormFields />
            </div>

            <DrawerFooter>
              <ActionButtons />
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}