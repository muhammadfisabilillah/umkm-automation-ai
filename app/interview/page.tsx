"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Sparkles, Loader2, ArrowLeft } from 'lucide-react';

export default function ModernChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! Saya AI Business Consultant Anda. Mari kita diskusikan bisnis Anda untuk membangun sistem otomatisasi yang tepat. Apa nama bisnis Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulasi integrasi dengan API Groq kamu
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-100">
      {/* Header Chat - Tetap Profesional */}
      <header className="px-6 py-4 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
            <Bot className="text-emerald-400 size-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide">AI Business Architect</h2>
            <div className="flex items-center gap-1.5">
              <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">System Generating Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
          >
            {/* Avatar */}
            <div className={`size-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
              msg.role === 'assistant' 
              ? 'bg-slate-800 border border-slate-700 text-emerald-400' 
              : 'bg-emerald-500 text-black'
            }`}>
              {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>

            {/* Bubble Chat */}
            <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'assistant'
                ? 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'
                : 'bg-emerald-600 text-white rounded-tr-none font-medium'
              }`}>
                {msg.content}
              </div>
              <p className="text-[10px] text-slate-500 font-medium px-1">
                {msg.role === 'assistant' ? 'BantuBisnis AI' : 'Anda'} • Baru saja
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-4 animate-pulse">
            <div className="size-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
              <Loader2 className="text-emerald-400 size-5 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none w-24">
              <div className="h-2 bg-slate-700 rounded-full w-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Floating Style */}
      <footer className="p-6 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl flex items-center p-2 shadow-2xl">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Jelaskan proses bisnis Anda di sini..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-slate-200 placeholder:text-slate-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-black p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-3 flex items-center justify-center gap-1">
            <Sparkles size={10} className="text-emerald-500" /> 
            AI sedang menganalisis alur bisnis untuk pembuatan sistem otomatis.
          </p>
        </div>
      </footer>
    </div>
  );
}