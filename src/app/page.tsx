import { ArrowRight, CheckCircle, FileText, Shield, Clock, BarChart3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { CTASection } from "@/components/home/cta-section"
import Link from "next/link"
import Header from "@/components/home/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <Header /> */}

      <HeroSection />

      <FeaturesSection />

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader
            title={<>Como <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Funciona</span></>}
            subtitle="Duas formas simples de criar faturas profissionais"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
              <CardHeader className="p-0 pb-6 md:pb-8">
                <Badge className="w-fit bg-blue-600 text-white mb-4 md:mb-6 text-sm md:text-base px-3 py-1">Método 1</Badge>
                <CardTitle className="text-2xl md:text-3xl font-bold">Criação Manual</CardTitle>
                <CardDescription className="text-lg md:text-xl text-slate-600 mt-2">
                  Perfeito para quando tem tempo para preencher os dados calmamente
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4 md:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Abra a app no seu telemóvel</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Preencha os dados da viagem</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Gere a fatura instantaneamente</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Partilhe ou descarregue o recibo</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-8">
              <CardHeader className="p-0 pb-6 md:pb-8">
                <Badge className="w-fit bg-green-600 text-white mb-4 md:mb-6 text-sm md:text-base px-3 py-1">Método 2</Badge>
                <CardTitle className="text-2xl md:text-3xl font-bold">Sistema QR Code</CardTitle>
                <CardDescription className="text-lg md:text-xl text-slate-600 mt-2">
                  Ideal para quando está a conduzir - segurança em primeiro lugar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4 md:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Mostre o QR code ao passageiro</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Ele preenche os dados no telemóvel dele</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Você aprova e a fatura é criada</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed">Partilhe ou descarregue o recibo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-32 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader
            title={<>Porquê Escolher o <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">TaxiFatura</span></>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-10">
              <div className="flex items-start space-x-4 md:space-x-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-800">Mais Confiança dos Clientes</h3>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Documentos profissionais geram confiança e atraem clientes que valorizam organização, como empresas e turistas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-800">Pagamentos Mais Rápidos</h3>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Empresas e turistas pagam mais rapidamente quando recebem recibos adequados.
                    Elimine atrasos e disputes desnecessárias.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-800">Controlo Total</h3>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Saiba exatamente quanto ganha por dia, semana e mês.
                    Organize melhor o seu negócio com dados reais e confiáveis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-800">Crescimento Sustentável</h3>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Transforme o seu táxi num negócio profissional e escalável.
                    Atraia clientes melhores e construa uma reputação sólida.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Comece Hoje Mesmo</h3>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Configuração em 2 minutos</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Sem custos iniciais</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Suporte em português</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Dados seguros e privados</span>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 font-semibold py-2 md:py-3 text-sm md:text-base">
                  <ArrowRight className="mr-2 w-4 h-4" />
                  Aceder Agora - Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-8 md:py-12 px-4">
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
            <p>&copy; 2025 TaxiFatura. Feito com ❤️ para os taxistas de Cabo Verde.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
