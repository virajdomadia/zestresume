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

export const landingData: Record<string, { title: string; subtitle: string; description: string; highlights: string[] }> = {
    'ai-resume-builder': {
        title: 'Elite AI Resume Builder',
        subtitle: 'Powered by GPT-4o & Career Experts',
        description: 'Create a professional resume in minutes using the world\'s most advanced AI resume builder. Optimized for high-growth companies.',
        highlights: ['Context-aware bullet points', 'Instant tone adjustment', 'FAANG-approved templates'],
    },
    'ats-resume-builder': {
        title: 'High-Score ATS Resume Builder',
        subtitle: 'Bypass Filters. Get Noticed.',
        description: 'Our builder uses the exact formatting rules required by modern Applicant Tracking Systems to ensure your resume is never filtered out.',
        highlights: ['95%+ ATS compatibility', 'Keyword injection engine', 'Scan-ready formatting'],
    },
    'resume-builder-for-freshers': {
        title: 'Resume Builder for Freshers',
        subtitle: 'Start Your Career with a Win',
        description: 'No experience? No problem. Our AI highlights your projects, skills, and potential to make you stand out to entry-level recruiters.',
        highlights: ['Project-focused layouts', 'Skill gap analysis', 'Internship templates'],
    },
    'free-resume-builder': {
        title: 'Free AI Resume Builder',
        subtitle: 'Professional Quality, Zero Cost',
        description: 'Build, edit, and download your perfect resume for free. No hidden fees, just high-performance career tools.',
        highlights: ['Unlimited edits', 'PDF export included', 'No credit card required'],
    },
    'resume-builder-india': {
        title: 'Best Resume Builder in India',
        subtitle: 'Tailored for Indian Tech & MNC Roles',
        description: 'The preferred choice for professionals in Bangalore, Hyderabad, and Pune. Optimized for top Indian IT firms and global GCCs.',
        highlights: ['MNC-standard templates', 'Local market insights', 'Multi-industry support'],
    },
    'cv-maker-online': {
        title: 'Professional CV Maker Online',
        subtitle: 'Create an Elite Curriculum Vitae',
        description: 'Go beyond the standard resume. Our online CV maker is perfect for academic, medical, and international roles that require a comprehensive profile.',
        highlights: ['International standards', 'Sleek design layouts', 'Instant PDF download'],
    },
    'resume-checker-ai': {
        title: 'AI Resume Checker & Scorer',
        subtitle: 'Know Your Score Before Applying',
        description: 'Upload your resume and let our AI scan it against 50+ corporate ATS rules. Get a detailed score and actionable tips to improve instantly.',
        highlights: ['ATS pass/fail check', 'Keyword density analysis', 'Formatting alerts'],
    },
    'best-ai-resume-writer': {
        title: 'Best AI Resume Writer 2025',
        subtitle: 'Experience GPT-4o Powered Writing',
        description: 'Voted the top AI resume writer for 2025. Our engine understands context, tone, and industry nuances to write better than a human.',
        highlights: ['Context-aware writing', '200+ power verbs', 'Industry-specific jargon'],
    },
    'resume-optimization-ats': {
        title: 'ATS Resume Optimization Tool',
        subtitle: 'Engineered for Hiring Algorithms',
        description: 'Our proprietary optimization engine ensures your resume is perfectly parsed by Greenhouse, Workday, Lever, and other major systems.',
        highlights: ['Parsing validation', 'Hidden formatting removal', 'Algorithm-ready layout'],
    },
    'career-change-resume-builder': {
        title: 'Career Change Resume Builder',
        subtitle: 'Pivot Your Career with Confidence',
        description: 'Transitioning to a new field? Our AI identifies transferable skills and re-frames your experience to match your target role perfectly.',
        highlights: ['Transferable skill mapping', 'Functional layouts', 'Pivot-focused summaries'],
    },
    'executive-resume-builder': {
        title: 'Executive Resume Builder',
        subtitle: 'High-Stakes Resumes for Leaders',
        description: 'Tailored for C-suite and VP-level professionals. Focuses on ROI, leadership impact, and strategic vision rather than just tasks.',
        highlights: ['Impact-focused metrics', 'Sophisticated typography', 'Board-ready templates'],
    },
    'student-resume-builder': {
        title: 'Resume Builder for Students',
        subtitle: 'Launch Your Professional Journey',
        description: 'Perfect for internships, graduation roles, and first jobs. Emphasizes education, extracurriculars, and technical projects.',
        highlights: ['Education-first layouts', 'Unpaid experience mapping', 'Club/Society templates'],
    },
    'resume-format-2025': {
        title: 'Modern Resume Format 2025',
        subtitle: 'Stay Ahead of Hiring Trends',
        description: 'Don\'t use 2020 designs. Our 2025 formats are optimized for hybrid work, technical skills, and mobile-first recruiter reviews.',
        highlights: ['Mobile-ready designs', 'Technical skill grids', 'Modern accent palettes'],
    },
    'professional-cv-builder': {
        title: 'Professional CV Builder AI',
        subtitle: 'Elite Standards for All Industries',
        description: 'Whether you\'re in Finance, Engineering, or Healthcare, our AI builder ensures your professional CV meets global industry standards.',
        highlights: ['Industry compliance', 'Multi-page support', 'Verified layouts'],
    },
    'ai-cover-letter-writer': {
        title: 'AI Cover Letter Writer',
        subtitle: 'Match Your Resume Perfectly',
        description: 'Stop struggling with "Dear Hiring Manager". Our AI writes personalized, persuasive cover letters that complement your resume\'s data.',
        highlights: ['Hook-driven intro', 'Resume data sync', 'Customizable tone'],
    }
};

export const seoPages = [
    ...Object.keys(roleData).map(role => `/templates/${role}`),
    ...Object.keys(toolsData).map(tool => `/tools/${tool}`),
    ...Object.keys(blogData).map(post => `/blog/${post}`),
    ...Object.keys(landingData).map(slug => `/${slug}`)
];
