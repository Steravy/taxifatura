import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center px-4 overflow-hidden pt-12">
      {/* Background Design - Similar to CTA Section */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>

      {/* Rounded bottom borders */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-50 rounded-t-[3rem] border-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 pb-20">
        <div className="text-center space-y-6 md:space-y-8 text-white">

          <div className="space-y-6 md:space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="block">Nunca Mais</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Perca Clientes
              </span>
              <span className="block">Por Não Ter Recibo</span>
            </h1>

            <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto px-2">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                <span className="text-base md:text-lg lg:text-xl text-slate-300 font-medium">
                  Recibos profissionais em segundos
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                <span className="text-base md:text-lg lg:text-xl text-slate-300 font-medium">
                  Ganhe a confiança dos seus clientes
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                <span className="text-base md:text-lg lg:text-xl text-slate-300 font-medium">
                  Aumente os seus rendimentos
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4 md:pt-6 px-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg rounded-full font-semibold text-white"
              >
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-4 md:pt-6">
            <p className="text-sm md:text-base text-slate-400 mb-6">Usado por taxistas em:</p>
            <div className="overflow-x-auto md:overflow-x-visible">
              <div className="flex gap-4 md:grid md:grid-cols-4 md:gap-6 max-w-2xl mx-auto min-w-max md:min-w-0 px-4 md:px-0">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 min-w-fit">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">Praia</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 min-w-fit">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">Mindelo</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 min-w-fit">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">Sal</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 min-w-fit">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap">Santiago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}