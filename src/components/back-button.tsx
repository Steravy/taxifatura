"use client"

import { Button } from "@/components/ui/button"

interface BackButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function BackButton({ children, className, variant = "outline" }: BackButtonProps) {
  return (
    <Button 
      variant={variant}
      onClick={() => window.history.back()}
      className={className}
    >
      {children}
    </Button>
  )
}