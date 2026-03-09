'use client';

import { useRef, useState } from 'react';
import type { ResumeData } from '@/lib/types';

interface Props {
    data: ResumeData;
    onChange?: (data: ResumeData) => void;
}

export default function ResumePreview({ data, onChange }: Props) {
    const previewRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const experience = data.experience || [];
    const education = data.education || [];
    const projects = data.projects || [];
    const skills = data.skills || [];
    const summary = data.summary || '';
    const personalInfo = data.personalInfo || {} as any;

    const hasContent =
        personalInfo.name ||
        summary ||
        experience.length > 0 ||
        education.length > 0 ||
        skills.length > 0 ||
        projects.length > 0;

    const handleDownloadPDF = async () => {
        if (!previewRef.current) return;
        setDownloading(true);

        try {
            // Build a standalone HTML document from the preview content
            const resumeHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              color: #1a1a1a;
              line-height: 1.5;
              padding: 0;
              font-size: 11pt;
            }
            .resume-container { max-width: 100%; }
            .header { text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #2d2d2d; }
            .header h1 { font-size: 22pt; font-weight: 700; color: #111; letter-spacing: 0.5px; margin-bottom: 6px; }
            .header .contact-info { font-size: 9pt; color: #555; }
            .header .contact-info span { margin: 0 4px; }
            .section { margin-bottom: 14px; }
            .section-title {
              font-size: 10pt; font-weight: 700; text-transform: uppercase;
              letter-spacing: 1px; color: #333; border-bottom: 1px solid #ccc;
              padding-bottom: 3px; margin-bottom: 8px;
            }
            .summary-text { font-size: 10pt; color: #333; line-height: 1.6; }
            .exp-entry { margin-bottom: 10px; }
            .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
            .exp-role { font-weight: 700; font-size: 11pt; color: #111; }
            .exp-date { font-size: 9pt; color: #666; white-space: nowrap; }
            .exp-company { font-size: 10pt; color: #444; margin-bottom: 4px; }
            .exp-bullets { padding-left: 18px; }
            .exp-bullets li { font-size: 10pt; color: #333; margin-bottom: 2px; }
            .edu-entry { margin-bottom: 8px; }
            .edu-header { display: flex; justify-content: space-between; align-items: baseline; }
            .edu-degree { font-weight: 700; font-size: 11pt; color: #111; }
            .edu-years { font-size: 9pt; color: #666; }
            .edu-institution { font-size: 10pt; color: #444; }
            .skills-list { display: flex; flex-wrap: wrap; gap: 6px; }
            .skill-tag { font-size: 9pt; color: #333; padding: 2px 8px; background: #f0f0f0; border-radius: 3px; }
            .proj-entry { margin-bottom: 10px; }
            .proj-name { font-weight: 700; font-size: 11pt; color: #111; }
            .proj-desc { font-size: 10pt; color: #333; margin: 2px 0; }
            .proj-tech { font-size: 9pt; color: #666; font-style: italic; }
          </style>
        </head>
        <body>
          ${previewRef.current.innerHTML}
        </body>
        </html>
      `;

            const res = await fetch('/api/pdf/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: resumeHTML }),
            });

            if (!res.ok) throw new Error('PDF generation failed');

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${personalInfo.name || 'resume'}_resume.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    const handleTemplateChange = (template: ResumeData['template']) => {
        if (onChange) {
            onChange({ ...data, template });
        }
    };

    // Helper to render sections for different templates
    const renderHeader = (isModern = false) => (
        <div style={{
            textAlign: isModern ? 'left' : 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: isModern ? 'none' : '2pt solid #1e293b'
        }}>
            <h1 style={{
                fontSize: isModern ? '24pt' : '26pt',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: '8px'
            }}>
                {personalInfo.name}
            </h1>
            <div style={{ fontSize: '10pt', color: '#475569', fontWeight: 500 }}>
                {[
                    personalInfo.email,
                    personalInfo.phone ? `${personalInfo.countryCode} ${personalInfo.phone}` : '',
                    personalInfo.location,
                ]
                    .filter(Boolean)
                    .join('  |  ')}
            </div>
            {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
                <div style={{
                    fontSize: '9.5pt',
                    color: '#64748b',
                    marginTop: '6px',
                    display: 'flex',
                    justifyContent: isModern ? 'flex-start' : 'center',
                    gap: '10px',
                    fontWeight: 500,
                    flexWrap: 'wrap'
                }}>
                    {personalInfo.linkedin && (
                        <span>
                            <span style={{ color: '#1e293b' }}>LinkedIn: </span>
                            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} style={{ color: '#4f46e6', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </span>
                    )}
                    {personalInfo.github && (
                        <span>
                            <span style={{ color: '#1e293b' }}>GitHub: </span>
                            <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} style={{ color: '#4f46e6', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </span>
                    )}
                </div>
            )}
        </div>
    );

    const renderSummary = (title = "Professional Profile") => (
        summary && (
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4f46e6', borderBottom: '1pt solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>
                    {title}
                </div>
                <div style={{ fontSize: '10pt', color: '#334155', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                    {summary.includes('Key Achievements') ? (
                        <>
                            {summary.split('Key Achievements')[0]}
                            <div style={{ fontWeight: 700, marginTop: '6px', color: '#1e293b' }}>Key Achievements</div>
                            {summary.split('Key Achievements')[1]}
                        </>
                    ) : (
                        summary
                    )}
                </div>
            </div>
        )
    );

    const renderExperience = () => (
        experience.length > 0 && experience.some((e) => e.role || e.company) && (
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4f46e6', borderBottom: '1pt solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>
                    Work Experience
                </div>
                {experience.map((entry, i) => (entry.role || entry.company) && (
                    <div key={entry.id || i} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontWeight: 700, fontSize: '11pt', color: '#0f172a' }}>
                                {[entry.company, entry.role].filter(Boolean).join(' – ')}
                            </span>
                            <span style={{ fontSize: '9pt', color: '#64748b', fontWeight: 500 }}>
                                {entry.startDate} – {entry.current ? 'Present' : entry.endDate}
                            </span>
                        </div>
                        <ul style={{ paddingLeft: '18px', margin: '2px 0', listStyleType: 'disc' }}>
                            {(entry.description || '').split(/\n|•|\*/).map(b => b.trim()).filter(Boolean).map((bullet, idx) => (
                                <li key={idx} style={{ fontSize: '10pt', color: '#334155', marginBottom: '1px', lineHeight: '1.4' }}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    );

    const renderEducation = () => (
        education.length > 0 && education.some((e) => e.institution || e.degree) && (
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4f46e6', borderBottom: '1pt solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>
                    Education
                </div>
                {education.map((entry, i) => (entry.institution || entry.degree) && (
                    <div key={entry.id || i} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                            <div style={{ fontWeight: 700, fontSize: '11pt', color: '#0f172a' }}>
                                {entry.institution} | {entry.degree}
                            </div>
                            <div style={{ fontSize: '9pt', color: '#64748b', fontWeight: 600 }}>
                                {[entry.startYear, entry.current ? 'Present' : entry.endYear].filter(Boolean).join(' – ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );

    const renderProjects = () => (
        projects.length > 0 && projects.some((p) => p.name) && (
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4f46e6', borderBottom: '1pt solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>
                    Technical Projects
                </div>
                {projects.map((entry, i) => (entry.name) && (
                    <div key={entry.id || i} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <div style={{ fontWeight: 700, fontSize: '11pt', color: '#0f172a' }}>{entry.name}</div>
                            {entry.url && (
                                <div style={{ fontSize: '9pt', color: '#4f46e6' }}>
                                    <a href={entry.url} style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{entry.url.replace(/^https?:\/\/(www\.)?/, '')}</a>
                                </div>
                            )}
                        </div>
                        <ul style={{ paddingLeft: '18px', margin: '2px 0', listStyleType: 'disc' }}>
                            {(entry.description || '').split(/\n|•|\*/).map(b => b.trim()).filter(Boolean).map((bullet, idx) => (
                                <li key={idx} style={{ fontSize: '10pt', color: '#334155', marginBottom: '1px', lineHeight: '1.4' }}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    );

    const renderSkills = (isModern = false) => (
        (skills.length > 0 || (data.categorizedSkills && Object.keys(data.categorizedSkills).length > 0)) && (
            <div style={{ marginBottom: isModern ? '24px' : '16px' }}>
                <div style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4f46e6', borderBottom: '1pt solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>
                    Skills
                </div>
                {data.categorizedSkills && Object.keys(data.categorizedSkills).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {Object.entries(data.categorizedSkills).map(([category, items]) => (
                            <div key={category} style={{ fontSize: '9.5pt', color: '#1e293b' }}>
                                <strong style={{ color: '#475569' }}>{category}: </strong>
                                <span style={{ color: '#334155' }}>{items.join(', ')}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {skills.map((skill) => (
                            <span key={skill} style={{ fontSize: '9pt', color: '#1e293b', padding: '1px 6px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '3px' }}>{skill}</span>
                        ))}
                    </div>
                )}
            </div>
        )
    );

    return (
        <div className="flex flex-col h-full bg-surface">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-text-secondary uppercase tracking-widest text-[10px]">Template:</span>
                    <div className="flex gap-1 bg-surface p-1 rounded-lg border border-border/50">
                        {(['classic', 'modern', 'minimal'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => handleTemplateChange(t)}
                                className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-all ${(data.template || 'classic') === t
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-text-muted hover:text-text-secondary hover:bg-surface-light'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading || !hasContent}
                        className="btn-primary py-2 px-6 text-sm flex items-center gap-2 group shadow-lg shadow-primary/20"
                    >
                        {downloading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span className="group-hover:scale-110 transition-transform">📄</span>
                        )}
                        {downloading ? 'Polishing...' : 'Download PDF'}
                    </button>
                </div>
            </div >

            {/* Preview Viewport */}
            <div className="flex-1 overflow-auto p-8 lg:p-12 scrollbar-thin">
                <div
                    ref={previewRef}
                    className="mx-auto bg-white shadow-2xl transition-all duration-500 origin-top"
                    style={{
                        width: '8.5in',
                        minHeight: '11in',
                        padding: '0.5in',
                        fontFamily: (data.template === 'modern' || data.template === 'minimal')
                            ? "'Inter', sans-serif"
                            : "'Times New Roman', serif",
                        color: '#0f172a',
                        fontSize: '10.5pt',
                        lineHeight: '1.5',
                        borderRadius: data.template === 'modern' ? '2px' : '0px',
                    }}
                >
                    {!hasContent ? (
                        <div className="flex items-center justify-center h-full min-h-[800px] text-slate-300 text-center select-none">
                            <div className="animate-pulse">
                                <div className="text-6xl mb-6 grayscale opacity-50">✨</div>
                                <p className="text-xl font-bold text-slate-400">Your Future Awaits</p>
                                <p className="text-sm mt-2 text-slate-500">Add your details to see the magic happen.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="resume-container">
                            {data.template === 'modern' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.4in' }}>
                                    {/* Sidebar */}
                                    <div style={{ borderRight: '1pt solid #f1f5f9', paddingRight: '0.2in' }}>
                                        {renderHeader(true)}
                                        {renderSkills(true)}
                                        {renderEducation()}
                                    </div>
                                    {/* Main */}
                                    <div>
                                        {renderSummary()}
                                        {renderExperience()}
                                        {renderProjects()}
                                    </div>
                                </div>
                            ) : data.template === 'minimal' ? (
                                <div style={{ maxWidth: '7.5in', margin: '0 auto' }}>
                                    {/* Minimal uses thin dividers and Inter font */}
                                    <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                                        <h1 style={{ fontSize: '28pt', fontWeight: 900, marginBottom: '4px' }}>{personalInfo.name}</h1>
                                        <div style={{ fontSize: '10pt', color: '#64748b', fontWeight: 500, display: 'flex', gap: '12px' }}>
                                            <span>{personalInfo.email}</span>
                                            <span>•</span>
                                            <span>{personalInfo.location}</span>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>{renderSummary()}</div>
                                    <div style={{ display: 'grid', gap: '20px' }}>
                                        {renderExperience()}
                                        {renderProjects()}
                                    </div>
                                </div>
                            ) : (
                                /* Classic / Default */
                                <>
                                    {renderHeader()}
                                    {renderSummary()}
                                    {renderExperience()}
                                    {renderEducation()}
                                    {renderSkills()}
                                    {renderProjects()}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div >
            {/* Global Toast */}
            {
                toast && (
                    <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-2xl shadow-2xl animate-slide-up z-50 flex items-center gap-3 border backdrop-blur-xl ${toast.type === 'success'
                        ? 'bg-emerald-500/90 text-white border-emerald-400/50'
                        : 'bg-red-500/90 text-white border-red-400/50'
                        }`}>
                        <span className="text-lg">{toast.type === 'success' ? '✅' : '❌'}</span>
                        <span className="font-bold text-sm tracking-wide">{toast.message}</span>
                    </div>
                )
            }
        </div >
    );
}
