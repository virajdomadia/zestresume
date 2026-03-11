import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { toolsData } from '@/lib/constants';

interface ToolPageProps {
    params: { toolSlug: string };
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
    const tool = toolsData[params.toolSlug];
    if (!tool) return { title: 'AI Resume Tool' };

    return {
        title: `${tool.title} | ZestResume AI`,
        description: tool.description,
    };
}

export default function ToolPage({ params }: ToolPageProps) {
    const tool = toolsData[params.toolSlug];
    if (!tool) notFound();

    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 pt-32 pb-20 selection:bg-indigo-500/30">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <Link href="/" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 mb-6 inline-block tracking-widest uppercase">
                        ← Back to Home
                    </Link>
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-5xl shadow-2xl shadow-indigo-500/20">
                            {tool.icon}
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {tool.title}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        {tool.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {tool.features.map((feature, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-colors">
                            <div className="text-indigo-400 font-black mb-4">0{idx + 1}</div>
                            <h3 className="text-xl font-bold mb-2">{feature}</h3>
                            <p className="text-sm text-slate-500">Advanced AI algorithms ensure maximum precision for {feature.toLowerCase()}.</p>
                        </div>
                    ))}
                </div>

                <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h2 className="text-3xl font-black mb-6 relative z-10">Ready to optimize your career?</h2>
                    <p className="text-indigo-100 mb-10 text-lg max-w-xl mx-auto relative z-10">
                        Join thousands of professionals using ZestResume to land their dream roles.
                    </p>
                    <Link href="/builder" className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all relative z-10 inline-block">
                        Build Your BFS Resume Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
