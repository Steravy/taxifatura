import { ArrowRight, CheckCircle, FileText, QrCode, Smartphone, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                TaxiFatura
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/demo">
                <Button variant="outline" className="bg-transparent text-sm md:text-base">
                  Ver Demonstração
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-sm md:text-base px-4 md:px-6">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 md:space-y-8">
            <Badge variant="secondary" className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium">
              🚖 Especialmente para Taxistas de Cabo Verde
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Profissionalize
              </span>
              <br />o Seu Negócio de Táxi
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Emita faturas e recibos profissionais em segundos. Ganhe a confiança dos clientes, aumente os seus
              rendimentos e faça crescer o seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-6 md:pt-8">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-transparent"
                >
                  Ver Demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Tudo o Que Precisa Para
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Crescer</span>
            </h2>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
              Ferramentas simples e poderosas para transformar o seu táxi num negócio profissional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">Faturas Instantâneas</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Crie faturas profissionais em segundos, diretamente no seu telemóvel
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <QrCode className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">Sistema QR Code</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  O passageiro preenche os dados, você aprova. Sem distrações ao conduzir
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">Controlo de Rendimentos</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Acompanhe as suas viagens e ganhos sem papelada complicada
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">Clientes Empresariais</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Conquiste empresas e turistas com documentos profissionais
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">Rápido e Simples</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Interface pensada para taxistas. Sem complicações, só resultados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">Sem Burocracia</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Recibos claros e profissionais, sem complicações fiscais
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Como{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Funciona</span>
            </h2>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
              Duas formas simples de criar faturas profissionais
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-8">
              <CardHeader className="p-0 pb-4 md:pb-6">
                <Badge className="w-fit bg-blue-600 text-white mb-3 md:mb-4 text-xs md:text-sm">Método 1</Badge>
                <CardTitle className="text-xl md:text-2xl">Criação Manual</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Perfeito para quando tem tempo para preencher os dados
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3 md:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Abra a app no seu telemóvel</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Preencha os dados da viagem</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Gere a fatura instantaneamente</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Partilhe ou descarregue o recibo</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
              <CardHeader className="p-0 pb-4 md:pb-6">
                <Badge className="w-fit bg-green-600 text-white mb-3 md:mb-4 text-xs md:text-sm">Método 2</Badge>
                <CardTitle className="text-xl md:text-2xl">Sistema QR Code</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Ideal para quando está a conduzir - segurança em primeiro lugar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3 md:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Mostre o QR code ao passageiro</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Ele preenche os dados no telemóvel dele</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Você aprova e a fatura é criada</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-sm md:text-base text-slate-700">Partilhe ou descarregue o recibo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Porquê Escolher o
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                TaxiFatura
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start space-x-3 md:space-x-4">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Mais Confiança dos Clientes</h3>
                  <p className="text-sm md:text-base text-slate-600">
                    Documentos profissionais criam confiança e abrem portas a novos negócios
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Pagamentos Mais Rápidos</h3>
                  <p className="text-sm md:text-base text-slate-600">
                    Empresas e turistas pagam mais rapidamente com recibos adequados
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Controlo Total</h3>
                  <p className="text-sm md:text-base text-slate-600">
                    Saiba exatamente quanto ganha e organize melhor o seu negócio
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Crescimento Sustentável</h3>
                  <p className="text-sm md:text-base text-slate-600">
                    Transforme o seu táxi num negócio profissional e lucrativo
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
                  <span className="text-sm md:text-base">Funciona offline</span>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 font-semibold py-2 md:py-3 text-sm md:text-base">
                  Descarregar Agora - Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold">
              Pronto Para
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Profissionalizar
              </span>
              <br />o Seu Negócio?
            </h2>

            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
              Junte-se aos taxistas de Cabo Verde que já estão a crescer com o TaxiFatura. É grátis para começar.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-6 md:pt-8">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 md:px-12 py-3 md:py-4"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
            </div>

            <p className="text-xs md:text-sm text-slate-500">
              Sem cartão de crédito necessário • Configuração em 2 minutos • Suporte 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
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
              <a href="#" className="hover:text-blue-600 transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Suporte
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Contacto
              </a>
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
