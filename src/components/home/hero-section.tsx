import { ArrowRight, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Design - Similar to CTA Section */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      
      {/* Rounded bottom borders */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-[3rem]"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 pb-20">
        <div className="text-center space-y-6 md:space-y-8 text-white">
          {/* <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 md:px-6 md:py-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs md:text-sm font-medium text-green-300">Feito especialmente para taxistas de Cabo Verde</span>
          </div> */}

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight px-2">
              <span className="block">Transforme o Seu</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Táxi num Negócio
              </span>
              <span className="block">Profissional</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light px-2">
              Crie faturas profissionais em <span className="font-semibold text-cyan-400">segundos</span>, 
              ganhe a confiança dos clientes e <span className="font-semibold text-blue-400">aumente os seus rendimentos</span> 
              com a solução pensada para si.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-4 md:pt-6 px-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-white"
              >
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-white/30 text-white hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-white transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold"
              >
                <Smartphone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 md:pt-10">
            <p className="text-sm md:text-base text-slate-400 mb-8">Usado por taxistas em:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base">P</span>
                </div>
                <span className="text-sm font-medium text-white">Praia</span>
                <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base">M</span>
                </div>
                <span className="text-sm font-medium text-white">Mindelo</span>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base">S</span>
                </div>
                <span className="text-sm font-medium text-white">Sal</span>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base">S</span>
                </div>
                <span className="text-sm font-medium text-white">Santiago</span>
                <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}