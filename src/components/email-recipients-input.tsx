"use client"

import { useState } from "react"
import { X, Plus, Mail, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EmailRecipientsInputProps {
  emails: string[]
  onChange: (emails: string[]) => void
  disabled?: boolean
  maxEmails?: number,
  showDisclaimer?: boolean
}

export function EmailRecipientsInput({
  emails,
  onChange,
  disabled = false,
  maxEmails = 3,
  showDisclaimer = true
}: EmailRecipientsInputProps) {
  const [currentEmail, setCurrentEmail] = useState("")

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleAddEmail = () => {
    const email = currentEmail.trim().toLowerCase()

    if (!email) return
    if (!emailRegex.test(email)) return
    if (emails.includes(email)) return
    if (emails.length >= maxEmails) return

    onChange([...emails, email])
    setCurrentEmail("")
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    onChange(emails.filter(email => email !== emailToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddEmail()
    }
  }

  const canAddEmail = currentEmail.trim() &&
    emailRegex.test(currentEmail.trim()) &&
    !emails.includes(currentEmail.trim().toLowerCase()) &&
    emails.length < maxEmails

  return (
    <div className="space-y-4">
      {/* Privacy Notice */}
      {
        showDisclaimer && (
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              📧 Estes emails são apenas para receber o recibo. Não são partilhados com o taxista nem com terceiros.
            </AlertDescription>
          </Alert>
        )
      }

      {/* Email Input */}
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Digite um email..."
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled || emails.length >= maxEmails}
        />
        <Button
          type="button"
          onClick={handleAddEmail}
          disabled={!canAddEmail || disabled}
          variant="outline"
          size="icon"
          className="flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {emails.length < maxEmails && (
        <p className="text-sm text-slate-600">
          {emails.length === 0
            ? `Adicione pelo menos 1 email (máximo ${maxEmails})`
            : `${emails.length}/${maxEmails} emails adicionados`
          }
        </p>
      )}

      {/* Email Badges */}
      {emails.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Emails para receber o recibo:
          </h4>
          <div className="flex flex-wrap gap-2">
            {emails.map((email) => (
              <Badge
                key={email}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
              >
                <Mail className="w-3 h-3" />
                <span className="text-sm">{email}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEmail(email)}
                  disabled={disabled}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}