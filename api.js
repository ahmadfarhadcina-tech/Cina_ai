// api.js - Connected directly to Google AI Studio Gemini API
const API_CONFIG = {
    apiKey: "AIza.Ab8RN6JDD1LptwJXpLfwGrE2EGnhmWdw_08bmd5XAMLYm9NqTQ", 
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
