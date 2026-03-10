export const roleData: Record<string, { title: string; description: string; keywords: string[] }> = {
    'software-engineer': {
        title: 'Software Engineer Resume Template',
        description: 'Build a high-impact Software Engineer resume with ZestResume AI. Optimized for FAANG and startups.',
        keywords: ['React', 'Node.js', 'System Design', 'Scalability'],
    },
    'frontend-developer': {
        title: 'Frontend Developer Resume Template',
        description: 'Elite Frontend Developer resume examples. Optimized for Web Performance, React, and Next.js roles.',
        keywords: ['React', 'Next.js', 'Core Web Vitals', 'Tailwind CSS'],
    },
    'product-manager': {
        title: 'Product Manager Resume Template',
        description: 'Craft a winning Product Manager resume. Focus on metrics, roadmap, and stakeholder management.',
        keywords: ['Product Strategy', 'Roadmapping', 'User Research', 'SQL'],
    },
    'data-scientist': {
        title: 'Data Scientist Resume Template',
        description: 'Data Scientist resume optimized for ML, Python, and big data roles. Built for ATS.',
        keywords: ['Python', 'PyTorch', 'SQL', 'Data Visualization'],
    },
    'backend-developer': {
        title: 'Backend Developer Resume Template',
        description: 'Backend Developer resume optimized for API, Database, and Server roles. Built for ATS.',
        keywords: ['Node.js', 'Python', 'PostgreSQL', 'Microservices'],
    }
};

export const seoPages = Object.keys(roleData);
