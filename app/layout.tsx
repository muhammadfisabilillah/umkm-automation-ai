import "./globals.css"
import { Plus_Jakarta_Sans } from 'next/font/google'

// Konfigurasi font
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta', // Variabel untuk CSS
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      {/* Tambahkan 'font-sans' di body agar seluruh aplikasi otomatis 
        menggunakan font Plus Jakarta Sans yang baru saja di-load.
      */}
      <body className="font-sans min-h-screen antialiased">
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  )
}