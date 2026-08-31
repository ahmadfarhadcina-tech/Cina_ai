// api.js - Connected directly to Google Gemini API
const API_CONFIG = {
    apiKey: "AQ.Ab8RN6Kj2Do0XdbM1I8fI2uNXA21OD4AlE5m4MAZqwLeoVmITg", 
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
};

async function callOpenRouterAI(userMessage) {
    if (!API_CONFIG.apiKey) {
        return "⚠️ Please check your API key, Kak Farhad!";
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
        
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            return `Gemini API Error: ${data.error.message || "Unknown error"}`;
        } else {
            return "Received an empty response from Gemini. 🔄";
        }
    } catch (error) {
        console.error("Connection Error:", error);
        return "Network connection error. Check your internet! ❌";
    }
}
