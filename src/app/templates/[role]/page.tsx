import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface TemplatePageProps {
    params: { role: string };
}

const roleData: Record<string, { title: string; description: string; keywords: string[] }> = {
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
};

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
    const role = roleData[params.role];
    if (!role) return { title: 'Resume Template' };

    return {
        title: `${role.title} | ZestResume AI`,
        description: role.description,
        keywords: role.keywords,
    };
}

export default function TemplatePage({ params }: TemplatePageProps) {
    const role = roleData[params.role];
    if (!role) notFound();

    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 pt-32 pb-20 selection:bg-indigo-500/30">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12">
                    <Link href="/" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 mb-4 inline-block tracking-widest uppercase">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
                        {role.title}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed mb-8">
                        {role.description}
                    </p>
                    <div className="flex gap-4">
                        <Link href={`/builder?role=${params.role}`} className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-xl font-black shadow-lg shadow-indigo-500/20 transition-all">
                            Build My {params.role.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Resume
                        </Link>
                    </div>
                </div>

                {/* Example Preview Section */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-white rounded-xl shadow-2xl p-12 text-slate-900 min-h-[600px]">
                        <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
                            <div className="w-24 h-4 bg-slate-200 rounded mx-auto mb-4" />
                            <div className="w-48 h-8 bg-slate-100 rounded mx-auto mb-2" />
                            <div className="w-64 h-3 bg-slate-50 rounded mx-auto" />
                        </div>
                        <div className="space-y-8">
                            <section>
                                <div className="w-32 h-4 bg-indigo-500/10 rounded mb-4" />
                                <div className="space-y-3">
                                    <div className="w-full h-3 bg-slate-50 rounded" />
                                    <div className="w-full h-3 bg-slate-50 rounded" />
                                    <div className="w-3/4 h-3 bg-slate-50 rounded" />
                                </div>
                            </section>
                            <section>
                                <div className="w-32 h-4 bg-indigo-500/10 rounded mb-4" />
                                <div className="space-y-6">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between">
                                                <div className="w-48 h-4 bg-slate-200 rounded" />
                                                <div className="w-24 h-3 bg-slate-100 rounded" />
                                            </div>
                                            <div className="w-full h-3 bg-slate-50 rounded" />
                                            <div className="w-full h-3 bg-slate-50 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Overlay CTA */}
                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-center p-8 bg-white/90 rounded-2xl shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                <p className="text-slate-950 font-black text-xl mb-4 italic">"This could be your dream resume."</p>
                                <Link href={`/builder?role=${params.role}`} className="bg-indigo-500 text-white px-8 py-3 rounded-full font-black text-sm">Use This AI Prompt</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Zest Section */}
                <div className="mt-20 grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-black mb-4 underline decoration-indigo-500/50 decoration-4 underline-offset-8">Why use ZestAI for this role?</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Recruiters for {params.role.replace('-', ' ')} positions usually spend 6 seconds per resume.
                            Our AI ensures your top technical skills and most impressive metrics are in the header where they can't be missed.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {role.keywords.map(kw => (
                            <div key={kw} className="flex items-center gap-3">
                                <span className="text-indigo-500">✔</span>
                                <span className="text-sm font-bold text-slate-300">{kw} Optimization</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
