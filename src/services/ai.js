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
    await new Promise(resolve => setTimeout(resolve, 800));

    // Unified Architecture: Always use the Serverless Endpoint to avoid CORS issues
    // We pass the user's apiKey if they have one. The server will decide which key to use.
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                situation,
                userApiKey: apiKey // Send this if it exists
            })
        });

        if (!response.ok) {
            // Try to read the error message from the server
            const errorText = await response.text();
            let errorMessage = `Server Error ${response.status}`;
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.error) errorMessage = errorJson.error;
            } catch (e) {
                errorMessage = errorText; // Use raw text if JSON parse fails (e.g. HTML 404)

                // Detailed check for the "Rewrite to HTML" issue
                if (errorMessage.trim().startsWith("<!doctype html") || errorMessage.trim().startsWith("<html")) {
                    errorMessage = "API 경로 설정 오류 (vercel.json)";
                }
            }
            throw new Error(errorMessage);
        }

        return await response.json();

    } catch (serverError) {
        console.warn("Generation failed", serverError);
        // Alert the user to the specific error for debugging
        alert(`[오류 발생]\n내용: ${serverError.message}\n\n(참고: 배포 직후라면 1-2분 뒤에 다시 시도해보세요)`);
        return MOCK_DATA;
    }
};
