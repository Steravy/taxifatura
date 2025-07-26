import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Proativa - Candidaturas espontâneas feitas por ti",
  description: "Automatiza o envio de candidaturas espontâneas em massa. Encontra emprego sem procurar com a Proativa.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={geistSans.className}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
