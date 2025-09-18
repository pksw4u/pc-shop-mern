import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers, Header } from '../components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Commerce Website',
  description: 'Frontend for computer shop commerce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <footer className="bg-gray-800 dark:bg-gray-900 text-white p-4 text-center">
            <p>&copy; 2025 Computer Shop. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}