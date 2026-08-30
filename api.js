// api.js - Handles AI communication
const API_CONFIG = {
    // کلید API خودت رو اینجا بگذار (یا بعداً از متغیر بخون)
    apiKey: "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", 
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
};

async function callGeminiAPI(userMessage) {
    if (API_CONFIG.apiKey === "YOUR_API_KEY_HERE") {
        return "System Warning: Please configure your API key in api.js, Kak Farhad! ⚠️";
    }

    try {
        const response = await fetch(`${API_CONFIG.endpoint}?key=${API_CONFIG.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Received an empty response from the core system. 🔄";
        }
    } catch (error) {
        console.error("API Error:", error);
        return "Connection error with the neural network. Check your network or API key! ❌";
    }
}
