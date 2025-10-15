import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Transcript Sender - Reuniones',
  description: 'Envía transcripciones de reuniones de forma segura',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

