async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chatBox");

  chatBox.innerHTML += `<div class="message user-message">${userInput}</div>`;
  document.getElementById("userInput").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput })
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak bisa menjawab untuk saat ini!";

    setTimeout(() => {
      chatBox.innerHTML += `<div class="message bot-message">${botReply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
  } catch (error) {
    console.error("Error:", error);
    chatBox.innerHTML += `<div class="message bot-message">Terjadi kesalahan saat menghubungi server.</div>`;
  }
               }
