import { PageLayout } from "@/components/ui/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, BookOpen, HelpCircle, Clock, Users, Zap } from "lucide-react"

export default function SuportePage() {
  return (
    <PageLayout title="Centro de Suporte">
      <div className="space-y-12">
        {/* Quick Help Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Como Podemos Ajudar?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Chat ao Vivo</CardTitle>
                <CardDescription>
                  Fale connosco em tempo real durante o horário de funcionamento
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="bg-green-100 text-green-700 mb-3">Online</Badge>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Suporte Telefónico</CardTitle>
                <CardDescription>
                  Ligue-nos para assistência imediata
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-mono text-lg font-bold text-slate-800 mb-2">+238 123 456 789</p>
                <p className="text-sm text-slate-600 mb-3">Seg-Sex: 8h-18h</p>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
                <CardDescription>
                  Envie-nos um email detalhado sobre o seu problema
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-600 mb-3">Resposta em 24h</p>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  suporte@taxifatura.cv
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Perguntas Frequentes</h2>
          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Como criar a minha primeira fatura?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Após fazer login, clique em <strong>Nova Fatura</strong>, preencha os dados da viagem (cliente, origem, destino, valor) 
                  e clique em <strong>Gerar Fatura</strong>. O documento será criado automaticamente e pode ser descarregado ou partilhado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                  As faturas são válidas legalmente?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Sim! Todas as faturas geradas seguem os requisitos legais de Cabo Verde, incluindo numeração sequencial, 
                  dados obrigatórios e formato adequado para apresentação às autoridades fiscais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Posso usar offline?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  A TaxiFatura é uma aplicação web que requer conexão à internet para funcionar. 
                  No entanto, pode aceder às suas faturas anteriores e dados salvos sempre que tiver conexão.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-orange-600" />
                  Como funciona o sistema QR Code?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  O sistema QR Code permite que o passageiro preencha os dados da viagem no próprio telemóvel, 
                  enviando as informações diretamente para si. Você apenas aprova e a fatura é gerada automaticamente.
                  <strong> (Funcionalidade em desenvolvimento)</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-red-600" />
                  O que acontece se perder os meus dados?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Todos os seus dados estão seguros nos nossos servidores com backups automáticos diários. 
                  Mesmo que perca o telemóvel ou computador, pode aceder a todo o seu histórico fazendo login na plataforma.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recursos Úteis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Guia de Início Rápido
                </CardTitle>
                <CardDescription>
                  Aprenda a usar a TaxiFatura em 5 minutos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Guia
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Comunidade de Taxistas
                </CardTitle>
                <CardDescription>
                  Junte-se ao grupo no WhatsApp para dicas e suporte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Juntar-se ao Grupo
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2" />
            Suporte de Emergência
          </h3>
          <p className="text-red-700 mb-4">
            Para problemas urgentes que impedem o funcionamento do seu negócio (ex: não consegue gerar faturas), 
            contacte-nos imediatamente:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-red-600 hover:bg-red-700">
              <Phone className="w-4 h-4 mr-2" />
              +238 987 654 321
            </Button>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Mail className="w-4 h-4 mr-2" />
              emergencia@taxifatura.cv
            </Button>
          </div>
          <p className="text-sm text-red-600 mt-3">
            <Clock className="w-4 h-4 inline mr-1" />
            Disponível 24/7 para emergências
          </p>
        </section>
      </div>
    </PageLayout>
  )
}