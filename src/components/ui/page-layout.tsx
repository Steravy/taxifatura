import { FileText } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

interface PageLayoutProps {
  title: string
  children: ReactNode
  lastUpdated?: string
}

export function PageLayout({ title, children, lastUpdated }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent truncate">
                TaxiFatura
              </span>
            </Link>
            <Link href="/dashboard">
              <span className="text-sm md:text-base text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
                Voltar ao Dashboard
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                {title}
              </h1>
              {lastUpdated && (
                <p className="text-sm text-slate-500">
                  Última atualização: {lastUpdated}
                </p>
              )}
            </div>
            
            <div className="prose prose-slate max-w-none">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                TaxiFatura
              </span>
            </div>

            <div className="flex space-x-6 md:space-x-8 text-slate-600 text-sm md:text-base">
              <Link href="/privacidade" className="hover:text-blue-600 transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-blue-600 transition-colors">
                Termos
              </Link>
              <Link href="/suporte" className="hover:text-blue-600 transition-colors">
                Suporte
              </Link>
              <Link href="/contacto" className="hover:text-blue-600 transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm">
            <p>&copy; 2024 TaxiFatura. Feito com ❤️ para os taxistas de Cabo Verde.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}