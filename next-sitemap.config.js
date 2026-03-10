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
        ];

        const templatePaths = roles.map((role) => ({
            loc: `/templates/${role}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        }));

        return templatePaths;
    },
};
