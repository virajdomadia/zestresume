'use client';

import { useState } from 'react';
import type { ResumeData } from '@/lib/types';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import SkillsInput from './SkillsInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface Props {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: Props) {
    const [optimizingFull, setOptimizingFull] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

    const showToast = (message: string, type: 'error' | 'success' = 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const updatePersonalInfo = (field: string, value: string) => {
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, [field]: value },
        });
    };

    const handlePhoneChange = (value: string, country: any) => {
        // value is the full number string: "919876543210"
        // country.dialCode is "91"
        const dialCode = '+' + country.dialCode;
        const number = value.slice(country.dialCode.length);

        onChange({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                countryCode: dialCode,
                phone: number,
            },
        });
    };

    const handleFullOptimization = async () => {
        // Validation: Check if the form has any meaningful content
        const hasContent =
            data.personalInfo.name?.trim() ||
            data.summary?.trim() ||
            (data.experience && data.experience.length > 0) ||
            (data.projects && data.projects.length > 0) ||
            (data.education && data.education.length > 0);

        if (!hasContent) {
            showToast("Please fill in some details first! Add your name, experience, or projects so the AI has something to polish. ✨");
            return;
        }

        setOptimizingFull(true);
        try {
            const res = await fetch('/api/ai/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'full', fullData: data }),
            });
            const result = await res.json();
            if (result.optimized) {
                onChange(result.optimized);
                showToast("Resume optimized successfully! 🚀", 'success');
            } else if (result.error) {
                showToast(result.error);
            }
        } catch (err) {
            console.error('Full optimization failed:', err);
            showToast("Failed to optimize resume. Please try again.");
        } finally {
            setOptimizingFull(false);
        }
    };

    const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects'>('personal');

    const tabs = [
        { id: 'personal', label: 'Personal', icon: '👤' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
    ] as const;

    const currentTabIndex = tabs.findIndex(t => t.id === activeTab);

    const handleNext = () => {
        if (currentTabIndex < tabs.length - 1) {
            setActiveTab(tabs[currentTabIndex + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        if (currentTabIndex > 0) {
            setActiveTab(tabs[currentTabIndex - 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Professional Summary
    return (
        <div className="flex flex-col h-full relative">
            {/* Tab Navigation */}
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border mb-6">
                <div className="flex overflow-x-auto no-scrollbar py-2 px-1 gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                : 'bg-surface hover:bg-surface-light text-text-secondary border border-border/50'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 pb-24">
                {/* Automatic migration for older drafts */}
                {(() => {
                    let migrated = false;
                    const newData = { ...data };

                    // Ensure arrays exist and migrate legacy bullets
                    newData.experience = (newData.experience || []).map(exp => {
                        let updatedExp = { ...exp };
                        if (!updatedExp.id) {
                            updatedExp.id = crypto.randomUUID();
                            migrated = true;
                        }
                        if ((exp as any).bullets && !exp.description) {
                            migrated = true;
                            const bullets = (exp as any).bullets;
                            updatedExp = {
                                ...updatedExp,
                                description: Array.isArray(bullets) ? bullets.join('\n') : bullets
                            };
                            delete (updatedExp as any).bullets;
                        }
                        return updatedExp;
                    });

                    newData.projects = (newData.projects || []).map(proj => {
                        let updatedProj = { ...proj };
                        if (!updatedProj.id) {
                            updatedProj.id = crypto.randomUUID();
                            migrated = true;
                        }
                        if ((proj as any).bullets && !proj.description) {
                            migrated = true;
                            const bullets = (proj as any).bullets;
                            updatedProj = {
                                ...updatedProj,
                                description: Array.isArray(bullets) ? bullets.join('\n') : bullets
                            };
                            delete (updatedProj as any).bullets;
                        }
                        return updatedProj;
                    });

                    newData.education = (newData.education || []).map(edu => {
                        if (!edu.id) {
                            migrated = true;
                            return { ...edu, id: crypto.randomUUID() };
                        }
                        return edu;
                    });

                    // Ensure skills is always an array
                    if (!newData.skills) {
                        newData.skills = [];
                        migrated = true;
                    }

                    if (migrated) {
                        setTimeout(() => onChange(newData), 0);
                    }
                    return null;
                })()}

                {optimizingFull && (
                    <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-fade-in text-white">
                        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 shadow-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                        <h2 className="text-2xl font-bold gradient-text mb-2">Polishing Your Masterpiece...</h2>
                        <p className="text-text-secondary max-w-md">Our AI is rewriting your summary, quantifiying your achievements, and optimizing for ATS. This will take a few seconds.</p>
                    </div>
                )}

                {/* Tab Contents */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {activeTab === 'personal' && (
                        <div className="space-y-8">
                            <section>
                                <h3 className="section-label group flex items-center gap-2">
                                    <span className="text-primary group-hover:rotate-12 transition-transform">👤</span>
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input
                                        className="input"
                                        placeholder="Full Name"
                                        value={data.personalInfo.name || ''}
                                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                                    />
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="Email"
                                        value={data.personalInfo.email || ''}
                                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                    />
                                    <div className="phone-input-container">
                                        <PhoneInput
                                            country={'in'}
                                            value={(data.personalInfo.countryCode || '').replace('+', '') + (data.personalInfo.phone || '')}
                                            onChange={handlePhoneChange}
                                            enableSearch={true}
                                            containerClass="!w-full"
                                            inputClass="!w-full !h-10 !bg-[#0f172a] !border-[#334155] !text-[#f1f5f9] !rounded-lg focus:!border-[#818cf8] !pl-12"
                                            buttonClass="!bg-[#1e293b] !border-[#334155] !rounded-l-lg hover:!bg-[#334155]"
                                            dropdownClass="!bg-[#1e293b] !text-[#f1f5f9] !border-[#334155]"
                                            searchClass="!bg-[#0f172a] !text-[#f1f5f9] !border-[#334155]"
                                        />
                                    </div>
                                    <input
                                        className="input"
                                        placeholder="Location (e.g. San Francisco, CA)"
                                        value={data.personalInfo.location || ''}
                                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                    />
                                    <div className="relative">
                                        <input
                                            className={`input ${!data.personalInfo.linkedin ? 'border-amber-500/50' : ''}`}
                                            placeholder="LinkedIn URL"
                                            value={data.personalInfo.linkedin || ''}
                                            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                        />
                                        {!data.personalInfo.linkedin && (
                                            <div className="text-[10px] text-amber-400 mt-1 flex items-center gap-1 font-medium italic">
                                                ⚠️ Missing LinkedIn can lower ATS scores
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        className="input"
                                        placeholder="GitHub URL"
                                        value={data.personalInfo.github || ''}
                                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                                    />
                                    <input
                                        className="input"
                                        placeholder="Portfolio URL"
                                        value={data.personalInfo.portfolio || ''}
                                        onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="section-label mb-0 flex items-center gap-2">
                                        <span className="text-primary italic font-serif">A</span>
                                        Professional Summary
                                    </h3>
                                </div>
                                <textarea
                                    className="textarea"
                                    placeholder="Write a brief professional summary highlighting your key qualifications..."
                                    value={data.summary || ''}
                                    onChange={(e) => onChange({ ...data, summary: e.target.value })}
                                    rows={6}
                                />
                                <p className="text-[10px] text-text-muted mt-2 italic">
                                    💡 Tip: Use the "Full Optimization" button below to have AI rewrite this perfectly.
                                </p>
                            </section>
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <section>
                            <ExperienceSection
                                experience={(data.experience || []).map(exp => ({ ...exp, id: exp.id || crypto.randomUUID() }))}
                                onChange={(experience) => onChange({ ...data, experience })}
                                disabled={optimizingFull}
                            />
                        </section>
                    )}

                    {activeTab === 'education' && (
                        <section>
                            <EducationSection
                                education={(data.education || []).map(edu => ({ ...edu, id: edu.id || crypto.randomUUID() }))}
                                onChange={(education) => onChange({ ...data, education })}
                            />
                        </section>
                    )}

                    {activeTab === 'skills' && (
                        <section>
                            <SkillsInput
                                skills={data.skills || []}
                                onChange={(skills) => onChange({ ...data, skills })}
                            />
                        </section>
                    )}

                    {activeTab === 'projects' && (
                        <div className="space-y-8">
                            <section>
                                <ProjectsSection
                                    projects={(data.projects || []).map(proj => ({ ...proj, id: proj.id || crypto.randomUUID(), technologies: proj.technologies || [] }))}
                                    onChange={(projects) => onChange({ ...data, projects })}
                                    disabled={optimizingFull}
                                />
                            </section>

                            {/* Full Optimization Button (at the end of projects) */}
                            <div className="pt-8 border-t border-border/50">
                                <button
                                    type="button"
                                    onClick={handleFullOptimization}
                                    disabled={optimizingFull}
                                    className="w-full py-4 bg-linear-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group animate-pulse-glow"
                                >
                                    <span className="text-xl group-hover:scale-125 transition-transform duration-300">✨</span>
                                    {optimizingFull ? 'Optimizing Entire Resume...' : 'Optimize Full Resume with AI (One Click)'}
                                </button>
                                <p className="text-center text-text-muted text-xs mt-3 italic">
                                    AI will polish your entire resume for maximum ATS impact.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Navigation Footer */}
            <div className="fixed bottom-0 left-0 right-0 lg:absolute lg:bottom-0 p-4 bg-background/90 backdrop-blur-md border-t border-border flex items-center justify-between z-10 lg:w-full">
                <button
                    onClick={handleBack}
                    disabled={currentTabIndex === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-surface hover:bg-surface-light disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-sm"
                >
                    <span>←</span> Previous
                </button>

                <div className="flex flex-col items-center">
                    <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">
                        Step {currentTabIndex + 1} of {tabs.length}
                    </div>
                    <div className="flex gap-1.5">
                        {tabs.map((tab, idx) => (
                            <div
                                key={tab.id}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentTabIndex ? 'w-6 bg-primary' : 'w-2 bg-border'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentTabIndex === tabs.length - 1}
                    className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm"
                >
                    Next <span>→</span>
                </button>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className="toast-container !fixed !bottom-24">
                    <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
                        <span className="toast-icon text-lg">
                            {toast.type === 'error' ? '⚠️' : '✅'}
                        </span>
                        <span className="toast-message">{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
