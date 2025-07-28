"use client"

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { ReceiptData } from './receipt-success-actions'

// Register fonts if needed (optional)
// Font.register({
//   family: 'Open Sans',
//   src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf'
// })

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: 2,
    borderBottomColor: '#059669',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5
  },
  receiptId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    backgroundColor: '#F3F4F6',
    padding: 8,
    marginVertical: 15,
    borderRadius: 4
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 4
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    fontSize: 10,
    color: '#6B7280',
    width: '40%',
    fontWeight: 'bold'
  },
  value: {
    fontSize: 10,
    color: '#374151',
    width: '60%'
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
    padding: 4,
    borderRadius: 4,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    backgroundColor: '#ECFDF5',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF',
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10
  }
})

// interface ReceiptData {
//   id: string
//   clientName: string
//   origin: string
//   destination: string
//   distance?: number
//   amount: string
//   status: string
//   tripDate: string | Date
//   tripTime: string
//   notes?: string
//   vehicle: {
//     make: string
//     model: string
//     licensePlate: string
//     color?: string
//     user: {
//       name: string
//     }
//   }
// }

interface ReceiptPDFTemplateProps {
  receipt: ReceiptData
}

export function ReceiptPDFTemplate({ receipt }: ReceiptPDFTemplateProps) {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Em Processamento'
      case 'COMPLETED':
        return 'Concluído'
      case 'SENT':
        return 'Enviado'
      default:
        return 'Pendente'
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>TaxiFatura</Text>
          <Text style={styles.subtitle}>Recibo de Serviço de Táxi</Text>
          <Text style={styles.subtitle}>Cabo Verde</Text>
        </View>

        {/* Receipt ID */}
        <Text style={styles.receiptId}>
          Recibo #{receipt.id.slice(-8).toUpperCase()}
        </Text>

        {/* Status */}
        <View style={{ alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.statusBadge}>
            Estado: {getStatusLabel(receipt.status)}
          </Text>
        </View>

        {/* Vehicle Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Veículo</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Veículo:</Text>
            <Text style={styles.value}>{receipt.vehicle.make} {receipt.vehicle.model}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Matrícula:</Text>
            <Text style={styles.value}>{receipt.vehicle.licensePlate}</Text>
          </View>
          {receipt.vehicle.color && (
            <View style={styles.row}>
              <Text style={styles.label}>Cor:</Text>
              <Text style={styles.value}>{receipt.vehicle.color}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Condutor:</Text>
            <Text style={styles.value}>{receipt.vehicle.user.name}</Text>
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes da Viagem</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.value}>{receipt.clientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Origem:</Text>
            <Text style={styles.value}>{receipt.origin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.value}>{receipt.destination}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{formatDate(receipt.tripDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{receipt.tripTime}</Text>
          </View>
          {receipt.distance && (
            <View style={styles.row}>
              <Text style={styles.label}>Distância:</Text>
              <Text style={styles.value}>{receipt.distance} km</Text>
            </View>
          )}
          {receipt.notes && (
            <View style={styles.row}>
              <Text style={styles.label}>Notas:</Text>
              <Text style={styles.value}>{receipt.notes}</Text>
            </View>
          )}
        </View>

        {/* Amount */}
        <Text style={styles.amount}>
          Valor Total: {formatCurrency(receipt.amount)}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Obrigado por utilizar o nosso serviço!</Text>
          <Text>TaxiFatura - Sistema de Faturação para Táxis</Text>
          <Text>Documento gerado em {new Date().toLocaleString('pt-PT')}</Text>
        </View>
      </Page>
    </Document>
  )
}