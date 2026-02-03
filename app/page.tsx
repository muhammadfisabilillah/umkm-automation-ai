"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import ChatInterface from "@/components/ui/ChatInterface"; 

export default function BusinessAIApp() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
            <Zap className="size-5 text-black fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            BantuBisnis.ai
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
          <a href="#proses" className="hover:text-emerald-400 transition">Proses</a>
          <a href="#fitur" className="hover:text-emerald-400 transition">Fitur</a>
        </div>
        <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg active:scale-95">
          Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="size-3" /> Digitalisasi UMKM 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
            Ubah Bisnis Anda <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Menjadi Otomatis.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed mx-auto md:mx-0">
            AI kami akan mewawancarai proses bisnis Anda, lalu membangun sistem custom untuk Order, Inventory, dan Keuangan dalam hitungan menit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center justify-center gap-2 bg-emerald-500 text-[#020617] px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all active:scale-95"
            >
              Mulai Interview <ArrowRight className="size-5" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all text-white">
              Lihat Demo
            </button>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10 rounded-full" />
          {[
            { icon: <BarChart3 />, title: "Financial AI", desc: "Laporan keuangan otomatis dari percakapan harian.", color: "text-emerald-400" },
            { icon: <Package />, title: "Inventory", desc: "Stok terupdate secara real-time untuk setiap pesanan.", color: "text-blue-400" },
            { icon: <ClipboardCheck />, title: "Smart Order", desc: "Kelola pesanan pelanggan tanpa perlu input manual.", color: "text-cyan-400" },
            { icon: <Users />, title: "CRM", desc: "Database cerdas untuk mengenal profil pelanggan Anda.", color: "text-purple-400" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col h-full p-8 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md hover:border-emerald-500/50 transition-all group">
              <div className="size-12 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon as React.ReactElement, { className: `size-6 ${item.color}` })}
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CHAT BOT (OVERLAY) */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-[#020617]/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-6xl h-[85vh] relative animate-in zoom-in-95 duration-300">
            {/* Mengirim fungsi setIsChatOpen agar tombol X di dalam komponen berfungsi */}
            <ChatInterface onClose={() => setIsChatOpen(false)} /> 
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 text-[10px] font-medium tracking-widest uppercase text-center text-slate-400">
          <p>© 2026 BantuBisnis.ai - Trusted Business Intelligence</p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-white transition">Privasi Keamanan</span>
            <span className="cursor-pointer hover:text-white transition">API Dokumentasi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}