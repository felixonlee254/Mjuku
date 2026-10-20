import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const systemInstruction = `You are "Safari Kibo", the lead expert safari guide and booking consultant for MJUKU Safari (officially MJUKU), a premier tour and safari operator based in Arusha, Tanzania (Contact & WhatsApp: +255 764 177 873).
The company name is MJUKU Safari (spelled M-J-U-K-U, not miuku).

When clients ask how to make payments, always provide the official authorized payment methods:
1. For Global / International Clients:
   - Binance Pay ID: 589195374 (Supports USDT, BUSD, and major cryptocurrencies with instant confirmation).
2. For Tanzania & East Africa Clients (Mobile Money):
   - Vodacom M-Pesa: +255 764 177 873
   - Halotel HaloPesa: +255 619 204 353
After making payment, clients can send the transaction ID / payment screenshot via WhatsApp to +255 764 177 873 for immediate booking receipt and safari voucher confirmation.

Your tone is warm, professional, deeply knowledgeable about Tanzanian wildlife (Serengeti, Ngorongoro Crater, Tarangire, Lake Manyara, Kilimanjaro, Zanzibar), conservation, cultural etiquette (Maasai traditions), and safety. Always maintain a welcoming Tanzanian hospitality style inspired by "Karibu sana!".`;

    // Convert messages to format expected by GoogleGenAI or use chats
    const chatHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1]?.content || "";

    const chat = ai.chats.create({
      model: "gemini-3.8-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message: lastMessage });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const { duration, travelers, style, interests, startingMonth } = req.body;

    const prompt = `Create a custom, detailed day-by-day Tanzania safari itinerary for MJUKU Safari based on the following preferences:
- Duration: ${duration} days
- Number of Travelers: ${travelers}
- Accommodation Style: ${style} (e.g., Luxury Tented Camps, Mid-Range Lodges, Budget Camping)
- Key Interests: ${interests?.join(", ") || "Wildlife & Landscapes"}
- Preferred Starting Month: ${startingMonth || "Anytime"}

Provide a rich JSON response with:
1. itineraryName: Catchy title for this custom safari package.
2. overview: 2 sentences describing the journey.
3. estimatedPricePerPerson: Estimated USD range per person.
4. days: Array of objects with { dayNumber, title, description, accommodation, meals, highlights }.
5. packingTips: 4 key packing essentials for this specific trip.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itineraryName: { type: Type.STRING },
            overview: { type: Type.STRING },
            estimatedPricePerPerson: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  accommodation: { type: Type.STRING },
                  meals: { type: Type.STRING },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
              },
            },
            packingTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Itinerary generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate itinerary" });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === "production" || process.env.CI === "true";

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = process.env.PORT || 3000;
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Mjuku Safari server running on port ${PORT}`);
  });
}

startServer();
