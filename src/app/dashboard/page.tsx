"use client"

import { useState, useEffect } from "react"
import { FileText, QrCode, MapPin, Clock, Euro, User, Plus, TrendingUp, Eye, Download, MoreHorizontal, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { InvoiceModal } from "@/components/invoice-modal"
import { getReceipts, getStats } from "@/app/actions/invoice"
import { SerializedReceipt } from "../actions/types"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function DashboardPage() {

    const router = useRouter();

    const {
        data: session,
        isPending, //loading state
    } = authClient.useSession();

    if (!isPending && !session) router.push('/login');

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [receipts, setReceipts] = useState<SerializedReceipt[]>([])
    const [todayStats, setTodayStats] = useState({ totalAmount: 0, tripCount: 0, totalDistance: 0 })
    const [weekStats, setWeekStats] = useState({ totalAmount: 0, tripCount: 0, totalDistance: 0 })
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const loadData = async () => {
        try {
            setIsLoading(true)

            // Load receipts and stats in parallel
            const [receiptsResult, statsResult] = await Promise.all([
                getReceipts(1, searchTerm || undefined),
                getStats()
            ])

            if (receiptsResult.success) {
                setReceipts(receiptsResult.data)
            }

            if (statsResult.success) {
                setTodayStats(statsResult.data.today)
                setWeekStats(statsResult.data.week)
            }
        } catch (error) {
            console.error("Error loading dashboard data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Load data on component mount and search term change
    useEffect(() => {
        loadData()
    }, [searchTerm]) // loadData is stable and doesn't need to be in deps

    const handleReceiptCreated = () => {
        // Refresh data after creating a new receipt
        loadData()
    }

    const filteredReceipts = receipts

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    TaxiFatura
                                </h1>
                                <p className="text-sm text-slate-500">Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center space-x-2 text-sm">
                                <span className="font-medium">{session?.user?.name || "..."}</span>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-full xl:max-w-[1600px]">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <Card className="border bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Receita Hoje</p>
                                    <p className="text-2xl sm:text-3xl font-bold mt-1">
                                        €{isLoading ? "..." : todayStats.totalAmount.toFixed(2)}
                                    </p>
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-white">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Esta Semana</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                                        €{isLoading ? "..." : weekStats.totalAmount.toFixed(2)}
                                    </p>
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-white">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Viagens Hoje</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">
                                        {isLoading ? "..." : todayStats.tripCount}
                                    </p>
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-white">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Distância Hoje</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1">
                                        {isLoading ? "..." : todayStats.totalDistance.toFixed(1)}
                                    </p>
                                    <p className="text-sm text-slate-500">km</p>
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-12 sm:h-14 px-6 sm:px-8"
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Nova Fatura
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 h-12 sm:h-14 px-6 sm:px-8"
                        disabled
                    >
                        <QrCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        QR Code
                        <Badge variant="secondary" className="ml-2 text-xs">
                            Em Breve
                        </Badge>
                    </Button>
                </div>

                {/* Receipts Table */}
                <Card className="border shadow-sm bg-white">
                    <CardHeader className="pb-4 sm:pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl font-semibold text-slate-800">Recibos Emitidos</CardTitle>
                                <p className="text-sm text-slate-600 mt-1">Histórico completo das suas faturas</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                    <Input
                                        placeholder="Pesquisar recibos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 w-full sm:w-56 lg:w-64"
                                    />
                                </div>
                                <Button variant="outline" size="sm" className="whitespace-nowrap">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filtros
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="text-center py-12 px-6">
                                <div className="animate-pulse">
                                    <div className="w-16 h-16 bg-slate-200 rounded-lg mx-auto mb-4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-48 mx-auto mb-2"></div>
                                    <div className="h-3 bg-slate-200 rounded w-64 mx-auto"></div>
                                </div>
                            </div>
                        ) : filteredReceipts.length === 0 ? (
                            <div className="text-center py-12 px-6">
                                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                <h3 className="text-lg font-medium text-slate-600 mb-2">Nenhum recibo encontrado</h3>
                                <p className="text-slate-500 mb-6">
                                    {receipts.length === 0 ? "Crie a sua primeira fatura para começar" : "Tente ajustar os filtros de pesquisa"}
                                </p>
                                {receipts.length === 0 && (
                                    <Button onClick={() => setShowCreateModal(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Criar Primeira Fatura
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50">
                                            <TableHead className="font-semibold min-w-[100px]">ID</TableHead>
                                            <TableHead className="font-semibold min-w-[150px]">Cliente</TableHead>
                                            <TableHead className="font-semibold min-w-[200px]">Trajeto</TableHead>
                                            <TableHead className="font-semibold min-w-[120px]">Data/Hora</TableHead>
                                            <TableHead className="font-semibold min-w-[100px]">Distância</TableHead>
                                            <TableHead className="font-semibold min-w-[100px]">Valor</TableHead>
                                            <TableHead className="font-semibold min-w-[100px]">Status</TableHead>
                                            <TableHead className="text-center font-semibold min-w-[120px]">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredReceipts.map((receipt) => (
                                            <TableRow key={receipt.id} className="hover:bg-slate-50/50">
                                                <TableCell className="font-mono text-sm">
                                                    TF-{receipt.id.slice(-8)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                        <span className="font-medium truncate">{receipt.clientName}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-1 text-sm">
                                                        <span className="text-slate-600 truncate max-w-[80px]">{receipt.origin}</span>
                                                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                                        <span className="text-slate-600 truncate max-w-[80px]">{receipt.destination}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div className="font-medium">{new Date(receipt.tripDate).toLocaleDateString("pt-PT")}</div>
                                                        <div className="text-slate-500 flex items-center">
                                                            <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                                                            {receipt.tripTime}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {receipt.distance ? (
                                                        <Badge variant="secondary" className="font-mono">
                                                            {receipt.distance} km
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-slate-400 text-sm">N/A</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-bold text-green-600">
                                                        €{Number(receipt.amount).toFixed(2)}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                                                        {receipt.status === "COMPLETED" ? "Completa" : receipt.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end space-x-1">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <InvoiceModal
                open={showCreateModal}
                onOpenChange={setShowCreateModal}
                onSuccess={handleReceiptCreated}
            />
        </div>
    )
}
