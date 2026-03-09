'use client';

import { useState } from 'react';

interface Props {
    skills: string[];
    onChange: (skills: string[]) => void;
}

export default function SkillsInput({ skills, onChange }: Props) {
    const [input, setInput] = useState('');

    const addSkill = (value: string) => {
        const trimmed = value.trim();
        if (trimmed && !skills.includes(trimmed)) {
            onChange([...skills, trimmed]);
        }
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addSkill(input);
        }
        // Allow backspace to remove last skill when input is empty
        if (e.key === 'Backspace' && !input && skills.length > 0) {
            onChange(skills.slice(0, -1));
        }
    };

    const removeSkill = (skill: string) => {
        onChange(skills.filter((s) => s !== skill));
    };

    return (
        <div>
            <h3 className="section-label">Skills</h3>

            <div className="flex flex-wrap gap-1.5 p-3 bg-surface border border-border rounded-lg min-h-[48px] focus-within:border-primary-light focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary-light text-sm rounded-full border border-primary/20 animate-fade-in"
                    >
                        {skill}
                        <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-danger transition-colors text-xs"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={skills.length === 0 ? 'Type a skill and press Enter or Comma...' : 'Add more...'}
                    className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-text-primary text-sm placeholder:text-text-muted"
                />
            </div>

            <p className="text-xs text-text-muted mt-1.5">
                Press Enter or Comma to add a skill. Backspace to remove the last one.
            </p>
        </div>
    );
}
