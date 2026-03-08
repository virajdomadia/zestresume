import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function improveResumeText(
    text: string,
    type: 'summary' | 'bullet'
): Promise<string> {
    const prompt =
        type === 'summary'
            ? `You are a professional resume writer. Rewrite the following professional summary to be more impactful, concise, and ATS-friendly. Use strong action verbs, remove first-person pronouns, and maintain a professional tone. Return ONLY the improved text, no explanations or quotes.\n\nOriginal:\n${text}`
            : `You are a professional resume writer. Rewrite the following resume bullet point to be more impactful and ATS-friendly. Requirements:\n- Use strong action verbs at the start\n- Remove first-person pronouns (I, my, me)\n- Keep it concise (one line, under 20 words if possible)\n- Quantify results where possible\n- Use professional tone\n- Return ONLY the improved bullet point, no explanations or quotes.\n\nOriginal:\n${text}`;

    // Retry up to 2 times on rate-limit errors
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            return response.text?.trim() || text;
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.error(`Gemini API attempt ${attempt + 1} failed:`, errMsg);

            // Check for rate limit (429) — wait and retry
            if (errMsg.includes('429') && attempt < 2) {
                const waitMs = (attempt + 1) * 5000; // 5s, then 10s
                console.log(`Rate limited. Retrying in ${waitMs / 1000}s...`);
                await new Promise((resolve) => setTimeout(resolve, waitMs));
                continue;
            }

            throw error;
        }
    }

    return text;
}
