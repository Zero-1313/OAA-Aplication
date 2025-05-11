export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  const apiKey = process.env.GEMINI_API_KEY; // Ambil dari environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
            role: "user"
          }
        ]
      })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Gagal menghubungi Google Gemini API" });
  }
              }
