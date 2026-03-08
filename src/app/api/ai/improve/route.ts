import { NextRequest, NextResponse } from 'next/server';
import { improveResumeText } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { text, type } = body;

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid "text" field' },
                { status: 400 }
            );
        }

        if (!type || !['summary', 'bullet'].includes(type)) {
            return NextResponse.json(
                { error: 'Missing or invalid "type" field. Must be "summary" or "bullet".' },
                { status: 400 }
            );
        }

        const improved = await improveResumeText(text, type);
        return NextResponse.json({ improved });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error('AI improve error:', errMsg);

        // Surface rate-limit errors to the user
        if (errMsg.includes('429')) {
            return NextResponse.json(
                { error: 'AI service is rate-limited. Please wait a moment and try again.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to improve text. Please try again.' },
            { status: 500 }
        );
    }
}
