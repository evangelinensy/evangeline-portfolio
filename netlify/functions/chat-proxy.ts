import type { Handler, HandlerEvent } from "@netlify/functions";

// Types for API responses
interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    finishReason?: string;
  }>;
  error?: {
    message?: string;
    code?: string;
  };
}

interface OpenAIStyleResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
    code?: string;
  };
}

// Rate limiting: simple in-memory store (resets on cold starts)
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60000; // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record || now > record.resetTime) {
    rateLimits.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Gemini API
async function callGemini(message: string, conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }>, systemInstruction: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not configured");

  const models = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-flash-lite"];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...conversationHistory.map((msg) => ({
                role: msg.role,
                parts: msg.parts,
              })),
              { role: "user", parts: [{ text: message }] },
            ],
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.message?.includes("not found") || errorData.error?.message?.includes("not supported")) {
          continue; // Try next model
        }
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }

      if (data.candidates?.[0]?.finishReason === "SAFETY") {
        return "I cannot respond to this request due to safety filters.";
      }

      throw new Error("Invalid response format from Gemini");
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

// Groq API
async function callGroq(message: string, conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }>, systemInstruction: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Groq API key not configured");

  const messages = [
    { role: "system", content: systemInstruction },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.parts[0].text,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const errorData: OpenAIStyleResponse = await response.json();
    throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
  }

  const data: OpenAIStyleResponse = await response.json();
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  throw new Error("Invalid response format from Groq");
}

// Hugging Face API
async function callHuggingFace(message: string, conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }>, systemInstruction: string): Promise<string> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error("Hugging Face API key not configured");

  const messages = [
    { role: "system", content: systemInstruction },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.parts[0].text,
    })),
    { role: "user", content: message },
  ];

  // Format as a text prompt for inference API
  const prompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n\n") + "\n\nassistant:";

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }
  if (data.generated_text) {
    return data.generated_text.trim();
  }

  throw new Error("Invalid response format from Hugging Face");
}

// Cerebras API
async function callCerebras(message: string, conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }>, systemInstruction: string): Promise<string> {
  const apiKey = process.env.CEREBRAS_API_KEY;
  if (!apiKey) throw new Error("Cerebras API key not configured");

  const messages = [
    { role: "system", content: systemInstruction },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.parts[0].text,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b",
      messages,
      max_completion_tokens: 1024,
      temperature: 0.2,
      top_p: 1,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorData: OpenAIStyleResponse = await response.json();
    throw new Error(errorData.error?.message || `Cerebras API error: ${response.status}`);
  }

  const data: OpenAIStyleResponse = await response.json();
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  throw new Error("Invalid response format from Cerebras");
}

const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Rate limiting
  const clientIP = event.headers["x-forwarded-for"]?.split(",")[0] || "unknown";
  if (!checkRateLimit(clientIP)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: "Too many requests. Please wait a moment." }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { provider, message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Basic input sanitization
    const sanitizedMessage = message.slice(0, 4000); // Limit message length

    const systemInstruction = `You are TestMorph, a friendly AI assistant embedded in Evangeline's portfolio.
You help visitors learn about her work and answer questions about design, development, and AI.
Keep responses concise and helpful (2-3 sentences when possible).
You can discuss the TestMorph project itself - it's an AI chat interface that demonstrates:
- Multi-provider AI support (Gemini, Groq, Hugging Face, Cerebras)
- Beautiful morphing animations
- A clean, professional chat interface
Be helpful, friendly, and professional.`;

    let response: string;

    switch (provider) {
      case "groq":
        response = await callGroq(sanitizedMessage, conversationHistory, systemInstruction);
        break;
      case "huggingface":
        response = await callHuggingFace(sanitizedMessage, conversationHistory, systemInstruction);
        break;
      case "cerebras":
        response = await callCerebras(sanitizedMessage, conversationHistory, systemInstruction);
        break;
      case "gemini":
      default:
        response = await callGemini(sanitizedMessage, conversationHistory, systemInstruction);
        break;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response }),
    };
  } catch (error) {
    console.error("Chat proxy error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
    };
  }
};

export { handler };
