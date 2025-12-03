import express from "express";
import multer from "multer";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    // 1. Ensure PDF exists
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required." });
    }

    // 2. Extract text
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(req.file.buffer) }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map((item) => item.str).join(" ");
    }
    const pdfData = { text };

    // 3. Send to Gemini
    const prompt = `
      Extract the following from this CV:
      1. A short summary.
      2. Skills as an array of strings.
      3. Total years of experience as a number.
      
      CV text:
      ${pdfData.text}

      Return JSON only.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    const result = response.text;
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/) || result.match(/```\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : result;
    
    // 4. Return JSON response
    res.json(JSON.parse(jsonString));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
