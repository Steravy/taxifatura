import {
    ArrowLeft,
    ArrowRight,
    FileText,
    QrCode,
    MapPin,
    Clock,
    User,
    Download,
    Share2,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm">Voltar</span>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                    <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    TaxiFatura
                                </span>
                            </div>
                        </div>
                        <Link href="/dashboard">
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-sm md:text-base px-4 md:px-6">
                                Começar Agora
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 md:py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <Badge variant="secondary" className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium mb-6">
                        📱 Tour Interativo
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Descubra o{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">TaxiFatura</span>{" "}
                        Passo a Passo
                    </h1>
                    <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                        Siga este tour guiado para ver como é fácil profissionalizar o seu negócio de táxi
                    </p>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center space-x-2 mb-8">
                        <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                        <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                        <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                        <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Tour Step 1 - Dashboard Overview */}
            <section className="py-8 px-4 bg-slate-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Badge className="bg-blue-600 text-white mb-2">Passo 1 de 4</Badge>
                            <h2 className="text-2xl md:text-3xl font-bold">Interface Principal</h2>
                            <p className="text-slate-600">O seu centro de controlo profissional</p>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-400" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Phone Mockup - Main Dashboard */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 shadow-2xl bg-white overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">Olá, João Silva</h3>
                                            <p className="text-blue-100 text-sm">Táxi #CV-1234</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">€127.50</p>
                                            <p className="text-blue-100 text-sm">Hoje</p>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex flex-col items-center justify-center space-y-2 text-white">
                                            <FileText className="w-6 h-6" />
                                            <span className="text-sm">Nova Fatura</span>
                                        </div>
                                        <div className="h-20 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center space-y-2 text-slate-500">
                                            <QrCode className="w-6 h-6" />
                                            <span className="text-sm">QR Code</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-slate-700">Viagens Recentes</h4>

                                        <div className="border rounded-lg p-3 bg-slate-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4 text-slate-500" />
                                                    <span className="text-sm font-medium">Aeroporto → Hotel Pestana</span>
                                                </div>
                                                <span className="text-sm font-bold text-green-600">€25.00</span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>14:30</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-3 h-3" />
                                                    <span>Maria Santos</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4 text-slate-500" />
                                                    <span className="text-sm font-medium">Praia → Cidade Velha</span>
                                                </div>
                                                <span className="text-sm font-bold text-green-600">€18.50</span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>12:15</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-3 h-3" />
                                                    <span>Carlos Mendes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Explanation */}
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-blue-800 mb-4">✨ O Que Vê Aqui</h3>
                                    <ul className="space-y-3 text-sm text-blue-700">
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Rendimentos do dia em tempo real</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Botões para criar faturas rapidamente</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Histórico de viagens organizadas</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Interface limpa e fácil de usar</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="font-bold mb-4">💡 Benefício Principal</h3>
                                    <p className="text-slate-600 text-sm">
                                        Tenha controlo total do seu negócio numa interface simples. Veja os seus ganhos, crie faturas e
                                        acompanhe o progresso - tudo num só lugar.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tour Step 2 - Creating Invoice */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Badge className="bg-green-600 text-white mb-2">Passo 2 de 4</Badge>
                            <h2 className="text-2xl md:text-3xl font-bold">Criar Nova Fatura</h2>
                            <p className="text-slate-600">Processo simples em poucos toques</p>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-400" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Form Mockup */}
                        <Card className="border-0 shadow-xl bg-white">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="w-5 h-5" />
                                    <span>Nova Fatura</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Cliente</label>
                                    <div className="w-full p-3 border rounded-lg bg-slate-50 text-slate-700">Maria Santos</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Origem</label>
                                        <div className="w-full p-3 border rounded-lg bg-slate-50 text-slate-700">Aeroporto</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Destino</label>
                                        <div className="w-full p-3 border rounded-lg bg-slate-50 text-slate-700">Hotel Pestana</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Distância</label>
                                        <div className="w-full p-3 border rounded-lg bg-slate-50 text-slate-700">12.5 km</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Valor</label>
                                        <div className="w-full p-3 border rounded-lg bg-slate-50 text-slate-700 font-bold">€25.00</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Observações</label>
                                    <div className="w-full p-3 border rounded-lg bg-slate-50 text-slate-700 h-20 text-sm">
                                        Viagem do aeroporto para o hotel. Cliente com bagagem extra.
                                    </div>
                                </div>

                                <div className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-medium">
                                    Gerar Fatura
                                </div>
                            </CardContent>
                        </Card>

                        {/* Explanation */}
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-green-800 mb-4">🚀 Como Funciona</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                1
                                            </div>
                                            <div>
                                                <p className="font-medium text-green-800">Preencha os dados</p>
                                                <p className="text-sm text-green-700">Nome do cliente, origem, destino e valor</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                2
                                            </div>
                                            <div>
                                                <p className="font-medium text-green-800">Adicione observações</p>
                                                <p className="text-sm text-green-700">Detalhes extras sobre a viagem (opcional)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                3
                                            </div>
                                            <div>
                                                <p className="font-medium text-green-800">Gere a fatura</p>
                                                <p className="text-sm text-green-700">Recibo profissional criado instantaneamente</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="font-bold mb-4">⚡ Vantagens</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                            <span>Processo rápido - menos de 30 segundos</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                            <span>Campos intuitivos e fáceis de preencher</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                            <span>Dados guardados automaticamente</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tour Step 3 - Generated Receipt */}
            <section className="py-8 px-4 bg-slate-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Badge className="bg-purple-600 text-white mb-2">Passo 3 de 4</Badge>
                            <h2 className="text-2xl md:text-3xl font-bold">Recibo Profissional</h2>
                            <p className="text-slate-600">Documento pronto para partilhar</p>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-400" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Generated Receipt */}
                        <Card className="border-0 shadow-xl bg-white">
                            <CardHeader className="bg-slate-100 border-b">
                                <CardTitle className="text-center text-slate-800">Recibo de Táxi</CardTitle>
                                <p className="text-center text-sm text-slate-600">#TF-2024-001234</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b">
                                        <div>
                                            <h3 className="font-semibold">João Silva</h3>
                                            <p className="text-sm text-slate-600">Táxi #CV-1234</p>
                                            <p className="text-sm text-slate-600">NIF: 123456789</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-600">26/01/2024</p>
                                            <p className="text-sm text-slate-600">14:30</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Detalhes da Viagem</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Cliente:</span>
                                                <span>Maria Santos</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Origem:</span>
                                                <span>Aeroporto</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Destino:</span>
                                                <span>Hotel Pestana</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Distância:</span>
                                                <span>12.5 km</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span>Total:</span>
                                            <span className="text-green-600">€25.00</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 pt-4">
                                        <div className="flex-1 h-10 border border-slate-300 rounded-lg flex items-center justify-center space-x-2 text-slate-600">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-sm">Partilhar</span>
                                        </div>
                                        <div className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center space-x-2 text-white">
                                            <Download className="w-4 h-4" />
                                            <span className="text-sm">Descarregar</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Explanation */}
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-purple-800 mb-4">📄 Recibo Profissional</h3>
                                    <ul className="space-y-3 text-sm text-purple-700">
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Todos os dados do taxista e cliente</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Detalhes completos da viagem</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Número único de identificação</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Design limpo e profissional</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="font-bold mb-4">📱 Opções de Partilha</h3>
                                    <div className="space-y-3 text-sm text-slate-600">
                                        <div className="flex items-center space-x-3">
                                            <Share2 className="w-4 h-4 text-blue-600" />
                                            <span>Partilhe por WhatsApp, email ou SMS</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Download className="w-4 h-4 text-green-600" />
                                            <span>Descarregue como PDF para arquivo</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="font-bold mb-4">🎯 Impacto no Negócio</h3>
                                    <p className="text-slate-600 text-sm">
                                        Recibos profissionais aumentam a confiança dos clientes, facilitam reembolsos empresariais e podem
                                        resultar em mais gorjetas e clientes regulares.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tour Step 4 - QR Code System */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Badge className="bg-orange-600 text-white mb-2">Passo 4 de 4</Badge>
                            <h2 className="text-2xl md:text-3xl font-bold">Sistema QR Code</h2>
                            <p className="text-slate-600">Segurança em primeiro lugar</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* Driver View */}
                        <Card className="border-0 shadow-xl bg-white">
                            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center">
                                <CardTitle>1. Vista do Taxista</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center">
                                    <div className="w-24 h-24 bg-slate-900 rounded grid grid-cols-8 gap-px p-2">
                                        {Array.from({ length: 64 }).map((_, i) => (
                                            <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-white" : "bg-slate-900"}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-4">Mostre este QR code ao passageiro</p>
                                <Badge className="bg-green-600 text-white">Aguardando dados...</Badge>
                            </CardContent>
                        </Card>

                        {/* Passenger View */}
                        <Card className="border-0 shadow-xl bg-white">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center">
                                <CardTitle>2. Vista do Passageiro</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Seu Nome</label>
                                    <div className="w-full p-2 border rounded bg-slate-50 text-sm">Carlos Mendes</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Origem</label>
                                    <div className="w-full p-2 border rounded bg-slate-50 text-sm">Praia Centro</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Destino</label>
                                    <div className="w-full p-2 border rounded bg-slate-50 text-sm">Cidade Velha</div>
                                </div>
                                <div className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded flex items-center justify-center text-white text-sm">
                                    Enviar para Taxista
                                </div>
                            </CardContent>
                        </Card>

                        {/* Approval View */}
                        <Card className="border-0 shadow-xl bg-white">
                            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
                                <CardTitle>3. Aprovação</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Cliente:</span>
                                        <span>Carlos Mendes</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Origem:</span>
                                        <span>Praia Centro</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Destino:</span>
                                        <span>Cidade Velha</span>
                                    </div>
                                    <div className="border-t pt-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Valor da Viagem</label>
                                        <div className="w-full p-2 border rounded bg-slate-50 text-sm font-bold">€18.50</div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="flex-1 h-8 border border-slate-300 rounded flex items-center justify-center text-xs">
                                        Rejeitar
                                    </div>
                                    <div className="flex-1 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded flex items-center justify-center text-white text-xs">
                                        Aprovar
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-orange-800 mb-4">🛡️ Segurança em Primeiro Lugar</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-orange-800 mb-2">Porquê Usar QR Code?</h4>
                                        <ul className="space-y-2 text-sm text-orange-700">
                                            <li className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                <span>Não precisa de escrever enquanto conduz</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                <span>Cliente preenche os próprios dados</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                <span>Você mantém controlo total</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-orange-800 mb-2">Ideal Para:</h4>
                                        <ul className="space-y-2 text-sm text-orange-700">
                                            <li className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                <span>Viagens longas</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                <span>Trânsito intenso</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                <span>Clientes empresariais</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                <div className="container mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Viu Como É Simples?</h2>
                    <p className="text-lg md:text-xl mb-8 text-blue-100">
                        Agora que conhece todas as funcionalidades, está pronto para profissionalizar o seu negócio
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8 py-3">
                                Começar Gratuitamente
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
                            >
                                Voltar ao Início
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-blue-200 mt-6">Sem cartão de crédito • Configuração em 2 minutos • Suporte 24/7</p>
                </div>
            </section>
        </div>
    )
}
