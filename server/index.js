import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import express from 'express'
import cors from "cors"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const port = process.env.PORT || "3000"

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
    try {
        const { conversation } = req.body
        if (!conversation || !Array.isArray(conversation)) {
            return res.status(400).json({ error: 'Conversation is required' })
        }

        const contents = conversation.map(({ role, text }) => {
            return { role, parts: [{ text }] }
        })

        const response = await ai.models.generateContent({
            model: process.env.MODEL,
            contents: contents,
            config: {
                temperature: 0.9,
                systemInstruction: "You are Travel Buddy, a friendly and expert travel assistant. Your role is to provide enthusiastic, personalized, and detailed travel advice. Help users with itineraries, budget tips, safety advice, and hidden gems. Be warm, supportive, and use emojis. Break down complex plans step-by-step and provide specific examples to help understanding. If a request is unclear, ask a short clarifying question. Maintain a positive, adventurous tone."
            }
        })

        res.status(200).json({ result: response.text })
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port', port)
})

