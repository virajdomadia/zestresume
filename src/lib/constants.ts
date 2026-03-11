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
    },
    'ux-designer': {
        title: 'UX/UI Designer Resume Template',
        description: 'Showcase your design thinking and portfolio. Optimized for Creative and Product Design roles.',
        keywords: ['Figma', 'Prototyping', 'User Flows', 'Design Systems'],
    },
    'sales-executive': {
        title: 'Sales Executive Resume Template',
        description: 'Revenue-focused resume for sales professionals. Highlights quotas, deal sizes, and growth metrics.',
        keywords: ['CRM', 'Pipeline Management', 'B2B Sales', 'Negotiation'],
    },
    'marketing-manager': {
        title: 'Marketing Manager Resume Template',
        description: 'Data-driven marketing resume. Optimized for growth, SEO, and multi-channel campaign management.',
        keywords: ['Google Analytics', 'Content Strategy', 'SEO', 'PPC'],
    },
    'customer-success': {
        title: 'Customer Success Manager Resume Template',
        description: 'Retention-focused resume for CS professionals. Highlights churn reduction and account growth.',
        keywords: ['Churn Management', 'Onboarding', 'SaaS', 'Account Management'],
    },
    'hr-manager': {
        title: 'HR Manager Resume Template',
        description: 'People-first resume for HR professionals. Focuses on talent acquisition and organizational culture.',
        keywords: ['Recruiting', 'Employee Engagement', 'Payroll', 'Compliance'],
    }
};

export const toolsData: Record<string, { title: string; description: string; icon: string; features: string[] }> = {
    'ats-resume-checker': {
        title: 'AI ATS Resume Checker',
        description: 'Scan your resume for ATS compatibility issues and get an instant optimization score.',
        icon: '🛡️',
        features: ['Keyword Analysis', 'Formatting Review', 'Readability Score'],
    },
    'ai-bullet-point-generator': {
        title: 'AI Resume Bullet Point Generator',
        description: 'Transform weak job descriptions into high-impact, metric-driven bullet points.',
        icon: '✍️',
        features: ['Action Verbs', 'Metric Injection', 'Role Awareness'],
    },
    'cover-letter-generator': {
        title: 'AI Cover Letter Generator',
        description: 'Generate a tailored cover letter that matches your resume and the job description perfectly.',
        icon: '✉️',
        features: ['Job Matching', 'Tone Customization', 'Instant Export'],
    },
    'resume-keyword-optimizer': {
        title: 'Resume Keyword Optimizer',
        description: 'Find the most important keywords for any job description and inject them into your resume.',
        icon: '🔍',
        features: ['Frequency Analysis', 'Industry Insights', 'Gap Detection'],
    },
    'resume-summary-generator': {
        title: 'AI Professional Summary Generator',
        description: 'Craft a compelling 2-sentence professional summary that grabs recruiter attention.',
        icon: '📝',
        features: ['Personalized Hooks', 'Goal Oriented', 'Concise Writing'],
    }
};

export const blogData: Record<string, { title: string; description: string; date: string; author: string; content: string }> = {
    'best-ai-resume-builder-2025': {
        title: 'Why ZestResume is the Best AI Resume Builder for 2025',
        description: 'A deep dive into why AI-powered resume building is changing the job market in 2025.',
        date: 'March 11, 2025',
        author: 'Zest Team',
        content: 'Artificial Intelligence is no longer just a buzzword in career tech...',
    },
    'how-to-beat-ats-in-2025': {
        title: 'How to Beat the ATS (Applicant Tracking Systems) in 2025',
        description: 'Master the hidden rules of corporate hiring software with these AI-driven tips.',
        date: 'March 10, 2025',
        author: 'Career Expert',
        content: 'Applicant Tracking Systems have become smarter, but so have we...',
    },
    'metric-driven-resumes-guide': {
        title: 'The Ultimate Guide to Metric-Driven Resumes',
        description: 'Learn how to quantify your achievements to stand out to FAANG recruiters.',
        date: 'March 09, 2025',
        author: 'Hiring Lead',
        content: 'If you didn\'t measure it, it didn\'t happen. This is the mantra of...',
    },
    'resume-trends-for-ai-era': {
        title: 'Resume Trends You Must Follow in the AI Era',
        description: 'Stay ahead of the curve as AI transforms how resumes are written and read.',
        date: 'March 08, 2025',
        author: 'Future of Work',
        content: 'The landscape of job applications is shifting beneath our feet...',
    },
    'soft-skills-in-ai-resume': {
        title: 'Quantifying Soft Skills in your AI-Generated Resume',
        description: 'How to make "Leadership" and "Communication" sound elite using AI.',
        date: 'March 07, 2025',
        author: 'Human Capital',
        content: 'Soft skills are notoriously hard to quantify, but with ZestAI...',
    }
};

export const seoPages = [
    ...Object.keys(roleData).map(role => `/templates/${role}`),
    ...Object.keys(toolsData).map(tool => `/tools/${tool}`),
    ...Object.keys(blogData).map(post => `/blog/${post}`)
];
