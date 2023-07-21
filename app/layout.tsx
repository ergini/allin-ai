import { Analytics }  from '@vercel/analytics/react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/ModalProvider'
import ToasterProvider from '@/components/ToasterProvider'
import CrispProvider from '@/components/CrispProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllIn AI - AI for all',
  description: 'AI to help you make better things',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
