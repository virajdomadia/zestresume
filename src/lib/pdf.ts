import puppeteer from 'puppeteer-core';

export async function generatePDF(htmlContent: string): Promise<Uint8Array> {
    let browser;

    try {
        // Serverless environment (Vercel)
        if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const chromium = require('@sparticuz/chromium');
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: true,
            });
        } else {
            // Local development
            const puppeteerFull = await import('puppeteer');
            browser = await puppeteerFull.default.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
        }

        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
        });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0.4in',
                right: '0.4in',
                bottom: '0.4in',
                left: '0.4in',
            },
        });

        return pdf;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
