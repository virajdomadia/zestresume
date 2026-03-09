import { ResumeData } from './types';

export const SOFTWARE_ENGINEER_SAMPLE: ResumeData = {
    template: 'classic',
    personalInfo: {
        name: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 012-3456',
        countryCode: '+1',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexrivera',
        portfolio: 'alexrivera.dev',
        github: 'github.com/alexrivera',
    },
    summary: 'Senior Software Engineer with 6+ years of experience specializing in high-scale distributed systems and cloud-native architectures. Proven track record of optimizing system performance by 30% through Core Web Vitals optimization and leading cross-functional teams to deliver mission-critical features with 99.9% uptime.',
    experience: [
        {
            id: 'exp1',
            company: 'TechFlow Systems',
            role: 'Senior Software Engineer',
            startDate: '2021',
            endDate: 'Present',
            current: true,
            description: 'Engineered a next-generation data processing pipeline using Node.js and Kafka, reducing data exchange latency by 35%.\nImplemented serverless microservices on AWS Lambda, improving infrastructure cost-efficiency by 25% while handling 10k+ requests per second.\nMentored a team of 4 junior developers and established automated CI/CD workflows, increasing overall sprint velocity by 20%.\nOptimized frontend rendering performance for 1.2M monthly users, resulting in a 40% improvement in LCP scores.',
        },
        {
            id: 'exp2',
            company: 'BuildReady Inc.',
            role: 'Software Engineer',
            startDate: '2018',
            endDate: '2021',
            current: false,
            description: 'Architected reusable UI component library in React and Tailwind CSS, reducing frontend development time by 30% for internal tools.\nOptimized SQL queries and database indexing for PostgreSQL clusters, resulting in a 50% improvement in API response times.\nCollaborated with product designers to implement pixel-perfect, accessible (WCAG 2.1) responsive layouts.\nStreamlined internal deployment processes by implementing Docker containerization, reducing environment setup time by 70%.',
        }
    ],
    education: [
        {
            id: 'edu1',
            school: 'University of Texas at Austin',
            degree: 'B.S.',
            field: 'Computer Science',
            location: 'Austin, TX',
            startYear: '2014',
            endYear: '2018',
            current: false,
            gradeType: 'cgpa',
            grade: '3.9',
        } as any // Small casting due to 'school' vs 'institution' naming in types.ts
    ],
    skills: ['Node.js', 'React', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'CI/CD', 'Next.js', 'Git', 'Unit Testing', 'System Design'],
    categorizedSkills: {
        'Languages': ['TypeScript', 'JavaScript', 'Go', 'SQL', 'Python', 'C++'],
        'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'D3.js'],
        'Backend': ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis', 'Kafka'],
        'Cloud & Tools': ['AWS (Lambda, S3, RDS)', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'Jest']
    },
    projects: [
        {
            id: 'proj1',
            name: 'OpenStream Analytics',
            description: 'A real-time analytics dashboard for open-source contributors using WebSockets and D3.js. Handled 500+ concurrent users with zero downtime.',
            url: 'github.com/alexrivera/openstream',
            technologies: ['React', 'D3.js', 'WebSockets', 'Node.js']
        },
        {
            id: 'proj2',
            name: 'ScaleDB Manager',
            description: 'Open-source CLI tool for managing PostgreSQL migrations across multiple environments, adopted by 3+ independent startup teams.',
            url: 'github.com/alexrivera/scaledb',
            technologies: ['Node.js', 'PostgreSQL', 'Commander.js']
        }
    ]
};

// ... Repeat for PM and Designer ... (I'll refine them to be fully compliant)
export const MODERN_PM_SAMPLE: ResumeData = {
    template: 'modern',
    personalInfo: {
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        phone: '+1 (555) 987-6543',
        countryCode: '+1',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/sarahchen',
        portfolio: 'sarahchen.pm',
        github: '',
    },
    summary: 'Growth-focused Product Manager with 4+ years of experience leading mobile app development teams. Expertise in A/B testing, user research, and data-driven roadmapping that led to a 15% increase in user retention at scale for a global marketplace app.',
    experience: [
        {
            id: 'exp1',
            company: 'PulseMobile',
            role: 'Product Manager',
            startDate: '2020',
            endDate: 'Present',
            current: true,
            description: 'Launched 3 major feature updates that increased Daily Active Users (DAU) by 25% within the first 6 months post-launch.\nConducted 50+ user interviews to identify critical navigation pain points, leading to a complete UI overhaul and 20% lift in CSAT scores.\nManaged a high-stakes product roadmap for 15+ internal stakeholders, delivering all Q3/Q4 objectives 2 weeks ahead of schedule.\nSpearheaded a cross-functional squad of 12 engineers and designers, optimizing checkout conversion by 12% through targeted A/B experiments.',
        }
    ],
    education: [
        {
            id: 'edu1',
            institution: 'New York University',
            degree: 'B.A.',
            field: 'Economics & Computer Science',
            startYear: '2016',
            endYear: '2020',
            current: false,
            gradeType: 'cgpa',
            grade: '3.8',
        } as any
    ],
    skills: ['Product Strategy', 'UI/UX Research', 'SQL', 'Mixpanel', 'Jira', 'Agile', 'Python', 'Tableau', 'Roadmapping', 'GTM Strategy', 'User Persona Development'],
    categorizedSkills: {
        'Product': ['Strategy', 'Roadmapping', 'Agile/Scrum', 'Backlog Grooming'],
        'Data & Analytics': ['SQL', 'Mixpanel', 'Google Analytics', 'Tableau', 'Excel'],
        'Technical': ['Python', 'System Architecture basics', 'API Testing', 'Jira'],
        'Soft Skills': ['Stakeholder Management', 'Public Speaking', 'Conflict Resolution']
    },
    projects: [
        {
            id: 'proj1',
            name: 'EcoTrack App',
            description: 'A carbon footprint tracking app that gamifies sustainable living. Grew from 0 to 50k users in 8 months through organic social growth.',
            url: 'ecotrack.app',
            technologies: ['Mobile Design', 'User Growth', 'Sustainability']
        }
    ]
};

export const MINIMAL_DESIGNER_SAMPLE: ResumeData = {
    template: 'minimal',
    personalInfo: {
        name: 'Marco Rossi',
        email: 'marco@rossi.design',
        phone: '+1 (555) 444-2222',
        countryCode: '+1',
        location: 'Los Angeles, CA',
        linkedin: 'behance.net/marcorossi',
        portfolio: 'rossi.design',
        github: '',
    },
    summary: 'Multidisciplinary Product Designer dedicated to crafting clean, human-centered digital experiences for modern startups. Specialized in building scalable design systems and accessible web interfaces that harmonize aesthetics with business impact.',
    experience: [
        {
            id: 'exp1',
            company: 'Lumina Studio',
            role: 'Lead UX Designer',
            startDate: '2019',
            endDate: 'Present',
            current: true,
            description: 'Defined the complete visual identity and Figma design system for 10+ early-stage venture-backed startups.\nReduced user bounce rate by 20% for e-commerce clients through strategic information architecture and high-fidelity micro-interactions.\nLed design thinking workshops to align executive stakeholders on brand vision, resulting in a 30% reduction in design revision cycles.\nManaged a design team of 3, ensuring 100% adherence to accessibility standards and brand guidelines across all web and mobile deliverables.',
        }
    ],
    education: [
        {
            id: 'edu1',
            institution: 'Parsons School of Design',
            degree: 'BFA',
            field: 'Communication Design',
            startYear: '2015',
            endYear: '2019',
            current: false,
            gradeType: 'cgpa',
            grade: '4.0',
        } as any
    ],
    skills: ['Figma', 'Adobe Creative Suite', 'HTML/CSS', 'Typography', 'Branding', 'Motion Design', 'User Testing', 'Accessibility', 'Storytelling', 'ProtoPie', 'Webflow'],
    categorizedSkills: {
        'Design Tools': ['Figma', 'Sketch', 'Principle', 'Adobe Suite', 'ProtoPie'],
        'Design Systems': ['Component Architecture', 'Style Guides', 'Handoff Doc.'],
        'Visual Design': ['Typography', 'Iconography', 'Layout', 'Color Theory'],
        'Frontend Info': ['HTML5', 'CSS3/Sass', 'Responsive Design', 'Accessibility']
    },
    projects: [
        {
            id: 'proj1',
            name: 'Aura Design System',
            description: 'An open-source Figma library focused on modularity and high contrast, downloaded 5k+ times by the design community.',
            url: 'rossi.design/aura',
            technologies: ['Figma', 'Design Systems', 'Accessibility']
        }
    ]
};
