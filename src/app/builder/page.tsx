'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { defaultResumeData } from '@/lib/types';
import type { ResumeData } from '@/lib/types';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import Link from 'next/link';

import { SOFTWARE_ENGINEER_SAMPLE, MODERN_PM_SAMPLE, MINIMAL_DESIGNER_SAMPLE } from '@/lib/samples';

function BuilderContent() {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
    const searchParams = useSearchParams();

    useEffect(() => {
        const shareData = searchParams.get('share');
        const role = searchParams.get('role');

        if (shareData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(atob(shareData)));
                setResumeData(decoded);
            } catch (e) {
                console.error('Failed to decode share data', e);
            }
        } else if (role) {
            // Pre-fill based on role
            const roleDefaults: Record<string, ResumeData> = {
                'software-engineer': SOFTWARE_ENGINEER_SAMPLE,
                'product-manager': MODERN_PM_SAMPLE,
                'designer': MINIMAL_DESIGNER_SAMPLE
            };
            if (roleDefaults[role]) {
                setResumeData(roleDefaults[role]);
            }
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen">
            {/* Minimal Builder Nav */}
            <nav className="fixed top-0 w-full h-16 bg-background/80 backdrop-blur-md border-b border-white/5 z-50 px-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                            <span className="text-sm font-black text-white italic">Z</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight hidden sm:block">Zest<span className="text-indigo-400">Resume</span></span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Exit</Link>
                </div>
            </nav>

            <div className="flex flex-col lg:flex-row h-screen pt-16 overflow-hidden">
                {/* Left: Form */}
                <div className="lg:w-1/2 overflow-auto p-4 lg:p-8 border-r border-border custom-scrollbar">
                    <div className="max-w-2xl mx-auto">
                        <ResumeForm data={resumeData} onChange={setResumeData} />
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="lg:w-1/2 flex flex-col bg-slate-900 overflow-hidden">
                    <ResumePreview data={resumeData} onChange={setResumeData} />
                </div>
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#020617] text-indigo-400 animate-pulse">Initializing V1 Builder...</div>}>
            <BuilderContent />
        </Suspense>
    );
}
