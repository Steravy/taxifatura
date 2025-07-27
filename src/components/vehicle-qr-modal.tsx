"use client"

import { useState } from "react"
import { QrCode, Copy, Download, Car, User, CheckCircle } from "lucide-react"
import QRCode from "react-qr-code"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SerializedVehicle } from "@/app/actions/types"

interface VehicleQRModalProps {
  vehicle: SerializedVehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VehicleQRModal({ vehicle, open, onOpenChange }: VehicleQRModalProps) {
  const [copied, setCopied] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!vehicle) return null

  // Generate the QR code URL
  const qrUrl = `${window.location.origin}/v/${vehicle.slug}/receipt-request`

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl)
      setCopied(true)
      toast.success("URL copiado para a área de transferência")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Erro ao copiar URL")
    }
  }

  const handleDownloadQR = () => {
    // Create a canvas to export the QR code
    const svg = document.querySelector('#qr-code-svg') as SVGElement
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `qr-code-${vehicle.licensePlate}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const QRModalContent = () => (
    <div className="space-y-8">
      {/* QR Code Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-6 bg-white rounded-lg border-2 border-slate-200 shadow-sm w-full max-w-sm aspect-square flex items-center justify-center">
            <QRCode
              id="qr-code-svg"
              value={qrUrl}
              size={300}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-800">QR Code para Recibos</h3>
          <p className="text-sm text-slate-600">
            Mostre este código ao cliente para gerar o recibo.
          </p>
        </div>
      </div>

      {/* URL Display - Commented out */}
      {/* <Card className="bg-slate-50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">URL do Formulário:</label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 px-3 py-2 bg-white border rounded text-sm text-slate-600 break-all">
                {qrUrl}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyUrl}
                className="shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleDownloadQR}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Descarregar QR
        </Button>
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code do Veículo {vehicle.licensePlate}
            </DialogTitle>
          </DialogHeader>
          <QRModalContent />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code do Veículo {vehicle.licensePlate}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            <div className="space-y-8">
              {/* QR Code Section */}
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-6 bg-white rounded-lg border-2 border-slate-200 shadow-sm w-full max-w-sm aspect-square flex items-center justify-center">
                    <QRCode
                      id="qr-code-svg"
                      value={qrUrl}
                      size={300}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-800">QR Code para Recibos</h3>
                  <p className="text-sm text-slate-600">
                    Mostre este código ao cliente para gerar o recibo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Action Button at bottom for drawer */}
          <div className="p-4 pt-0 pb-8">
            <Button
              variant="outline"
              onClick={handleDownloadQR}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Descarregar QR
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}