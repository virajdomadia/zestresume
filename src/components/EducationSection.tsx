'use client';

import type { Education } from '@/lib/types';

interface Props {
    education: Education[];
    onChange: (education: Education[]) => void;
}

export default function EducationSection({ education, onChange }: Props) {
    const addEntry = () => {
        onChange([
            ...education,
            {
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                field: '',
                startYear: '',
                endYear: '',
            },
        ]);
    };

    const removeEntry = (id: string) => {
        onChange(education.filter((e) => e.id !== id));
    };

    const updateEntry = (id: string, field: keyof Education, value: string) => {
        onChange(
            education.map((e) =>
                e.id === id ? { ...e, [field]: value } : e
            )
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="section-label">Education</h3>
                <button type="button" onClick={addEntry} className="btn-secondary text-xs">
                    + Add Education
                </button>
            </div>

            {education.length === 0 && (
                <p className="text-text-muted text-sm text-center py-6">
                    No education added yet. Click &quot;Add Education&quot; to get started.
                </p>
            )}

            <div className="space-y-4">
                {education.map((entry) => (
                    <div key={entry.id} className="card relative">
                        <button
                            type="button"
                            onClick={() => removeEntry(entry.id)}
                            className="btn-danger absolute top-3 right-3 text-xs"
                        >
                            ✕
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                className="input"
                                placeholder="Institution"
                                value={entry.institution}
                                onChange={(e) => updateEntry(entry.id, 'institution', e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="Degree (e.g. Bachelor of Science)"
                                value={entry.degree}
                                onChange={(e) => updateEntry(entry.id, 'degree', e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="Field of Study"
                                value={entry.field}
                                onChange={(e) => updateEntry(entry.id, 'field', e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    className="input"
                                    placeholder="Start Year"
                                    value={entry.startYear}
                                    onChange={(e) => updateEntry(entry.id, 'startYear', e.target.value)}
                                />
                                <input
                                    className="input"
                                    placeholder="End Year"
                                    value={entry.endYear}
                                    onChange={(e) => updateEntry(entry.id, 'endYear', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
