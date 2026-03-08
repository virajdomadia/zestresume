'use client';

import { useState } from 'react';
import type { ResumeData } from '@/lib/types';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import SkillsInput from './SkillsInput';

interface Props {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: Props) {
    const [loadingSummaryAI, setLoadingSummaryAI] = useState(false);

    const updatePersonalInfo = (field: string, value: string) => {
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, [field]: value },
        });
    };

    const improveSummary = async () => {
        if (!data.summary.trim()) return;
        setLoadingSummaryAI(true);
        try {
            const res = await fetch('/api/ai/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: data.summary, type: 'summary' }),
            });
            const result = await res.json();
            if (result.improved) {
                onChange({ ...data, summary: result.improved });
            }
        } catch (err) {
            console.error('AI summary improvement failed:', err);
        } finally {
            setLoadingSummaryAI(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Personal Information */}
            <section>
                <h3 className="section-label">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                        className="input"
                        placeholder="Full Name"
                        value={data.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={data.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="Phone"
                        value={data.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="Location (e.g. San Francisco, CA)"
                        value={data.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="LinkedIn URL"
                        value={data.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="Portfolio URL"
                        value={data.personalInfo.portfolio}
                        onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                    />
                </div>
            </section>

            {/* Professional Summary */}
            <section>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="section-label mb-0">Professional Summary</h3>
                    <button
                        type="button"
                        onClick={improveSummary}
                        disabled={loadingSummaryAI || !data.summary.trim()}
                        className="btn-ai"
                    >
                        {loadingSummaryAI ? '⏳ Improving...' : '✨ AI Improve'}
                    </button>
                </div>
                <textarea
                    className="textarea"
                    placeholder="Write a brief professional summary highlighting your key qualifications..."
                    value={data.summary}
                    onChange={(e) => onChange({ ...data, summary: e.target.value })}
                    rows={4}
                />
            </section>

            {/* Work Experience */}
            <section>
                <ExperienceSection
                    experience={data.experience}
                    onChange={(experience) => onChange({ ...data, experience })}
                />
            </section>

            {/* Education */}
            <section>
                <EducationSection
                    education={data.education}
                    onChange={(education) => onChange({ ...data, education })}
                />
            </section>

            {/* Skills */}
            <section>
                <SkillsInput
                    skills={data.skills}
                    onChange={(skills) => onChange({ ...data, skills })}
                />
            </section>

            {/* Projects */}
            <section>
                <ProjectsSection
                    projects={data.projects}
                    onChange={(projects) => onChange({ ...data, projects })}
                />
            </section>
        </div>
    );
}
