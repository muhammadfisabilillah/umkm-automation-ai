import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">BantuBisnis AI</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link href="/interview">Mulai Gratis</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Otomasi Bisnis UMKM Anda<br />
          <span className="text-indigo-600">Dalam 15 Menit</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI kami akan interview bisnis Anda, lalu otomatis buatkan sistem 
          custom untuk kelola order, inventory, keuangan, dan customer.
        </p>
        <Button size="lg" className="text-lg px-8" asChild>
          <Link href="/interview">
            Coba Sekarang - Gratis
          </Link>
        </Button>
        
        <div className="mt-4 text-sm text-gray-500">
          ✓ Gratis selamanya untuk fitur dasar  ✓ Tidak perlu kartu kredit
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Masalah yang Kami Selesaikan
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>😫 Pencatatan Manual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Capek catat pesanan di buku? Sering lupa? Susah hitung untung rugi?
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>💸 Software Mahal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Custom software puluhan juta. Ready-made terlalu generic & susah dipakai.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>⏰ Buang Waktu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                10-15 jam per minggu habis untuk admin. Harusnya fokus ke bisnis!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Solusi Kami
          </h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-4">
                🤖 AI yang Interview Bisnis Anda
              </h4>
              <p className="text-gray-600 mb-6">
                Cukup chat 15 menit dengan AI kami. Jawab pertanyaan tentang bisnis, 
                workflow, dan masalah yang dihadapi. AI akan paham kebutuhan Anda.
              </p>
              
              <h4 className="text-2xl font-semibold mb-4">
                ⚡ Sistem Custom Auto-Generated
              </h4>
              <p className="text-gray-600 mb-6">
                AI langsung buatkan sistem yang pas untuk bisnis Anda. Tidak generic, 
                tapi truly customized sesuai kebutuhan.
              </p>
              
              <h4 className="text-2xl font-semibold mb-4">
                📱 Terintegrasi dengan Tools Favorit
              </h4>
              <p className="text-gray-600">
                WhatsApp, Google Sheets, payment gateway - semua connect otomatis. 
                Tidak perlu ganti workflow yang sudah biasa.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h5 className="text-xl font-semibold mb-4">Contoh Hasil:</h5>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Order otomatis masuk dari WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Stok berkurang otomatis saat ada order</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Alert kalau barang mau habis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Laporan keuangan auto-generate</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Database customer dengan riwayat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Siap Tingkatkan Bisnis Anda?
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Bergabung dengan ratusan UMKM yang sudah hemat 15 jam per minggu
        </p>
        <Button size="lg" className="text-lg px-8" asChild>
          <Link href="/interview">
            Mulai Sekarang - 100% Gratis
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2026 BantuBisnis AI. Dibuat untuk UMKM Indonesia 🇮🇩</p>
        </div>
      </footer>
    </div>
  )
}