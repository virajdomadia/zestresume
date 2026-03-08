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

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
    });

    return response.text?.trim() || text;
}
