import { NextRequest, NextResponse } from "next/server";
import { chatWithAI, type ChatMessage } from "@/lib/ai/groq";
import { createInterviewMessages } from "@/lib/ai/prompts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages?: ChatMessage[] };

    // Validate messages: must be an array and each item must have role and content
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' must be a non-empty array." },
        { status: 400 }
      );
    }
    for (const msg of messages) {
      if (!msg || typeof msg.role !== "string" || typeof msg.content !== "string") {
        return NextResponse.json(
          { error: "Invalid message format: each message must have 'role' and 'content' as strings." },
          { status: 400 }
        );
      }
    }

    const fullMessages = createInterviewMessages(messages);
    const aiResponse = await chatWithAI(fullMessages);

    // Optional: Log success for debugging (remove in production if not needed)
    console.log("AI response generated successfully.");

    return NextResponse.json({
      success: true,
      response: aiResponse,  // Assumed to be a string or object; ensure your client handles it
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("API ERROR:", errorMessage);  // Log full details server-side

    return NextResponse.json(
      {
        error: "Failed to get AI response. Please try again later.",
        // Removed 'details' to avoid leaking sensitive info
      },
      { status: 500 }
    );
  }
}