import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { html } = body;

        if (!html || typeof html !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid "html" field' },
                { status: 400 }
            );
        }

        const pdfBytes = await generatePDF(html);
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

        return new NextResponse(blob, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF. Please try again.' },
            { status: 500 }
        );
    }
}
