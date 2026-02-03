"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  Zap, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import ChatInterface from "@/components/ui/ChatInterface"; 

export default function BusinessAIApp() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500/30 overflow-x-hidden font-sans relative">
      
      {/* 1. BACKGROUND EFFECTS - Rapi & Tidak Mengganggu */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      {/* 2. NAVIGATION - Glassmorphism Simpel */}
      <nav className="relative z-30 flex justify-between items-center px-10 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl shadow-lg">
            <Zap className="size-5 text-black fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            BantuBisnis<span className="text-emerald-500">.ai</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <a href="#" className="hover:text-emerald-400 transition-colors">Konsultasi</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Analisis</a>
        </div>

        <button className="px-8 py-3 bg-emerald-500 text-black hover:bg-emerald-400 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
          DASHBOARD
        </button>
      </nav>

      {/* 3. HERO SECTION - Dirapikan Spasi & Layoutnya */}
      <section className="relative z-10 max-w-7xl mx-auto px-10 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <ShieldCheck className="size-3.5" /> Partner Strategis Bisnis
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white">
            Bangun Bisnis <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-500">
              Tanpa Ragu.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed mx-auto lg:mx-0 font-medium">
            Bingung mulai dari mana? AI kami membedah ide Anda, menganalisis potensi pasar, dan merancang sistem agar bisnis Anda langsung jalan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="group flex items-center justify-center gap-3 bg-emerald-500 text-slate-950 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
            >
              Mulai Konsultasi <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-3 bg-slate-900/50 border border-white/5 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all text-slate-300">
              Lihat Demo
            </button>
          </div>
        </div>

        {/* FEATURE GRID - Dibuat Rapi & Tidak Tumpuk */}
        <div className="grid grid-cols-2 gap-6 relative">
          {[
            { icon: <BarChart3 />, title: "Ide Bisnis", desc: "Riset Pasar.", color: "from-emerald-400 to-emerald-600" },
            { icon: <Package />, title: "Sistem Stok", desc: "Otomasi Barang.", color: "from-blue-400 to-blue-600" },
            { icon: <ClipboardCheck />, title: "Alur Kerja", desc: "Digitalisasi Ops.", color: "from-cyan-400 to-cyan-600" },
            { icon: <Users />, title: "Cari Pelanggan", desc: "Target Cerdas.", color: "from-purple-400 to-purple-600" }
          ].map((item, idx) => (
            <div key={idx} className="group flex flex-col p-8 bg-slate-900/30 border border-white/5 rounded-[2.5rem] backdrop-blur-xl hover:border-emerald-500/30 transition-all hover:-translate-y-2 duration-500 shadow-xl">
              <div className={`size-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {React.cloneElement(item.icon as React.ReactElement, { className: `size-7 text-white` })}
              </div>
              <h3 className="font-black text-xl mb-2 text-white">{item.title}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CHAT */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="w-full max-w-6xl h-[85vh] relative animate-in zoom-in-95 duration-500">
            <ChatInterface onClose={() => setIsChatOpen(false)} /> 
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600">
          <div className="flex items-center gap-3 opacity-30">
            <Globe size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">UMKM Indonesia • 2026</p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest">Sistem Konsultasi Bisnis Terpercaya.</p>
        </div>
      </footer>
    </div>
  );
}