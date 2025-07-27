"use client"

import { User } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Logo } from "@/components/ui/logo"

export function DashboardHeader() {
  const { data: session } = authClient.useSession()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
            <div>
              <p className="text-sm text-slate-500">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="font-medium">{session?.user?.name || "..."}</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}