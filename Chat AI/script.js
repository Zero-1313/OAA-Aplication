const GEMINI_API_KEY = "AIzaSyBYFK1Oqt0eH1bYvRmoEYimEWAIthwH2mk"; // API Key Gemini

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chatBox");

    // Chat User
    let userMessage = `<div class="message user-message">${userInput}</div>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userInput }] }]
            })
        });

        const data = await response.json();
        let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak bisa menjawab untuk saat ini!";

        // Animasi
        setTimeout(() => {
            let botMessage = `<div class="message bot-message">${botReply}</div>`;
            chatBox.innerHTML += botMessage;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
        
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<div class="message bot-message">Terjadi kesalahan saat menghubungi server, Periksa Jaringan internet anda :)</div>`;
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
