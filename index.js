const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
  try {
    const chat = await model.generateContent(`Responda como um jogador de Roblox: ${req.body.text}`);
    res.json({ reply: chat.response.text() });
  } catch (e) {
    res.status(500).json({ error: "Erro na IA" });
  }
});

app.listen(process.env.PORT || 3000);
