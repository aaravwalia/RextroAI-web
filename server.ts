import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json({ limit: "50mb" }));

  // Initialize Gemini client strictly on server
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Rate Limiting for AI Routes
  const aiRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 processing requests per windowMs
    message: { error: "Too many requests to AI services, please try again later." },
  });

  // General Health Route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/menu-scanner", aiRateLimiter, async (req, res) => {
    try {
      const { image, mimeType } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image data is required" });
      }

      const prompt = `Analyze this restaurant menu. 
      Extract all menu items and their prices. 
      Additionally, provide a rough estimate of the making cost (raw materials) for each item, typically 25-35% of the selling price, but use your judgement based on the dish.
      Respond strictly in JSON format as an array of objects matching this schema: 
      [{ "name": "Dish Name", "price": 10.99, "estimatedCost": 3.00, "category": "Category Name" }]
      Do not include any Markdown formatting like \`\`\`json or \`\`\`. Just output the array.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            { text: prompt },
            { inlineData: { data: image, mimeType: mimeType || "image/jpeg" } },
          ],
        },
      });

      let jsonStr = response.text || "[]";
      // Sanitize standard markdown ticks if they accidentally appear
      jsonStr = jsonStr.replace(/^```json\n?/, "").replace(/```$/,"").trim();
      
      const parsed = JSON.parse(jsonStr);
      res.json(parsed);
    } catch (err: any) {
      console.error("Menu scanner error:", err);
      res.status(500).json({ error: err.message || "Failed to parse menu" });
    }
  });

  app.post("/api/demand-forecast", aiRateLimiter, async (req, res) => {
    try {
      const { salesData, weatherForecast } = req.body;
      
      const prompt = `You are an expert restaurant inventory manager AI. 
      Based on the recent sales velocity data and the upcoming weather forecast: 
      Sales Data: ${JSON.stringify(salesData)}
      Weather Forecast: ${weatherForecast}

      Predict the inventory items that are at high risk of depletion in the next 3 days, and suggest order quantities.
      Respond strictly in JSON format as an array:
      [{"item": "Item Name", "currentStock": 10, "predictedNeed": 25, "recommendedOrder": 15, "reasoning": "brief explanation"}]
      Do not include any markdown styling formatting like \`\`\`json.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      let jsonStr = response.text || "[]";
      jsonStr = jsonStr.replace(/^```json\n?/, "").replace(/```$/,"").trim();

      const parsed = JSON.parse(jsonStr);
      res.json(parsed);

    } catch (err: any) {
      console.error("Forecasting error:", err);
      res.status(500).json({ error: err.message || "Failed to forecast" });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
  });
}

startServer().catch(console.error);
