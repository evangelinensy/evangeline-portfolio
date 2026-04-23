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
      model: "llama-3.3-70b-versatile",
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

// Cohere API
interface CohereResponse {
  message?: {
    content?: Array<{ type: string; text?: string }>;
  };
  text?: string;
  message_type?: string;
}

async function callCohere(message: string, conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }>, systemInstruction: string): Promise<string> {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error("Cohere API key not configured");

  const messages = [
    { role: "system", content: systemInstruction },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.parts[0].text,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.cohere.com/v2/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "command-r-plus",
      messages,
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cohere API error: ${response.status} - ${errorText}`);
  }

  const data: CohereResponse = await response.json();
  const text = data.message?.content?.find((c) => c.type === "text")?.text;
  if (text) return text;

  throw new Error("Invalid response format from Cohere");
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
    const { provider, message, conversationHistory = [], systemPrompt } = body;

    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Basic input sanitization
    const sanitizedMessage = message.slice(0, 4000); // Limit message length

    const defaultSystemInstruction = `You are a helpful AI assistant embedded in a web page. Answer questions concisely and helpfully in 1-3 sentences.`;

    const systemInstruction = (typeof systemPrompt === "string" && systemPrompt.trim())
      ? systemPrompt.trim()
      : defaultSystemInstruction;

    type ProviderFn = (m: string, h: typeof conversationHistory, s: string) => Promise<string>;
    const providers: Record<string, ProviderFn> = {
      gemini: callGemini,
      groq: callGroq,
      cohere: callCohere,
      huggingface: callHuggingFace,
      cerebras: callCerebras,
    };

    // Build fallback chain: selected provider first, then the rest in a sensible order.
    const fallbackOrder = ["gemini", "groq", "cohere", "huggingface", "cerebras"];
    const primary = providers[provider] ? provider : "gemini";
    const chain = [primary, ...fallbackOrder.filter((p) => p !== primary)];

    const isRecoverable = (err: unknown): boolean => {
      const msg = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
      return (
        msg.includes("429") ||
        msg.includes("rate limit") ||
        msg.includes("resource_exhausted") ||
        msg.includes("quota") ||
        msg.includes("overloaded") ||
        msg.includes("not configured") ||
        msg.includes("decommissioned") ||
        msg.includes("not found") ||
        msg.includes("500") ||
        msg.includes("502") ||
        msg.includes("503")
      );
    };

    let response: string | null = null;
    let lastError: unknown = null;
    for (const name of chain) {
      const fn = providers[name];
      if (!fn) continue;
      try {
        response = await fn(sanitizedMessage, conversationHistory, systemInstruction);
        break;
      } catch (err) {
        lastError = err;
        console.warn(`Provider ${name} failed:`, err instanceof Error ? err.message : err);
        if (!isRecoverable(err)) break;
      }
    }

    if (response === null) {
      throw lastError || new Error("All providers failed");
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
