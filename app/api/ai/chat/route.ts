import { NextRequest, NextResponse } from "next/server";
import { chatWithAI } from "@/lib/ai/groq";
import { prisma } from "@/lib/prisma";

// GET: Ambil daftar sesi (untuk sidebar) ATAU isi chat (untuk layar utama)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const listAll = searchParams.get("listAll");

  try {
    // Jika minta daftar semua sesi (untuk sidebar)
    if (listAll === "true") {
      const sessions = await prisma.conversation.findMany({
        select: { sessionId: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' }
      });
      return NextResponse.json(sessions);
    }

    // Jika minta isi chat dari satu sesi tertentu
    if (sessionId) {
      const data = await prisma.conversation.findUnique({ where: { sessionId } });
      return NextResponse.json(data?.messages || []);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST: Tanya AI & Simpan ke database Railway
export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();
    const aiResponse = await chatWithAI(messages);
    const finalMessages = [...messages, { role: 'assistant', content: aiResponse }];

    await prisma.conversation.upsert({
      where: { sessionId },
      update: { messages: finalMessages as any },
      create: {
        sessionId,
        messages: finalMessages as any,
        status: "ACTIVE",
      },
    });

    return NextResponse.json(aiResponse);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus sesi tertentu
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ success: false });

  try {
    await prisma.conversation.delete({ where: { sessionId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}