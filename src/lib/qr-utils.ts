export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    const QRCode = await import('qrcode')
    return await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

export function getReceiptViewUrl(receiptId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://taxifatura.cv'
  return `${baseUrl}/receipt/${receiptId}`
}