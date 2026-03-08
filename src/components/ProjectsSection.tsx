'use client';

import type { Project } from '@/lib/types';

interface Props {
    projects: Project[];
    onChange: (projects: Project[]) => void;
}

export default function ProjectsSection({ projects, onChange }: Props) {
    const addEntry = () => {
        onChange([
            ...projects,
            {
                id: crypto.randomUUID(),
                name: '',
                description: '',
                url: '',
                technologies: [],
            },
        ]);
    };

    const removeEntry = (id: string) => {
        onChange(projects.filter((p) => p.id !== id));
    };

    const updateEntry = (id: string, field: 'name' | 'description' | 'url', value: string) => {
        onChange(
            projects.map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            )
        );
    };

    const handleTechKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        id: string
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = (e.target as HTMLInputElement).value.trim();
            if (!value) return;
            onChange(
                projects.map((p) =>
                    p.id === id && !p.technologies.includes(value)
                        ? { ...p, technologies: [...p.technologies, value] }
                        : p
                )
            );
            (e.target as HTMLInputElement).value = '';
        }
    };

    const removeTech = (id: string, tech: string) => {
        onChange(
            projects.map((p) =>
                p.id === id
                    ? { ...p, technologies: p.technologies.filter((t) => t !== tech) }
                    : p
            )
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="section-label">Projects</h3>
                <button type="button" onClick={addEntry} className="btn-secondary text-xs">
                    + Add Project
                </button>
            </div>

            {projects.length === 0 && (
                <p className="text-text-muted text-sm text-center py-6">
                    No projects added yet. Click &quot;Add Project&quot; to get started.
                </p>
            )}

            <div className="space-y-4">
                {projects.map((entry) => (
                    <div key={entry.id} className="card relative">
                        <button
                            type="button"
                            onClick={() => removeEntry(entry.id)}
                            className="btn-danger absolute top-3 right-3 text-xs"
                        >
                            ✕
                        </button>

                        <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    className="input"
                                    placeholder="Project Name"
                                    value={entry.name}
                                    onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                                />
                                <input
                                    className="input"
                                    type="url"
                                    placeholder="Link / URL (e.g. GitHub or live site)"
                                    value={entry.url || ''}
                                    onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                                />
                            </div>
                            <textarea
                                className="textarea"
                                placeholder="Project description..."
                                value={entry.description}
                                onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                                rows={2}
                            />

                            <div>
                                <span className="text-xs text-text-muted font-medium block mb-1.5">
                                    Technologies (press Enter to add)
                                </span>
                                <input
                                    className="input"
                                    placeholder="e.g. React, Node.js..."
                                    onKeyDown={(e) => handleTechKeyDown(e, entry.id)}
                                />
                                {entry.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {entry.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary-light text-xs rounded-full border border-primary/20"
                                            >
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTech(entry.id, tech)}
                                                    className="hover:text-danger transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
