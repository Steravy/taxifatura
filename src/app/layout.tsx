import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaxiFatura - Faturas digitais para taxistas",
  description: "Crie faturas digitais altamente profissionais para o seu de táxi em Cabo Verde. Aumente a confiança dos clientes e profissionalize o seu serviço.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={geistSans.className}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
