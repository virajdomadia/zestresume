import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogData } from '@/lib/constants';

interface BlogPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const post = blogData[params.slug];
    if (!post) return { title: 'Career Blog' };

    return {
        title: `${post.title} | ZestResume Blog`,
        description: post.description,
    };
}

export default function BlogPage({ params }: BlogPageProps) {
    const post = blogData[params.slug];
    if (!post) notFound();

    return (
        <article className="min-h-screen bg-[#020617] text-slate-50 pt-32 pb-20 selection:bg-indigo-500/30">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <Link href="/" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 mb-8 inline-block tracking-widest uppercase">
                        ← Back to Home
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-slate-500 font-bold mb-6">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span>By {post.author}</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-[1.1]">
                        {post.title}
                    </h1>
                    <p className="text-xl text-slate-400 italic font-serif leading-relaxed mb-12">
                        {post.description}
                    </p>
                    <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="prose prose-invert prose-indigo max-w-none">
                    <div className="text-lg text-slate-300 leading-relaxed space-y-8">
                        <p>{post.content}</p>
                        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl my-12">
                            <h3 className="text-xl font-bold mb-4 text-white">Key Takeaway</h3>
                            <p className="text-slate-400">
                                In 2025, the secret to job application success is combining the efficiency of AI with the strategic precision of modern ATS optimization. Don't leave your career to chance.
                            </p>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5">
                    <div className="bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 p-10 rounded-[3rem] text-center">
                        <h3 className="text-2xl font-black mb-4">Want to apply these tips today?</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Our AI builder implements all the latest 2025 resume standards automatically.
                        </p>
                        <Link href="/builder" className="bg-indigo-500 hover:bg-indigo-400 text-white px-10 py-4 rounded-xl font-black transition-all">
                            Try ZestResume Free
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
