import { Metadata } from 'next'

const siteConfig = {
  name: 'TaxiFatura - Faturas Digitais para Táxis',
  description: 'Sistema profissional de faturação para táxis em Cabo Verde. Crie recibos e faturas digitais de forma simples e rápida.',
  url: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'https://taxifatura.cv',
  ogImage: '/og.png',
  links: {
    twitter: 'https://twitter.com/taxifatura',
    facebook: 'https://facebook.com/taxifatura',
    instagram: 'https://instagram.com/taxifatura'
  }
}

export function createMetadata({
  title,
  description,
  image,
  url,
  type = 'website'
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
  type?: 'website' | 'article'
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      'taxi',
      'fatura',
      'recibo',
      'cabo verde',
      'transporte',
      'digital',
      'sistema',
      'profissional',
      'condutor',
      'passageiro',
      'pagamento',
      'invoice',
      'receipt',
      'cape verde'
    ],
    authors: [
      {
        name: 'TaxiFatura',
        url: siteConfig.url
      }
    ],
    creator: 'TaxiFatura',
    publisher: 'TaxiFatura',
    // formatDetection: {
    //   email: false,
    //   address: false,
    //   telephone: false
    // },
    metadataBase: new URL(siteConfig.url),
    // alternates: {
    //   canonical: metaUrl
    // },
    // robots: {
    //   index: !noIndex,
    //   follow: !noIndex,
    //   googleBot: {
    //     index: !noIndex,
    //     follow: !noIndex,
    //     'max-video-preview': -1,
    //     'max-image-preview': 'large',
    //     'max-snippet': -1
    //   }
    // },
    openGraph: {
      type,
      locale: 'pt_CV',
      alternateLocale: ['pt_PT', 'pt_BR'],
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@taxifatura',
      creator: '@taxifatura',
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle
        }
      ]
    },
    // facebook: {
    //   appId: process.env.FACEBOOK_APP_ID!
    // },
    // verification: {
    //   google: process.env.GOOGLE_SITE_VERIFICATION,
    //   yandex: process.env.YANDEX_VERIFICATION,
    //   yahoo: process.env.YAHOO_SITE_VERIFICATION,
    //   other: {
    //     'msvalidate.01': process.env.BING_SITE_VERIFICATION || ''
    //   }
    // },
    category: 'Business',
    classification: 'Business Application',
    // referrer: 'origin-when-cross-origin',
    // colorScheme: 'light dark',
    // themeColor: [
    //   { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    //   { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
    // ],
    // viewport: {
    //   width: 'device-width',
    //   initialScale: 1,
    //   maximumScale: 1,
    //   userScalable: false,
    //   viewportFit: 'cover'
    // },
    // appleWebApp: {
    //   capable: true,
    //   title: siteConfig.name,
    //   statusBarStyle: 'default',
    //   startupImage: [
    //     {
    //       url: '/apple-splash-2048-2732.png',
    //       media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    //     },
    //     {
    //       url: '/apple-splash-1668-2224.png', 
    //       media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    //     },
    //     {
    //       url: '/apple-splash-1536-2048.png',
    //       media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    //     },
    //     {
    //       url: '/apple-splash-1125-2436.png',
    //       media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    //     },
    //     {
    //       url: '/apple-splash-1242-2208.png',
    //       media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    //     },
    //     {
    //       url: '/apple-splash-750-1334.png',
    //       media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    //     },
    //     {
    //       url: '/apple-splash-640-1136.png',
    //       media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    //     }
    //   ]
    // },
    // applicationName: siteConfig.name,
    // generator: 'Next.js',
    // manifest: '/site.webmanifest',
    // icons: {
    //   icon: [
    //     { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    //     { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    //     { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    //   ],
    //   apple: [
    //     { url: '/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
    //     { url: '/apple-touch-icon-60x60.png', sizes: '60x60', type: 'image/png' },
    //     { url: '/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
    //     { url: '/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' },
    //     { url: '/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
    //     { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
    //     { url: '/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
    //     { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
    //     { url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' }
    //   ],
    //   other: [
    //     {
    //       rel: 'icon',
    //       type: 'image/svg+xml',
    //       url: '/favicon.svg'
    //     },
    //     {
    //       rel: 'mask-icon',
    //       url: '/safari-pinned-tab.svg',
    //       color: '#3b82f6'
    //     }
    //   ]
    // },
    // other: {
    //   'mobile-web-app-capable': 'yes',
    //   'apple-mobile-web-app-capable': 'yes',
    //   'apple-mobile-web-app-status-bar-style': 'default',
    //   'apple-mobile-web-app-title': siteConfig.name,
    //   'application-name': siteConfig.name,
    //   'msapplication-TileColor': '#3b82f6',
    //   'msapplication-TileImage': '/mstile-144x144.png',
    //   'msapplication-config': '/browserconfig.xml',
    //   'theme-color': '#3b82f6'
    // }
  }
}

// Default metadata for the application
export const defaultMetadata: Metadata = createMetadata()

// Specific metadata generators for different page types
export const homeMetadata: Metadata = createMetadata({
  title: 'Sistema de Faturação para Táxis',
  description: 'Crie recibos e faturas profissionais para o seu serviço de táxi em Cabo Verde. Solução digital completa para condutores e empresas de transporte.'
})

export const dashboardMetadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'Gerencie os seus recibos, faturas e histórico de viagens no painel de controle do TaxiFatura.',
  noIndex: true
})

export const receiptMetadata = (receiptId: string): Metadata => createMetadata({
  title: `Recibo #${receiptId.slice(-8).toUpperCase()}`,
  description: 'Visualize e baixe o seu recibo de táxi digital. Documento válido e verificável.',
  url: `/receipt/${receiptId}`,
  type: 'article'
})

export const demoMetadata: Metadata = createMetadata({
  title: 'Demo - Experimente o Sistema',
  description: 'Teste o TaxiFatura gratuitamente. Veja como funciona o nosso sistema de faturação para táxis antes de se registar.'
})

// JSON-LD structured data generators
export function generateReceiptJsonLd(receipt: {
  id: string
  clientName: string
  amount: string
  tripDate: string
  origin: string
  destination: string
  vehicle: {
    make: string
    model: string
    licensePlate: string
    user: { name: string }
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Invoice',
    identifier: receipt.id,
    customer: {
      '@type': 'Person',
      name: receipt.clientName
    },
    provider: {
      '@type': 'TaxiService',
      name: 'TaxiFatura',
      serviceOperator: {
        '@type': 'Person',
        name: receipt.vehicle.user.name
      }
    },
    totalPaymentDue: {
      '@type': 'MonetaryAmount',
      currency: 'CVE',
      value: receipt.amount
    },
    paymentDueDate: receipt.tripDate,
    description: `Serviço de táxi de ${receipt.origin} para ${receipt.destination}`,
    referencesOrder: {
      '@type': 'Order',
      orderNumber: receipt.id,
      orderDate: receipt.tripDate,
      orderDelivery: {
        '@type': 'ParcelDelivery',
        originAddress: {
          '@type': 'PostalAddress',
          addressLocality: receipt.origin,
          addressCountry: 'CV'
        },
        deliveryAddress: {
          '@type': 'PostalAddress',
          addressLocality: receipt.destination,
          addressCountry: 'CV'
        }
      }
    }
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TaxiFatura',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CV',
      addressLocality: 'Praia'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'Creole']
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.twitter,
      siteConfig.links.instagram
    ]
  }
}