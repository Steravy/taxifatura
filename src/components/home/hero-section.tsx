import { ArrowRight, Smartphone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-32 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 opacity-60"></div>
      <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <div className="text-center space-y-6 md:space-y-8 lg:space-y-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 md:px-6 md:py-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-xs md:text-sm font-medium text-blue-700">Feito especialmente para taxistas de Cabo Verde</span>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight px-2">
              <span className="block">Transforme o Seu</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Táxi num Negócio
              </span>
              <span className="block text-slate-800">Profissional</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light px-2">
              Crie faturas profissionais em <span className="font-semibold text-blue-600">segundos</span>, 
              ganhe a confiança dos clientes e <span className="font-semibold text-cyan-600">aumente os seus rendimentos</span> 
              com a solução pensada para si.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 justify-center items-center pt-6 md:pt-8 lg:pt-12 px-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 rounded-xl font-semibold"
              >
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 rounded-xl font-semibold"
              >
                <Smartphone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 md:pt-16">
            <p className="text-sm md:text-base text-slate-500 mb-6">Já escolhido por taxistas em:</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">CV</span>
                </div>
                <span className="text-sm font-medium">Praia</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">CV</span>
                </div>
                <span className="text-sm font-medium">Mindelo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">CV</span>
                </div>
                <span className="text-sm font-medium">Sal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">CV</span>
                </div>
                <span className="text-sm font-medium">Santiago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}