import { Request, Response } from "express";

// 🔥 API KEYS
const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

if (!API_KEYS.length) {
  throw new Error("No API keys configured");
}

let currentKeyIndex = 0;

function getNextKey() {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    // 🔍 VALIDATION
    if (!message || typeof message !== "string" || !message.trim()) {
      console.log("❌ INVALID MESSAGE:", message);
      return res.status(400).json({ error: "Invalid message" });
    }

    const cleanMessage = message.trim();
    console.log("✅ MESSAGE RECEIVED:", cleanMessage);

    const models = ["models/gemini-2.5-flash"];
    let reply = "";

    // 🔁 MODEL LOOP
    for (const model of models) {
      try {
        console.log("TRYING MODEL:", model);

        const API_KEY = getNextKey(); // 🔥 ROTATING KEY

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `
You are a calm and empathetic mental health support assistant.

Rules:
- Keep response short (2-4 lines)
- Be human and supportive
- Ask one gentle follow-up question

User: ${cleanMessage}
                      `,
                    },
                  ],
                },
              ],
            }),
            signal: controller.signal,
          },
        );

        clearTimeout(timeout);

        // 🔥 HANDLE RATE LIMIT
        if (response.status === 429) {
          console.log("⚠️ Rate limit hit, switching key...");
          continue;
        }

        if (!response.ok) {
          const errText = await response.text();
          console.error("API ERROR:", errText);
          continue;
        }

        const data = await response.json();
        console.log("RAW RESPONSE:", data);

        reply =
          data?.candidates?.[0]?.content?.parts
            ?.map((p: any) => p.text || "")
            .join("") || "";

        if (reply.trim()) {
          console.log("✅ SUCCESS WITH:", model);
          break;
        }
      } catch (err) {
        console.error("❌ FAILED MODEL:", model, err);
      }
    }

    // 🔥 FINAL FALLBACK
    if (!reply) {
      reply =
        "I'm here with you. Things might feel heavy right now, but you're not alone. Want to share more?";
    }

    return res.json({ reply });
  } catch (err: any) {
    console.error("💥 FINAL ERROR:", err);
    return res.status(500).json({
      error: err.message || "Something went wrong",
    });
  }
};
