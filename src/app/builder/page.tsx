'use client';

import { useState } from 'react';
import { defaultResumeData } from '@/lib/types';
import type { ResumeData } from '@/lib/types';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';

export default function BuilderPage() {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

    return (
        <div className="min-h-screen pt-16">
            <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
                {/* Left: Form */}
                <div className="lg:w-1/2 overflow-auto p-6 border-r border-border">
                    <div className="max-w-xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold mb-1">Build Your Resume</h1>
                            <p className="text-text-secondary text-sm">
                                Fill in your details below. Your resume updates live on the right.
                            </p>
                        </div>
                        <ResumeForm data={resumeData} onChange={setResumeData} />
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="lg:w-1/2 flex flex-col">
                    <ResumePreview data={resumeData} />
                </div>
            </div>
        </div>
    );
}
