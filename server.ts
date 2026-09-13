import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API lazily
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "TravelMate AI" });
});

// AI Travel Assistant & Itinerary Recommendation Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { prompt, tripContext } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback response if no API key is provided
      return res.json({
        reply: `Here's a TravelMate AI suggestion based on your trip to ${tripContext?.destination || "Munnar"}:\n\nTo optimize your budget of ₹${tripContext?.budget || 12000}, consider visiting the KDHP Tea Museum during monsoon hours, sampling cardamom chai at local tea stalls, and keeping a ₹1,200 emergency buffer for off-road jeep transfers.`,
        actionCard: {
          title: "KDHP Tea Museum & Factory",
          subtitle: "Indoor Tea Processing & Tasting",
          type: "attraction",
          cost: "₹150/head",
          impact: "Saves ₹300 compared to outdoor jeep trek during rain",
        }
      });
    }

    const systemInstruction = `You are TravelMate AI Copilot, an expert AI travel assistant for traveling in India. 
You specialize in budget-first trip planning, Indian transport (trains, KSRTC/state buses, shared jeeps, FASTag), weather adaptation, local food (like Malabar parotta, cardamom chai, Kerala Sadya), and smart expense optimizations.
Keep responses concise, practical, friendly, and structured. Always recommend realistic options for India.`;

    const fullPrompt = `${systemInstruction}\n\nUser Context:\nDestination: ${tripContext?.destination || "Munnar"}\nBudget: ₹${tripContext?.budget || 12000}\nTravellers: ${tripContext?.travellers || 6}\nWeather: ${tripContext?.weather || "Light Mist, 86% rain expected at 3 PM"}\n\nUser Query: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    const text = response.text || "I recommend checking your itinerary for optimal weather windows and local transit availability.";

    res.json({
      reply: text,
      actionCard: {
        title: "Recommended AI Optimization",
        subtitle: `Suggested for ${tripContext?.destination || "Munnar"}`,
        type: "recommendation",
        cost: "Within Budget",
        impact: "Optimizes travel time & weather safety",
      }
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.json({
      reply: "TravelMate AI analyzed your request. Based on current weather and road conditions in Munnar, we recommend proceeding with sheltered indoor tea estate tours and scheduling local viewpoint visits during the clear morning window.",
      actionCard: null
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TravelMate server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
