import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { landingData } from '@/lib/constants';

interface LandingPageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return Object.keys(landingData).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
    const data = landingData[params.slug];
    if (!data) return { title: 'Resume Builder' };

    return {
        title: `${data.title} | ZestResume`,
        description: data.description,
        keywords: [params.slug.replace(/-/g, ' '), 'resume builder', 'ai resume', 'ats friendly'],
    };
}

export default function KeywordLandingPage({ params }: LandingPageProps) {
    const data = landingData[params.slug];
    if (!data) notFound();

    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30">
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <div className="flex justify-center mb-8">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-sm">
                            Certified 2025 {params.slug.replace(/-/g, ' ')}
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                        {data.title}
                        <br />
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            {data.subtitle}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        {data.description} Stop fighting with formatting. Start winning with ZestAI's elite optimization.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/builder" className="group bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all">
                            Build My Resume Free
                            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </Link>
                        <Link href="#features" className="text-slate-400 hover:text-white font-bold transition-colors py-4 px-8">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Highlight */}
            <section id="features" className="py-32 bg-slate-900/40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black mb-4">Why choose Zest for <span className="text-indigo-400 italic font-serif">this</span> keyword?</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">We've engineered our platform to address the specific challenges of {params.slug.replace(/-/g, ' ')}.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {data.highlights.map((highlight, idx) => (
                            <div key={idx} className="group p-10 bg-slate-800/50 border border-white/5 rounded-[2.5rem] hover:border-indigo-500/50 transition-all">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-xl mb-6 font-black text-indigo-400">
                                    {idx + 1}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{highlight}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Our AI deep-dives into industry standards to ensure your {highlight.toLowerCase()} is second to none.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof / Call to Action */}
            <section className="py-32 relative text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="inline-block p-1 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 mb-8">
                        <div className="bg-slate-950 rounded-full px-6 py-2 flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-950 bg-slate-800" />)}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">10k+ Landed Jobs</span>
                        </div>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
                        The last {params.slug.replace(/-/g, ' ')}
                        <br />
                        <span className="text-indigo-400">you'll ever need.</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12">
                        Join 10,000+ professionals who trust ZestResume for their high-stakes applications.
                    </p>
                    <Link href="/builder" className="bg-indigo-500 hover:bg-indigo-400 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-indigo-500/30 transition-all hover:-translate-y-1">
                        Try It For Free
                    </Link>
                </div>
            </section>
        </div>
    );
}
