"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Sparkles, Loader2, Plus, MessageSquare, X, Trash2, AlertTriangle, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, id: string | null}>({ show: false, id: null });

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/ai/chat?listAll=true');
      const data = await res.json();
      if (Array.isArray(data)) setSessions(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSessions(); }, []);

  const formatSessionTitle = (id: string) => {
    if (id.startsWith('session-')) {
      const timestamp = parseInt(id.replace('session-', ''));
      if (!isNaN(timestamp)) {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} • Konsultasi`;
      }
    }
    return id || "Sesi Baru";
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([{ role: 'assistant', content: 'Selamat datang di **BantuBisnis Architect**. Saya akan memandu Anda merancang ekosistem bisnis yang otomatis. Apa fokus kita hari ini?' }]);
  };

  const loadSpecificSession = async (id: string) => {
    setIsLoading(true);
    setCurrentSessionId(id);
    try {
      const res = await fetch(`/api/ai/chat?sessionId=${id}`);
      const history = await res.json();
      setMessages(Array.isArray(history) ? history : []);
    } finally { setIsLoading(false); }
  };

  const executeDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      await fetch(`/api/ai/chat?sessionId=${deleteConfirm.id}`, { method: 'DELETE' });
      fetchSessions();
      if (currentSessionId === deleteConfirm.id) {
        setMessages([]);
        setCurrentSessionId("");
      }
    } finally { setDeleteConfirm({ show: false, id: null }); }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Otomatisasi sesi agar tombol tidak macet
    let activeId = currentSessionId || `session-${Date.now()}`;
    if (!currentSessionId) setCurrentSessionId(activeId);

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, sessionId: activeId }),
      });
      const aiText = await response.json();
      
      // Sanitasi data: Pastikan respon AI berbentuk string murni
      const sanitizedContent = typeof aiText === 'string' ? aiText : (aiText.content || JSON.stringify(aiText));
      
      setMessages(prev => [...prev, { role: 'assistant', content: sanitizedContent }]);
      fetchSessions();
    } finally { setIsLoading(false); }
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="flex h-full w-full bg-slate-950/80 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_80px_-20px_rgba(16,185,129,0.2)] relative font-sans">
      
      {/* SIDEBAR */}
      <div className="w-80 bg-black/20 border-r border-white/5 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <div className="size-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">System Core</h2>
        </div>

        <button onClick={handleNewChat} className="group relative flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold transition-all hover:bg-emerald-400 active:scale-95 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)]">
          <Plus size={18} strokeWidth={3} />
          <span className="text-sm">Mulai Sesi Baru</span>
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold px-3 mb-4">Arsip Diskusi</p>
          {sessions.map((s) => (
            <div key={s.sessionId} className="group relative px-1">
              <button 
                onClick={() => loadSpecificSession(s.sessionId)} 
                className={`flex items-center gap-3 w-full p-4 text-[11px] rounded-2xl transition-all border ${
                  currentSessionId === s.sessionId 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' 
                  : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300'
                }`}
              >
                <MessageSquare size={14} className={currentSessionId === s.sessionId ? 'text-emerald-500' : 'text-slate-700 group-hover:text-slate-500'} />
                <span className="truncate font-bold tracking-tight text-left">{formatSessionTitle(s.sessionId)}</span>
                {currentSessionId === s.sessionId && <ChevronRight size={14} className="ml-auto animate-in slide-in-from-left-2" />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ show: true, id: s.sessionId }); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all hover:scale-110"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT MAIN AREA */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-transparent via-slate-950/20 to-emerald-950/5 relative">
        <div className="px-12 py-8 border-b border-white/5 flex items-center justify-between backdrop-blur-3xl bg-slate-950/30">
          <div className="flex items-center gap-6 text-left">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20 animate-pulse" />
              <div className="relative p-3.5 bg-slate-900 border border-white/10 rounded-[1.2rem] text-emerald-500 shadow-2xl">
                <Bot size={26} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                BantuBisnis Architect
                <span className="size-1.5 bg-emerald-500 rounded-full animate-ping" />
              </h3>
              <p className="text-[10px] text-emerald-500/60 font-bold uppercase tracking-[0.2em]">Neural Network Active</p>
            </div>
          </div>

          <button onClick={onClose} className="size-11 flex items-center justify-center bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-full text-slate-400 hover:text-red-400 transition-all active:scale-90 group">
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-12 py-10 space-y-12 custom-scrollbar scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-1000">
              <Sparkles size={60} className="text-emerald-500/20" />
              <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-700">Awaiting Input Command</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom-6 fade-in duration-700`}>
              <div className={`size-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl transition-transform hover:rotate-6 ${
                msg.role === 'user' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-white/10 text-emerald-500'
              }`}>
                {msg.role === 'user' ? <User size={22} strokeWidth={2.5} /> : <Bot size={22} strokeWidth={1.5} />}
              </div>
              <div className={`max-w-[75%] p-7 rounded-[2.5rem] text-[15px] leading-[1.7] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] ${
                msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none font-medium' 
                : 'bg-slate-900/60 border border-white/5 text-slate-200 rounded-tl-none backdrop-blur-md'
              }`}>
                {/* Perbaikan proteksi Object children */}
                <div className="flex flex-col gap-6 text-left [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-3 [&_strong]:text-emerald-400 [&_strong]:font-black">
                  <ReactMarkdown>
                    {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Input Dock - Layering Fix */}
        <div className="px-12 pb-12 pt-4 relative z-50">
          <div className="group relative flex gap-4 bg-slate-900/40 border border-white/10 p-3.5 rounded-[2.5rem] focus-within:border-emerald-500/50 focus-within:bg-slate-900/80 transition-all duration-500 shadow-2xl backdrop-blur-3xl">
            <input 
              className="flex-1 bg-transparent border-none outline-none px-6 text-[15px] text-white placeholder:text-slate-700 font-bold uppercase tracking-widest text-left" 
              placeholder="Ketik Perintah Bisnis..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            />
            <button 
              onClick={handleSend} 
              className="relative z-10 bg-emerald-500 text-slate-950 p-5 rounded-full hover:bg-emerald-400 transition-all hover:rotate-12 active:scale-90 shadow-lg disabled:opacity-20"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-[0_0_100px_-20px_rgba(239,68,68,0.2)] max-w-sm w-full mx-4 text-center space-y-8 animate-in zoom-in-95 duration-300">
            <div className="size-20 bg-red-500/10 rounded-[1.8rem] flex items-center justify-center mx-auto text-red-500 ring-1 ring-red-500/20">
              <AlertTriangle size={36} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black text-white uppercase tracking-tighter italic underline decoration-red-500/50 text-center">Wipe History?</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium text-center">Data ini akan dihapus permanen dari Neural Network.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirm({ show: false, id: null })} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-2xl font-bold transition-all uppercase text-[10px] tracking-widest">Abort</button>
              <button onClick={executeDelete} className="flex-1 py-4 bg-red-500 hover:bg-red-400 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-500/30 uppercase text-[10px] tracking-widest">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL SCROLLBAR STYLING */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.2); }
      `}</style>
    </div>
  );
}