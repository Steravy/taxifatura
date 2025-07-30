import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { createMetadata } from "@/lib/metadata";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata();

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
      <GoogleAnalytics gaId="G-7LBQCYGL89" />
    </html>
  )
}
