'use client';

import type { Experience } from '@/lib/types';

interface Props {
    experience: Experience[];
    onChange: (experience: Experience[]) => void;
    disabled?: boolean;
}

export default function ExperienceSection({ experience, onChange, disabled }: Props) {
    const addEntry = () => {
        onChange([
            ...experience,
            {
                id: crypto.randomUUID(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
            },
        ]);
    };

    const removeEntry = (id: string) => {
        onChange(experience.filter((e) => e.id !== id));
    };

    const updateEntry = (id: string, field: keyof Experience, value: string | boolean) => {
        onChange(
            experience.map((e) =>
                e.id === id ? { ...e, [field]: value } : e
            )
        );
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
                                value={entry.company || ''}
                                onChange={(e) => updateEntry(entry.id, 'company', e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="Role / Title"
                                value={entry.role || ''}
                                onChange={(e) => updateEntry(entry.id, 'role', e.target.value)}
                            />
                            <div className="relative">
                                <input
                                    className={`input ${entry.startDate && !/\d{4}/.test(entry.startDate) ? 'border-amber-500/50' : ''}`}
                                    placeholder="Start Date (e.g. Jan 2022)"
                                    value={entry.startDate || ''}
                                    onChange={(e) => updateEntry(entry.id, 'startDate', e.target.value)}
                                />
                                {entry.startDate && !/\d{4}/.test(entry.startDate) && (
                                    <div className="text-[10px] text-amber-400 mt-1 italic">Check year (e.g. 2023)</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    {!entry.current && (
                                        <div className="flex-1 relative">
                                            <input
                                                className={`input !w-full ${entry.endDate && !/\d{4}/.test(entry.endDate) && entry.endDate !== 'Present' ? 'border-amber-500/50' : ''}`}
                                                placeholder="End Date"
                                                value={entry.endDate || ''}
                                                onChange={(e) => updateEntry(entry.id, 'endDate', e.target.value)}
                                            />
                                            {entry.endDate && !/\d{4}/.test(entry.endDate) && entry.endDate !== 'Present' && (
                                                <div className="text-[10px] text-amber-400 mt-1 italic">Check year</div>
                                            )}
                                        </div>
                                    )}
                                    <label className="flex items-center gap-2 text-sm text-text-secondary whitespace-nowrap cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={entry.current || false}
                                            onChange={(e) => {
                                                updateEntry(entry.id, 'current', e.target.checked);
                                                if (e.target.checked) {
                                                    updateEntry(entry.id, 'endDate', 'Present');
                                                } else if (entry.endDate === 'Present') {
                                                    updateEntry(entry.id, 'endDate', '');
                                                }
                                            }}
                                            className="accent-primary"
                                        />
                                        Present
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs text-text-muted font-medium">Work Description / Achievements</span>
                            <textarea
                                className="textarea text-sm"
                                placeholder="List your key responsibilities and achievements here. Tip: Use a new line for each achievement. Our AI will clean this up into professional bullet points!"
                                value={entry.description || ''}
                                onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
