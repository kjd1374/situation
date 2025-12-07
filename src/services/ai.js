export const MOCK_DATA = {
    situation: "반미 주문하기",
    words: [
        { vi: "Bánh mì", en: "빵 / 반미" },
        { vi: "Pa-tê", en: "파테" },
        { vi: "Thịt nướng", en: "구운 고기" },
        { vi: "Rau", en: "야채" },
        { vi: "Ớt", en: "고추" }
    ],
    sentences: [
        { vi: "Cho tôi một bánh mì thập cẩm.", en: "반미 콤비네이션 하나 주세요." },
        { vi: "Không lấy ớt nhé.", en: "고추는 빼주세요." },
        { vi: "Bao nhiêu tiền?", en: "얼마인가요?" },
        { vi: "Cảm ơn em.", en: "고마워요 (동생에게)." }
    ]
};

export const generateContent = async (situation, apiKey = null) => {
    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!apiKey) {
        console.log("Using Mock Data");
        return MOCK_DATA;
    }

    // TODO: Implement Gemini API call here
    // For now, return mock data even if key is present (unless we implement the real call now)
    // Let's implement a basic fetch to Gemini if key is present to show I can do it.

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a Vietnamese language tutor for a Korean speaker, specializing in the Southern dialect (Ho Chi Minh City style). 
            The user is in this situation: "${situation}". 
            
            Generate 5 useful vocabulary words and 4 useful sentences for this situation.
            
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
        const text = data.candidates[0].content.parts[0].text;

        // Clean up markdown if Gemini adds it despite instructions
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("API Error", error);
        throw new Error("Failed to generate content. Check your API key.");
    }
};
