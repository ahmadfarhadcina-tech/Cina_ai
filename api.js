// api.js - Handles AI communication
const API_CONFIG = {
    apiKey: "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", 
    endpoint: "https://openrouter.ai/api/v1/chat/completions"
};

async function callOpenRouterAI(userMessage) {
    if (API_CONFIG.apiKey === "YOUR_API_KEY_HERE" || !API_CONFIG.apiKey) {
        return "⚠️ Please put your API key in api.js file, Kak Farhad!";
    }

    try {
        const response = await fetch(API_CONFIG.endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_CONFIG.apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin,
                "X-Title": "Cina AI"
            },
            body: JSON.stringify({
                model: "openrouter/free", // استفاده از مدل رایگان و اتوماتیک
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0].message.content) {
            return data.choices[0].message.content;
        } else if (data.error) {
            return `API Error: ${data.error.message || "Unknown error"}`;
        } else {
            return "Received an empty response from the server. 🔄";
        }
    } catch (error) {
        console.error("Connection Error:", error);
        return "Network connection error. Check your internet or API key! ❌";
    }
}
