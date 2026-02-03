import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatWithAI(messages: ChatMessage[]) {
  // 1. Validasi API Key
  if (!process.env.GROQ_API_KEY) {
    console.error("ERROR: GROQ_API_KEY tidak ditemukan di .env.local");
    throw new Error("GROQ_API_KEY is not set in .env.local");
  }

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await groq.chat.completions.create({
        // Menggunakan model yang lebih umum tersedia di Groq
        model: "llama-3.3-70b-versatile", 
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const content = response.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No content received from AI response");
      }

      // Mengembalikan string langsung agar sinkron dengan UI
      return content;

    } catch (error) {
      attempt++;
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error(`Groq SDK Error (attempt ${attempt}):`, msg);

      // Jika terkena limit (429), tunggu sebentar lalu coba lagi
      if (attempt < maxRetries && (msg.includes("rate limit") || msg.includes("429"))) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      throw new Error(`AI Service Error: ${msg}`);
    }
  }

  throw new Error("Max retries exceeded for AI service");
}