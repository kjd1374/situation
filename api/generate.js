export default async function handler(req, res) {
    // Allow CORS for flexibility
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { situation, userApiKey } = req.body;

    // Priority: User's provided key > Server's environment key
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API Key missing (Neither User key nor Server key found)' });
    }

    try {
        // Retrying with Gemini 2.5 Pro (GA) - if this fails, we can fall back to 1.5
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a Vietnamese language tutor for a Korean speaker, specializing in the Southern dialect (Ho Chi Minh City style). 
            The user is in this situation: "${situation}". 
            
            Generate 8 useful vocabulary words and 10 useful sentences for this situation.
            
            IMPORTANT: Use Southern Vietnamese vocabulary and grammar (e.g., use 'muỗng' instead of 'thìa', 'chén' instead of 'bát', 'bông' instead of 'hoa', 'nè/hông' particles).
            
            Return ONLY raw JSON in this format (no markdown backticks):
            {
              "words": [{"vi": "...", "en": "..."}], (Note: put Korean translation in the 'en' field)
              "sentences": [{"vi": "...", "en": "..."}] (Note: put Korean translation in the 'en' field)
            }`
                    }]
                }]
            })
        });

        const data = await response.json();

        // Check for standard Gemini error structure
        if (data.error) {
            throw new Error(data.error.message);
        }

        const text = data.candidates[0].content.parts[0].text;
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedData = JSON.parse(jsonStr);

        return res.status(200).json(parsedData);

    } catch (error) {
        console.error("Server API Error:", error);
        return res.status(500).json({ error: error.message || 'Failed to generate content' });
    }
}
