import { FileText, QrCode, Smartphone, TrendingUp, Users, Zap } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader 
          title="Tudo o Que Precisa Para Crescer"
          subtitle="Ferramentas simples e poderosas para transformar o seu táxi num negócio profissional"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 cursor-pointer">
            <CardHeader className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 group-hover:from-blue-600 group-hover:to-cyan-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                <Smartphone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold mb-2">Faturas Instantâneas</CardTitle>
              <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed">
                Crie faturas profissionais em segundos, diretamente no seu telemóvel. 
                Sem complicações, sem esperas.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 cursor-pointer">
            <CardHeader className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 group-hover:from-green-600 group-hover:to-emerald-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                <QrCode className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold mb-2">Sistema QR Code</CardTitle>
              <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed">
                O passageiro preenche os dados, você aprova. Sem distrações ao conduzir. 
                Segurança em primeiro lugar.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 cursor-pointer">
            <CardHeader className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 group-hover:from-purple-600 group-hover:to-pink-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                <TrendingUp className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold mb-2">Controlo de Rendimentos</CardTitle>
              <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed">
                Acompanhe as suas viagens e ganhos em tempo real. 
                Sem papelada complicada, só resultados claros.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 cursor-pointer">
            <CardHeader className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 group-hover:from-orange-600 group-hover:to-red-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                <Users className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold mb-2">Clientes Empresariais</CardTitle>
              <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed">
                Conquiste empresas e turistas com documentos profissionais. 
                Abra portas a contratos regulares e viagens rentáveis.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 cursor-pointer">
            <CardHeader className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-blue-100 group-hover:from-cyan-600 group-hover:to-blue-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                <Zap className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold mb-2">Rápido e Simples</CardTitle>
              <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed">
                Interface pensada especificamente para taxistas. 
                Sem complicações desnecessárias, só resultados que contam.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 cursor-pointer">
            <CardHeader className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 group-hover:from-indigo-600 group-hover:to-purple-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold mb-2">Sem Burocracia</CardTitle>
              <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed">
                Recibos claros e profissionais, sem complicações fiscais. 
                Tudo conforme as regras, sem dores de cabeça.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}