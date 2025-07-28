"use client"

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { ReceiptData } from './receipt-success-actions'
import { getReceiptViewUrl } from '@/lib/qr-utils'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4
  },

  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40
  },
  companyInfo: {
    flex: 1,
    marginRight: 20
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4
  },
  companyAddress: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.3
  },
  qrCodeSection: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrCodeImage: {
    width: 120,
    height: 120
  },

  // Receipt Info Section
  receiptInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10
  },
  receiptInfoColumn: {
    flex: 1
  },
  infoLabel: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 2
  },
  infoValue: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold'
  },

  // Service Details Table
  serviceTable: {
    marginBottom: 40
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 8,
    marginBottom: 12
  },
  tableHeaderCell: {
    fontSize: 8,
    color: '#666666',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  tableCell: {
    fontSize: 9,
    color: '#000000'
  },
  serviceName: {
    flex: 2,
    marginRight: 10
  },
  serviceDetails: {
    flex: 2,
    marginRight: 10
  },
  serviceAmount: {
    flex: 1,
    textAlign: 'right'
  },

  // Totals Section
  totalsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: '#EEEEEE'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  totalLabel: {
    fontSize: 9,
    color: '#666666'
  },
  totalValue: {
    fontSize: 9,
    color: '#000000'
  },
  finalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTop: 2,
    borderTopColor: '#000000'
  },
  finalTotalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000'
  },
  finalTotalValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000'
  },

  // Footer Section
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 20
  },
  footerColumn: {
    flex: 1,
    marginRight: 20
  },
  footerTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4
  },
  footerText: {
    fontSize: 7,
    color: '#666666',
    lineHeight: 1.3
  },
  footerUrl: {
    fontSize: 7,
    color: '#666666',
    lineHeight: 1.3
  },
  
  // Disclaimer Section
  disclaimer: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 6,
    color: '#999999',
    lineHeight: 1.2
  }
})

interface MinimalReceiptPDFTemplateProps {
  receipt: ReceiptData
  qrCodeDataUrl?: string
}

export function MinimalReceiptPDFTemplate({ receipt, qrCodeDataUrl }: MinimalReceiptPDFTemplateProps) {
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount)
    return new Intl.NumberFormat('pt-CV', {
      style: 'currency',
      currency: 'CVE'
    }).format(num)
  }

  const formatDate = (dateStr: string | Date) => {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const receiptUrl = getReceiptViewUrl(receipt.id)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>TaxiFatura</Text>
            <Text style={styles.companyAddress}>
              Serviço de Faturação para Táxis{'\n'}
              Cabo Verde{'\n'}
              www.taxifatura.cv
            </Text>
          </View>

          {/* QR Code */}
          <View style={styles.qrCodeSection}>
            {qrCodeDataUrl ? (
              <Image style={styles.qrCodeImage} src={qrCodeDataUrl} />
            ) : (
              <View style={{ width: 120, height: 120, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 8, color: '#666' }}>QR Code</Text>
              </View>
            )}
          </View>
        </View>

        {/* Receipt Information */}
        <View style={styles.receiptInfo}>
          <View style={styles.receiptInfoColumn}>
            <Text style={styles.infoLabel}>Recibo</Text>
            <Text style={styles.infoValue}>#{receipt.id.slice(-8).toUpperCase()}</Text>
          </View>

          <View style={styles.receiptInfoColumn}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValue}>{formatDate(receipt.tripDate)}</Text>
          </View>

          <View style={styles.receiptInfoColumn}>
            <Text style={styles.infoLabel}>Hora</Text>
            <Text style={styles.infoValue}>{receipt.tripTime}</Text>
          </View>
        </View>

        {/* Service Details Table */}
        <View style={styles.serviceTable}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={[styles.tableHeaderCell, styles.serviceName]}>
              <Text>Serviço</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.serviceDetails]}>
              <Text>Detalhes</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.serviceAmount]}>
              <Text>Valor</Text>
            </View>
          </View>

          {/* Service Row */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.serviceName]}>
              <Text>Transporte de Táxi</Text>
            </View>
            <View style={[styles.tableCell, styles.serviceDetails]}>
              <Text>
                Cliente: {receipt.clientName}{'\n'}
                Origem: {receipt.origin}{'\n'}
                Destino: {receipt.destination}
                {receipt.distance && `\nDistância: ${receipt.distance} km`}
              </Text>
            </View>
            <View style={[styles.tableCell, styles.serviceAmount]}>
              <Text>{formatCurrency(receipt.amount)}</Text>
            </View>
          </View>

          {/* Vehicle Info Row */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.serviceName]}>
              <Text>Veículo</Text>
            </View>
            <View style={[styles.tableCell, styles.serviceDetails]}>
              <Text>
                {receipt.vehicle.make} {receipt.vehicle.model}{'\n'}
                Matrícula: {receipt.vehicle.licensePlate}
                {receipt.vehicle.color && `\nCor: ${receipt.vehicle.color}`}
              </Text>
            </View>
            <View style={[styles.tableCell, styles.serviceAmount]}>
              <Text>-</Text>
            </View>
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatCurrency(receipt.amount)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IVA</Text>
            <Text style={styles.totalValue}>
              Isento de IVA{'\n'}
              Art. 9º CIVA
            </Text>
          </View>

          <View style={styles.finalTotal}>
            <Text style={styles.finalTotalLabel}>TOTAL</Text>
            <Text style={styles.finalTotalValue}>{formatCurrency(receipt.amount)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>TaxiFatura</Text>
            <Text style={styles.footerText}>
              Sistema de Faturação{'\n'}
              para Serviços de Táxi{'\n'}
              Cabo Verde
            </Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Condutor</Text>
            <Text style={styles.footerText}>
              {receipt.vehicle.user.name}{'\n'}
              Licenciado para Transporte{'\n'}
              de Passageiros
            </Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Validade</Text>
            <Text style={styles.footerText} hyphenationCallback={(word: string) => [word]}>
              Escaneie o QR Code acima{'\n'}
              ou consulte no link:{'\n'}
              {receiptUrl}
            </Text>
          </View>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Este recibo é uma comprovação de prestação de serviço de transporte e não uma nota fiscal. A validade deste documento depende das políticas da entidade que o solicita.
        </Text>
      </Page>
    </Document>
  )
}