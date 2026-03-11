/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://zestresume.com',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/icon.svg', '/api/*'],

    // Transform function to customize each URL entry
    transform: async (config, path) => {
        // Homepage gets highest priority
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        // Builder page — high priority
        if (path === '/builder') {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.9,
                lastmod: new Date().toISOString(),
            };
        }

        // Template and resume pages
        if (path.startsWith('/templates/') || path.startsWith('/resume/')) {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }

        // Default for all other pages
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: new Date().toISOString(),
        };
    },

    // Additional paths not auto-discovered by next-sitemap
    // (e.g. dynamic [role] pages that need to be explicitly listed)
    additionalPaths: async (config) => {
        const roles = [
            'software-engineer',
            'frontend-developer',
            'product-manager',
            'data-scientist',
            'backend-developer',
            'ux-designer',
            'sales-executive',
            'marketing-manager',
            'customer-success',
            'hr-manager',
        ];

        const tools = [
            'ats-resume-checker',
            'ai-bullet-point-generator',
            'cover-letter-generator',
            'resume-keyword-optimizer',
            'resume-summary-generator',
        ];

        const posts = [
            'best-ai-resume-builder-2025',
            'how-to-beat-ats-in-2025',
            'metric-driven-resumes-guide',
            'resume-trends-for-ai-era',
            'soft-skills-in-ai-resume',
        ];

        const rolePaths = roles.map((role) => ({
            loc: `/templates/${role}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        }));

        const toolPaths = tools.map((tool) => ({
            loc: `/tools/${tool}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }));

        const blogPaths = posts.map((post) => ({
            loc: `/blog/${post}`,
            changefreq: 'monthly',
            priority: 0.6,
            lastmod: new Date().toISOString(),
        }));

        return [...rolePaths, ...toolPaths, ...blogPaths];
    },
};
