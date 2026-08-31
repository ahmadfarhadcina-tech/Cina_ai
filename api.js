// api.js - Groq API Fixed
const API_CONFIG = {
    apiKey: "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",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3-8b-8192"
};

async function callOpenRouterAI(userMessage) {
    if (!API_CONFIG.apiKey) {
        return "⚠️ Please check your API key, Kak Farhad!";
    }

    try {
        const response = await fetch(API_CONFIG.endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_CONFIG.apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0].message && data.choices[0].message.content) {
            return data.choices[0].message.content;
        } else if (data.error) {
            return `Groq API Error: ${data.error.message || "Unknown error"}`;
        } else {
            return "Received an empty response. 🔄";
        }
    } catch (error) {
        console.error("Connection Error:", error);
        return "Network connection error. Check your internet! ❌";
    }
}
