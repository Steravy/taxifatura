import { ArrowRight, CheckCircle, Clock, FileText, Shield, Smartphone, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Aumente os seus rendimentos hoje</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                <span className="block">Não Perca</span>
                <span>
                  Nenhuma {" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Oportunidade
                  </span>
                </span>
                <span className="block">de Negócio</span>
              </h2>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                Empresas e turistas procuram taxistas profissionais.
                Seja o primeiro a oferecer faturas adequadas e conquiste
                os clientes mais rentáveis.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">+40%</div>
                <div className="text-sm text-slate-400">Aumento médio de rendimentos</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">2min</div>
                <div className="text-sm text-slate-400">Para começar a usar</div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">Funciona no seu telemóvel atual</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">Sem mensalidades nem custos escondidos</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">Suporte em português 24/7</span>
              </div>
            </div>
          </div>

          {/* Right CTA Card */}
          <div className="w-full max-w-lg mx-auto lg:max-w-none bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
            <div className="text-center space-y-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <FileText className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">
                Comece Agora Mesmo
              </h3>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Transforme o seu táxi num negócio profissional em apenas 2 minutos.
                Grátis para sempre.
              </p>

              <div className="space-y-3 md:space-y-4 pt-4">
                <Link href="/dashboard" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg py-3 md:py-4 rounded-xl font-semibold"
                  >
                    <Zap className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                    Começar Gratuitamente
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </Link>

                <Link href="/demo" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-base md:text-lg py-3 md:py-4 rounded-xl font-semibold"
                  >
                    <Smartphone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                    Ver Demonstração
                  </Button>
                </Link>
              </div>

              <div className="pt-4 md:pt-6 border-t">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500">
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600 mr-1" />
                    <span>Sem cartão</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-600 mr-1" />
                    <span>Setup rápido</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 md:w-4 md:h-4 text-purple-600 mr-1" />
                    <span>Suporte incluído</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}