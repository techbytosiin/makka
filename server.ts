import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key is missing. Please configure it in the AI Studio settings." });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Build context for the AI
      const systemInstruction = `You are a helpful AI assistant for Excel International School, located in Benin City, Nigeria.
The school's tagline is "Raising Future Leaders Through Excellence".
You help parents, students, and visitors by answering questions about the school, admissions, academics, and contact information.
Be polite, professional, and concise.
Contact Phone: 07062213688
Contact Email: info@excelinternationalschool.edu.ng
Address: Benin City, Edo State, Nigeria
Admissions: Open year-round. Require application form, birth certificate, medical records.`;

      const contents = [];
      if (history && history.length > 0) {
        for (const msg of history) {
          contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate response." });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
