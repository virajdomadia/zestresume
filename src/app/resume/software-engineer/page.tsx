import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Software Engineer Resume Example — ZestResume',
    description:
        'See a professional software engineer resume example with tips. Build your own ATS-friendly resume in under 2 minutes with ZestResume.',
    keywords: [
        'software engineer resume',
        'developer resume example',
        'ATS resume template',
        'tech resume',
    ],
};

const exampleResume = {
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '(555) 987-6543',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/sarahchen',
    portfolio: 'sarahchen.dev',
    summary:
        'Results-driven software engineer with 6+ years of experience architecting and delivering high-performance web applications. Proven track record of leading cross-functional teams, optimizing system performance by up to 60%, and shipping products used by millions of users. Deep expertise in React, TypeScript, Node.js, and cloud-native architectures.',
    experience: [
        {
            role: 'Senior Software Engineer',
            company: 'CloudScale Technologies',
            dates: '2021 – Present',
            bullets: [
                'Architected microservices platform processing 2M+ daily transactions with 99.97% uptime',
                'Led frontend migration from Angular to React, reducing bundle size by 45% and improving LCP by 2.1s',
                'Mentored 6 junior engineers through code reviews, pair programming, and weekly tech talks',
                'Designed and implemented real-time notification system using WebSockets serving 500K+ concurrent users',
            ],
        },
        {
            role: 'Software Engineer',
            company: 'DataStream Inc.',
            dates: '2018 – 2021',
            bullets: [
                'Built data visualization dashboard with D3.js and React, adopted by 200+ enterprise clients',
                'Optimized PostgreSQL queries reducing average response time from 800ms to 120ms',
                'Implemented CI/CD pipeline with GitHub Actions, cutting deployment time from 45 min to 8 min',
            ],
        },
    ],
    education: {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Washington',
        years: '2014 – 2018',
    },
    skills: [
        'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
        'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL',
        'Redis', 'CI/CD', 'System Design', 'Agile/Scrum',
    ],
};

const tips = [
    {
        title: 'Start with Strong Action Verbs',
        description: 'Begin each bullet point with powerful verbs like "Architected", "Implemented", "Optimized", "Led", or "Designed" to convey impact immediately.',
    },
    {
        title: 'Quantify Your Achievements',
        description: 'Include specific numbers: "Reduced load time by 40%", "Processed 2M+ daily transactions", "Mentored 6 engineers". Numbers make your impact tangible.',
    },
    {
        title: 'Keep It ATS-Friendly',
        description: 'Use a single-column layout, standard section headings, and avoid tables, images, or complex formatting that ATS systems may not parse.',
    },
    {
        title: 'Tailor to the Job Description',
        description: 'Mirror keywords from the job posting. If they mention "microservices", include it. ATS systems rank resumes based on keyword match scores.',
    },
    {
        title: 'One Page for < 10 Years Experience',
        description: 'Unless you have 10+ years of highly relevant experience, aim for a single page. Recruiters spend 6-7 seconds on initial resume scans.',
    },
    {
        title: 'Remove Personal Pronouns',
        description: 'Eliminate "I", "my", "me" from your resume. Instead of "I managed a team", write "Managed cross-functional team of 8 engineers".',
    },
];

export default function SoftwareEngineerResumePage() {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute top-10 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative max-w-4xl mx-auto px-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-accent/10 text-accent border border-accent/20 mb-4">
                        Resume Example
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Software Engineer <span className="gradient-text">Resume Example</span>
                    </h1>
                    <p className="text-text-secondary max-w-2xl text-lg">
                        A professionally crafted software engineer resume with proven formatting that passes ATS systems and impresses hiring managers.
                    </p>
                </div>
            </section>

            {/* Example Resume */}
            <section className="pb-16">
                <div className="max-w-3xl mx-auto px-6">
                    <div
                        className="bg-white rounded-xl shadow-2xl shadow-primary/10 p-10 text-gray-800"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                        {/* Header */}
                        <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">{exampleResume.name}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {exampleResume.email} · {exampleResume.phone} · {exampleResume.location}
                            </p>
                            <p className="text-sm text-gray-500">
                                {exampleResume.linkedin} · {exampleResume.portfolio}
                            </p>
                        </div>

                        {/* Summary */}
                        <div className="mb-5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 mb-2">
                                Professional Summary
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{exampleResume.summary}</p>
                        </div>

                        {/* Experience */}
                        <div className="mb-5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 mb-2">
                                Experience
                            </h3>
                            {exampleResume.experience.map((exp, i) => (
                                <div key={i} className="mb-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-semibold text-sm text-gray-900">{exp.role}</span>
                                        <span className="text-xs text-gray-500">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">{exp.company}</div>
                                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
                                        {exp.bullets.map((b, j) => (
                                            <li key={j}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Education */}
                        <div className="mb-5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 mb-2">
                                Education
                            </h3>
                            <div className="flex justify-between items-baseline">
                                <span className="font-semibold text-sm text-gray-900">{exampleResume.education.degree}</span>
                                <span className="text-xs text-gray-500">{exampleResume.education.years}</span>
                            </div>
                            <div className="text-sm text-gray-600">{exampleResume.education.institution}</div>
                        </div>

                        {/* Skills */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 mb-2">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {exampleResume.skills.map((s) => (
                                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resume Tips */}
            <section className="py-16 bg-surface-light/30">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                        Software Engineer <span className="gradient-text">Resume Tips</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {tips.map((tip, i) => (
                            <div key={i} className="card">
                                <div className="flex items-start gap-3">
                                    <span className="text-primary-light font-bold text-lg mt-0.5">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{tip.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended Skills */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                        Top Skills for <span className="gradient-text">Software Engineers</span>
                    </h2>
                    <p className="text-text-secondary text-center max-w-xl mx-auto mb-8">
                        Include these high-demand skills on your resume to maximize your ATS match score.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            'JavaScript', 'TypeScript', 'Python', 'Java', 'Go',
                            'React', 'Next.js', 'Node.js', 'Express', 'Django',
                            'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs',
                            'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
                            'CI/CD', 'Git', 'Terraform', 'Microservices', 'System Design',
                            'Agile', 'Scrum', 'TDD', 'Data Structures', 'Algorithms',
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 rounded-full text-sm bg-surface-light border border-border text-text-secondary hover:border-primary/40 hover:text-primary-light transition-all cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                <div className="relative max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                        Ready to Build Your Own?
                    </h2>
                    <p className="text-text-secondary mb-6">
                        Create a professional, ATS-optimized resume in under 2 minutes — completely free.
                    </p>
                    <Link href="/builder" className="btn-primary text-base px-8 py-3.5 animate-pulse-glow">
                        Create Your Resume →
                    </Link>
                </div>
            </section>
        </div>
    );
}
