import { GoogleGenAI } from '@google/genai';
import { ResumeData } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Helper to ensure data always uses 'description' and not 'bullets', and has unique IDs
function migrateData(data: any): ResumeData {
    const migrated = { ...data };

    if (migrated.experience) {
        migrated.experience = migrated.experience.map((exp: any) => {
            const description = exp.description || (Array.isArray(exp.bullets) ? exp.bullets.join('\n') : exp.bullets) || '';
            const { bullets, ...rest } = exp;
            return {
                id: exp.id || crypto.randomUUID(),
                ...rest,
                description
            };
        });
    }

    if (migrated.projects) {
        migrated.projects = migrated.projects.map((proj: any) => {
            const description = proj.description || (Array.isArray(proj.bullets) ? proj.bullets.join('\n') : proj.bullets) || '';
            const { bullets, ...rest } = proj;
            return {
                id: proj.id || crypto.randomUUID(),
                ...rest,
                description
            };
        });
    }

    return migrated as ResumeData;
}

async function callGroq(model: string, prompt: string): Promise<string | null> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('GROQ_API_KEY is missing');
        return null;
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.1,
                max_tokens: 4000,
                response_format: { type: 'json_object' }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Groq API error (${response.status}):`, errorText);
            return null;
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content?.trim() || '';

        // Robust JSON extraction
        const startIdx = text.indexOf('{');
        const endIdx = text.lastIndexOf('}');
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            return text.substring(startIdx, endIdx + 1);
        }
        return null;
    } catch (error) {
        console.error(`Groq API (${model}) unexpected failure:`, error);
        return null;
    }
}

export async function optimizeFullResume(rawData: ResumeData): Promise<ResumeData> {
    // 1. Pre-process: Migrate any old 'bullets' to 'description'
    const data = migrateData(rawData);

    // Validation guard: If data is nearly empty, don't waste tokens or hallucinate
    const hasContent =
        data.personalInfo?.name?.trim() ||
        data.summary?.trim() ||
        (data.experience && data.experience.length > 0) ||
        (data.projects && data.projects.length > 0);

    if (!hasContent) {
        return data; // Return as is, UI will handle the toast
    }

    const prompt = `
        You are a FAANG-level Resume Consultant specializing in high-growth startup and Tier-1 tech hiring patterns.
        Transform the provided resume into a 9.5+/10 ATS document.

        INPUT JSON:
        ${JSON.stringify(data)}

        STRICT RECRUITER & ATS CONSTRAINTS (V1 FINAL-PASS):
        1. TECH-RICH PROFESSIONAL PROFILE & ACHIEVEMENTS:
           - Generate a 2-3 sentence high-impact technical orientation.
           - MUST include: 1 measurable metric + Role + Years of Exp + "Component-based architecture" + "Core Web Vitals optimization".
           - EXAMPLE: "Frontend Developer with 2+ years experience building scalable Next.js applications with component-based architecture and improving load performance by 30%."
           - KEY ACHIEVEMENTS: Append a separate "Key Achievements" section with 2 high-impact bullets. (Format: "Key Achievements \n• [Achievement 1].\n• [Achievement 2].").

        2. PEAK VERB ROTATION (RECRUITER-GRADE):
           - PRIMARY POOL: Developed, Engineered, Optimized, Implemented, Refactored, Streamlined, Enhanced, Designed, Built.
           - RULE: MANDATORY to rotate verbs. ZERO repetition within a section.
           - NO-PHRASE LIST: NEVER use "Refactored efficiency", "Designed codebase", or "Built implementation".
           - PREFERRED: "Optimized efficiency", "Refactored codebase", "Implemented practices".
           - SYNONYM ROTATION: Avoid repeating "improved". Rotate with: Enhanced, Optimized, Increased, Strengthened, Accelerated.
           - IMPACT ROTATION: Efficiency, Load Time, Latency, Bundle Size, System Responsiveness, Scalability.

        3. TECHNICAL DEPTH & SCANNABILITY (15-20 WORDS):
           - Every bullet point MUST be between 15-20 words to ensure technical context.
           - PUNCTUATION: Every bullet point MUST end with a period (.).
           - BAD: "Engineered REST APIs reducing latency by 10%" (Too short + no period)
           - GOOD: "Engineered REST API integrations in Node.js improving data exchange efficiency and reducing latency by 10%."
           - GRAMMAR RULE: Use "Refactored codebase reducing technical debt by 15% and improving maintainability." instead of "Strengthened code implementation."

        4. SKILL PRESERVATION & ENHANCEMENT:
           - Categories: "Frontend", "Backend", "State Management", "Database", "Tools", "Languages".
           - STATE MANAGEMENT: Always include "Redux, React Query".
           - FRONTEND INJECTION: Always include "Performance Optimization, Component Optimization, Web Performance".

        5. BELIEVABLE METRICS:
           - EXACTLY 1 or 2 metrics per bullet. NEVER 0, and NEVER more than 2 (maxMetricsPerBullet = 2).
           - BULLET OVERLOADING: If a bullet has multiple independent ideas, split them. 
           - Use realistic data (e.g., "15% faster", "20% reduction").

        6. RESUME DENSITY (UNBREAKABLE):
           - Work Experience: EXACTLY 3 bullets per role. Target 15-20 words each.
           - Technical Projects: EXACTLY 2 distinct bullets starting with "•". minProjectBullets = 2.
           - PROJECT RULE: Architecture First -> Performance Later. 
             - Bullet 1: Technical Implementation/Architecture.
             - Bullet 2: Outcomes, Metrics, and Responsiveness.
           - NO COLLAPSING: NEVER use merger words like "enabling" to bypass the 2-bullet rule. 
           - PROJECT GOLD STANDARD (MANDATORY):
             "projects": [{
               "name": "Project Name",
               "description": "• Built [Tech] system with [Architecture] for [Task] achieving [Metric].\n• Optimized [Complex Feature] resulting in [Quantifiable Outcome].",
               "technologies": ["React", "Node.js"]
             }]
           - FAILURE: A project description is a FAILURE if it contains only one bullet, lacks a period, or is under 15 words.

        7. EDUCATION LAYOUT STABILITY:
           - Amity University Online | Master of Computer Applications (MCA)
           - Use "Present" for current dates.

        OUTPUT REQUIREMENTS:
        - Return ONLY perfectly valid JSON. Preserve all IDs.
    `;

    console.log('Optimizing full resume with Groq (V1 Final-Pass Engine)...');
    const groqModels = ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768'];
    for (const modelName of groqModels) {
        const result = await callGroq(modelName, prompt);
        if (result) {
            try {
                const optimized = JSON.parse(result);
                if (optimized && (optimized.experience || optimized.projects || optimized.summary)) {
                    console.log(`Successfully optimized with Groq(${modelName})`);
                    return migrateData(optimized);
                }
            } catch (e) {
                console.error(`Groq JSON parsing failed for ${modelName}`);
            }
        }
    }

    // Fallback to Gemini
    console.log('Groq fallback to Gemini...');
    const geminiModels = ['gemini-2.0-flash', 'gemini-1.5-flash'];

    for (const modelName of geminiModels) {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
            });

            const text = response.text?.trim() || '';
            const startIdx = text.indexOf('{');
            const endIdx = text.lastIndexOf('}');

            if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
                const jsonText = text.substring(startIdx, endIdx + 1);
                const optimized = JSON.parse(jsonText);

                if (optimized && (optimized.experience || optimized.projects || optimized.summary)) {
                    return migrateData(optimized);
                }
            }
        } catch (error) {
            continue;
        }
    }

    return data;
}

export async function improveResumeText(text: string, type: 'summary' | 'bullet'): Promise<string> {
    return text;
}
