'use client';

import { useState } from 'react';
import type { Experience } from '@/lib/types';

interface Props {
    experience: Experience[];
    onChange: (experience: Experience[]) => void;
}

export default function ExperienceSection({ experience, onChange }: Props) {
    const [loadingAI, setLoadingAI] = useState<Record<string, boolean>>({});

    const addEntry = () => {
        onChange([
            ...experience,
            {
                id: crypto.randomUUID(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                bullets: [''],
            },
        ]);
    };

    const removeEntry = (id: string) => {
        onChange(experience.filter((e) => e.id !== id));
    };

    const updateEntry = (id: string, field: keyof Experience, value: string) => {
        onChange(
            experience.map((e) =>
                e.id === id ? { ...e, [field]: value } : e
            )
        );
    };

    const updateBullet = (id: string, index: number, value: string) => {
        onChange(
            experience.map((e) =>
                e.id === id
                    ? { ...e, bullets: e.bullets.map((b, i) => (i === index ? value : b)) }
                    : e
            )
        );
    };

    const addBullet = (id: string) => {
        onChange(
            experience.map((e) =>
                e.id === id ? { ...e, bullets: [...e.bullets, ''] } : e
            )
        );
    };

    const removeBullet = (id: string, index: number) => {
        onChange(
            experience.map((e) =>
                e.id === id
                    ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) }
                    : e
            )
        );
    };

    const rewriteBullet = async (id: string, index: number, text: string) => {
        if (!text.trim()) return;
        const key = `${id}-${index}`;
        setLoadingAI((prev) => ({ ...prev, [key]: true }));

        try {
            const res = await fetch('/api/ai/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, type: 'bullet' }),
            });
            const data = await res.json();
            if (data.improved) {
                updateBullet(id, index, data.improved);
            }
        } catch (err) {
            console.error('AI rewrite failed:', err);
        } finally {
            setLoadingAI((prev) => ({ ...prev, [key]: false }));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="section-label">Work Experience</h3>
                <button type="button" onClick={addEntry} className="btn-secondary text-xs">
                    + Add Experience
                </button>
            </div>

            {experience.length === 0 && (
                <p className="text-text-muted text-sm text-center py-6">
                    No experience added yet. Click &quot;Add Experience&quot; to get started.
                </p>
            )}

            <div className="space-y-6">
                {experience.map((entry) => (
                    <div key={entry.id} className="card relative">
                        <button
                            type="button"
                            onClick={() => removeEntry(entry.id)}
                            className="btn-danger absolute top-3 right-3 text-xs"
                        >
                            ✕
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <input
                                className="input"
                                placeholder="Company"
                                value={entry.company}
                                onChange={(e) => updateEntry(entry.id, 'company', e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="Role / Title"
                                value={entry.role}
                                onChange={(e) => updateEntry(entry.id, 'role', e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="Start Date (e.g. Jan 2022)"
                                value={entry.startDate}
                                onChange={(e) => updateEntry(entry.id, 'startDate', e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="End Date (or Present)"
                                value={entry.endDate}
                                onChange={(e) => updateEntry(entry.id, 'endDate', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs text-text-muted font-medium">Bullet Points</span>
                            {entry.bullets.map((bullet, i) => (
                                <div key={i} className="flex gap-2 items-start">
                                    <input
                                        className="input flex-1"
                                        placeholder="Describe your achievement..."
                                        value={bullet}
                                        onChange={(e) => updateBullet(entry.id, i, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => rewriteBullet(entry.id, i, bullet)}
                                        disabled={loadingAI[`${entry.id}-${i}`]}
                                        className="btn-ai whitespace-nowrap"
                                    >
                                        {loadingAI[`${entry.id}-${i}`] ? '⏳' : '✨ AI'}
                                    </button>
                                    {entry.bullets.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeBullet(entry.id, i)}
                                            className="btn-danger"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addBullet(entry.id)}
                                className="text-xs text-primary-light hover:text-primary transition-colors"
                            >
                                + Add bullet point
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
