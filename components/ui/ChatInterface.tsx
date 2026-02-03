"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Sparkles, Loader2, Plus, MessageSquare, X, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Menerima props onClose dari page.tsx
export default function ChatInterface({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ambil daftar riwayat dari Railway
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
        return `Diskusi - ${date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}`;
      }
    }
    return id || "Sesi Baru";
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([{ role: 'assistant', content: 'Halo! Saya **BantuBisnis Architect**. Siap membantu merancang sistem bisnis kamu. Apa yang ingin kita bahas?' }]);
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

  const deleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Hapus riwayat diskusi ini?")) return;
    try {
      await fetch(`/api/ai/chat?sessionId=${id}`, { method: 'DELETE' });
      fetchSessions();
      if (currentSessionId === id) {
        setMessages([]);
        setCurrentSessionId("");
      }
    } catch (err) { console.error(err); }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
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
      const content = typeof aiText === 'string' ? aiText : (aiText.error || "Gagal merespon.");
      setMessages(prev => [...prev, { role: 'assistant', content }]);
      fetchSessions();
    } finally { setIsLoading(false); }
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="flex h-full w-full bg-[#020617] text-slate-100 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative font-sans">
      
      {/* SIDEBAR */}
      <div className="w-80 bg-slate-950/40 backdrop-blur-xl border-r border-white/5 p-8 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="size-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">BantuBisnis AI</h2>
        </div>

        <button onClick={handleNewChat} className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-bold transition-all active:scale-[0.98]">
          <Plus size={20} strokeWidth={3} /> Obrolan Baru
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black px-2 mb-2">Riwayat Konsultasi</p>
          {sessions.map((s) => (
            <div key={s.sessionId} className="group relative">
              <button 
                onClick={() => loadSpecificSession(s.sessionId)} 
                className={`flex items-center gap-4 w-full p-4 text-xs rounded-2xl transition-all border ${currentSessionId === s.sessionId ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5'}`}
              >
                <MessageSquare size={16} />
                <span className="truncate pr-6 font-semibold">{formatSessionTitle(s.sessionId)}</span>
              </button>
              <button 
                onClick={(e) => deleteSession(e, s.sessionId)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#020617] via-[#020617] to-emerald-950/10 relative">
        
        {/* Tombol Tutup Sempurna (X Lingkaran) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 z-50 size-10 flex items-center justify-center bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-full text-slate-400 hover:text-red-400 transition-all backdrop-blur-md group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Header */}
        <div className="px-12 py-8 border-b border-white/5 flex items-center gap-5 bg-slate-950/20 backdrop-blur-md">
          <div className="p-3 bg-slate-900 border border-white/10 rounded-2xl text-emerald-500 shadow-inner">
            <Bot size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-base font-bold text-white tracking-tight">BantuBisnis Architect</h3>
            <p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest">Database Synced</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-12 py-10 space-y-10">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 text-center space-y-6">
              <Sparkles size={40} className="animate-pulse" />
              <p className="text-sm font-medium max-w-xs leading-relaxed text-slate-500">Mulai konsultasi bisnis kamu sekarang.</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-4`}>
              <div className={`size-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-white/10 text-emerald-500'}`}>
                {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
              </div>
              <div className={`max-w-[80%] p-6 rounded-[2rem] text-[15px] shadow-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-900/90 border border-white/10 text-slate-200'}`}>
                <div className="flex flex-col gap-5 leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-2 [&_strong]:text-emerald-400">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Input Dock */}
        <div className="px-12 pb-10 pt-4">
          <div className="flex gap-4 bg-slate-900/60 border border-white/10 p-3 rounded-[2.2rem] focus-within:border-emerald-500/40 transition-all backdrop-blur-2xl shadow-2xl">
            <input className="flex-1 bg-transparent border-none outline-none px-6 text-[15px] placeholder:text-slate-600 text-white" placeholder="Apa strategi bisnis yang ingin kamu diskusikan?" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} disabled={isLoading || !currentSessionId} className="bg-emerald-500 text-slate-950 p-4 rounded-full hover:bg-emerald-400 transition-all active:scale-90 shadow-xl shadow-emerald-500/10">
              <Send size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}