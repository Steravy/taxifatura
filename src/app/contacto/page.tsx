import { PageLayout } from "@/components/ui/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Building2, 
  Users, 
  Headphones,
  Send
} from "lucide-react"

export default function ContactoPage() {
  return (
    <PageLayout title="Contacte-nos">
      <div className="space-y-12">
        {/* Contact Info Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Telefone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-lg font-bold text-slate-800">+238 123 456 789</p>
                <p className="text-sm text-slate-600">Seg-Sex: 8h-18h</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">info@taxifatura.cv</p>
                <p className="text-sm text-slate-600">Resposta em 24h</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">Praia, Santiago</p>
                <p className="text-sm text-slate-600">Cabo Verde</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Horário</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">8h - 18h</p>
                <p className="text-sm text-slate-600">Segunda a Sexta</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Form and Departments */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                  Envie-nos uma Mensagem
                </CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e responderemos o mais rapidamente possível
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium text-slate-700">Nome Completo</label>
                    <Input id="nome" placeholder="O seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="text-sm font-medium text-slate-700">Telefone (Opcional)</label>
                    <Input id="telefone" placeholder="+238 123 456 789" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="assunto" className="text-sm font-medium text-slate-700">Assunto</label>
                    <select 
                      id="assunto" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Suporte Técnico</option>
                      <option>Questão Comercial</option>
                      <option>Sugestão de Melhoria</option>
                      <option>Problema de Faturação</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-sm font-medium text-slate-700">Mensagem</label>
                  <Textarea 
                    id="mensagem" 
                    placeholder="Descreva o seu problema ou questão em detalhe..." 
                    rows={5}
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  Ao enviar esta mensagem, concorda com a nossa{" "}
                  <a href="/privacidade" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Departments */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Departamentos</CardTitle>
                <CardDescription>
                  Contacte diretamente o departamento adequado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Headphones className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Suporte Técnico</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Problemas com a plataforma, bugs, questões técnicas
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> suporte@taxifatura.cv<br />
                      <strong>Tel:</strong> +238 123 456 789
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Comercial</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Parcerias, questões comerciais, faturas empresariais
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> comercial@taxifatura.cv<br />
                      <strong>Tel:</strong> +238 987 654 321
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Geral</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Informações gerais, feedback, sugestões
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> info@taxifatura.cv
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Suporte Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat ao Vivo
                  <Badge className="ml-auto bg-green-100 text-green-700">Online</Badge>
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp Business
                </Button>
                
                <div className="pt-3 border-t">
                  <p className="text-sm text-slate-600 text-center">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Tempo médio de resposta: 2 horas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Office Location */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Nossa Localização
              </CardTitle>
              <CardDescription>
                Visite-nos no nosso escritório em Praia, Santiago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Endereço Completo</h4>
                    <p className="text-slate-600">
                      TaxiFatura Lda.<br />
                      Achada Santo António<br />
                      Praia, Santiago<br />
                      Cabo Verde<br />
                      CP: 1234
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Horário de Funcionamento</h4>
                    <div className="space-y-1 text-slate-600">
                      <p>Segunda a Sexta: 8h00 - 18h00</p>
                      <p>Sábado: 9h00 - 13h00</p>
                      <p className="text-red-600">Domingo: Fechado</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Como Chegar</h4>
                    <p className="text-slate-600 text-sm">
                      Próximo ao Mercado de Achada Santo António, 
                      a 5 minutos do centro da Praia. 
                      Estacionamento disponível.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-200 rounded-lg flex items-center justify-center h-64">
                  <div className="text-center text-slate-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Mapa em breve</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  )
}