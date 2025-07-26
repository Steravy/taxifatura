"use client"

import type React from "react"

import { ArrowRight, CheckCircle, Clock, Mail, Target, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function WaitingListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage("")

        try {
            const response = await fetch("/api/waiting-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setIsSubmitted(true)
                setTimeout(() => {
                    setIsModalOpen(false)
                    setIsSubmitted(false)
                    setEmail("")
                }, 2000)
            } else {
                setErrorMessage(data.error || "Erro ao registar email")
            }
        } catch (error) {
            setErrorMessage("Erro de conexão. Tenta novamente.")
            console.error("Error submitting email:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <span className="ml-2 text-xl font-semibold text-gray-900">Proativa</span>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#como-funciona" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Como Funciona
                            </a>
                            <a href="#beneficios" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Benefícios
                            </a>
                            {/* <a href="#precos" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Preços
                            </a> */}
                        </nav>
                        <Button variant="outline">Entrar</Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <Badge variant="secondary" className="mb-4">
                            🎯 Candidaturas que trabalham por ti
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Encontra o teu emprego
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                sem procurar
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            A Proativa automatiza o envio de candidaturas espontâneas em massa.
                            Enquanto dormes, o teu CV chega a dezenas de empresas que podem estar à procura de alguém como tu.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-lg px-8 py-3" onClick={() => setIsModalOpen(true)}>
                                Começar Gratuitamente
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">✅ Sem cartão de crédito • ✅ Configuração em 5 minutos</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                            <div className="text-gray-600">Candidaturas enviadas por dia</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
                            <div className="text-gray-600">Taxa de resposta das empresas</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">72h</div>
                            <div className="text-gray-600">Tempo médio para primeira entrevista</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Como a Proativa funciona</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Três passos simples para começares a receber propostas de emprego
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center border-0 shadow-lg">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">1. Cria o teu perfil</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Carrega o teu CV, define a área de interesse e localização. Demora apenas 5 minutos.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-0 shadow-lg">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl">2. Identificamos empresas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    A nossa IA encontra empresas relevantes na tua área que podem estar a contratar.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-0 shadow-lg">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">3. Enviamos candidaturas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Criamos emails profissionais personalizados e enviamos automaticamente para dezenas de empresas.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section id="beneficios" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Porque escolher a Proativa?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Destaca-te no mercado de trabalho cabo-verdiano com a nossa tecnologia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Zap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aumenta as tuas hipóteses</h3>
                                <p className="text-gray-600">
                                    Consegue entrevistas com empresas que nem sabias que estavam a contratar. Muitas vagas nunca são
                                    publicadas.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Poupa tempo precioso</h3>
                                <p className="text-gray-600">
                                    Nada de copiar e colar emails um a um. A Proativa faz tudo automaticamente enquanto te focas noutras
                                    coisas.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Target className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cria visibilidade profissional</h3>
                                <p className="text-gray-600">
                                    Mesmo sem experiência, consegues destacar-te e mostrar proatividade aos recrutadores.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfeito para PMEs</h3>
                                <p className="text-gray-600">
                                    Focamos em pequenas e médias empresas cabo-verdianas que valorizam candidatos proativos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ideal para ti se és...</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center border-2 border-blue-100 hover:border-blue-300 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg">🎓 Recém-formado</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Acabaste o curso e queres entrar no mercado de trabalho rapidamente</CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-2 border-purple-100 hover:border-purple-300 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg">🚀 Primeiro emprego</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Procuras a tua primeira oportunidade profissional ou estágio</CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-2 border-green-100 hover:border-green-300 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg">🔄 Mudança de carreira</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Queres mudar de área ou encontrar novas oportunidades</CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg">💼 Recolocação</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Procuras uma nova posição após um período de desemprego</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            {/* <section id="precos" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Preços simples e transparentes</h2>
                        <p className="text-xl text-gray-600">Escolhe o plano que melhor se adapta às tuas necessidades</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="border-2 border-gray-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Básico</CardTitle>
                                <div className="text-3xl font-bold text-gray-900 mt-4">Grátis</div>
                                <CardDescription>Para começar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>10 candidaturas por mês</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Emails básicos</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Suporte por email</span>
                                </div>
                                <Button className="w-full mt-6 bg-transparent" variant="outline" onClick={() => setIsModalOpen(true)}>
                                    Começar Grátis
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-500 relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-blue-500">Mais Popular</Badge>
                            </div>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <div className="text-3xl font-bold text-gray-900 mt-4">
                                    2.500 CVE<span className="text-lg font-normal text-gray-600">/mês</span>
                                </div>
                                <CardDescription>Para profissionais ativos</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>100 candidaturas por mês</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Emails personalizados</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Relatórios detalhados</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Suporte prioritário</span>
                                </div>
                                <Button className="w-full mt-6" onClick={() => setIsModalOpen(true)}>
                                    Começar Teste Grátis
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-gray-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Premium</CardTitle>
                                <div className="text-3xl font-bold text-gray-900 mt-4">
                                    4.500 CVE<span className="text-lg font-normal text-gray-600">/mês</span>
                                </div>
                                <CardDescription>Para máxima exposição</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>300 candidaturas por mês</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>IA avançada</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Follow-up automático</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Consultoria 1-on-1</span>
                                </div>
                                <Button className="w-full mt-6 bg-transparent" variant="outline" onClick={() => setIsModalOpen(true)}>
                                    Contactar Vendas
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                        Pronto para encontrar o teu próximo emprego?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Junta-te a centenas de cabo-verdianos que já encontraram trabalho com a Proativa
                    </p>
                    <Button size="lg" className="text-lg px-8 py-3" onClick={() => setIsModalOpen(true)}>
                        Começar Gratuitamente
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Sem compromisso • Cancela quando quiseres</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <span className="ml-2 text-xl font-semibold">Proativa</span>
                            </div>
                            <p className="text-gray-400">Candidaturas espontâneas feitas por ti.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Produto</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Como Funciona
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Preços
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Empresa</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Sobre Nós
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Contacto
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Privacidade
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Termos
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Proativa. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>

            {/* Launch Notification Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">🚀 Lançamento em breve!</DialogTitle>
                        <DialogDescription className="text-center text-sm">
                            A Proativa está quase pronta para te ajudar a encontrar o emprego dos teus sonhos.
                        </DialogDescription>
                    </DialogHeader>

                    {!isSubmitted ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Deixa o teu email e serás notificado quando lançarmos:</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="o-teu-email@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="w-full"
                                />
                                {errorMessage && (
                                    <p className="text-sm text-red-600 text-center">{errorMessage}</p>
                                )}
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-800 text-center">
                                    ✨ <strong>Oferta especial:</strong> Os primeiros 100 utilizadores terão acesso gratuito!
                                </p>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading ? "A registar..." : "Quero ser notificado"}
                                <Mail className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email registado com sucesso!</h3>
                            <p className="text-gray-600">Serás um dos primeiros a saber quando a Proativa estiver disponível.</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
