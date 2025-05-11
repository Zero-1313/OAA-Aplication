export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  // Jawaban dummy sementara
  const reply = `${prompt}`;

  res.status(200).json({
    candidates: [
      {
        content: {
          parts: [{ text: reply }]
        }
      }
    ]
  });
}
