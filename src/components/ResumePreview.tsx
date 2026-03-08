'use client';

import { useRef, useState } from 'react';
import type { ResumeData } from '@/lib/types';

interface Props {
    data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
    const previewRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);
    const { personalInfo, summary, experience, education, skills, projects } = data;

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

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-light/50">
                <span className="text-sm font-medium text-text-secondary">Live Preview</span>
                <button
                    onClick={handleDownloadPDF}
                    disabled={downloading || !hasContent}
                    className="btn-primary text-sm"
                >
                    {downloading ? '⏳ Generating...' : '📄 Download Resume'}
                </button>
            </div>

            {/* Preview */}
            <div className="flex-1 overflow-auto p-6 bg-[#494e56]">
                <div
                    ref={previewRef}
                    className="mx-auto bg-white shadow-xl"
                    style={{
                        width: '8.5in',
                        minHeight: '11in',
                        padding: '0.5in 0.6in',
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        color: '#1a1a1a',
                        fontSize: '11pt',
                        lineHeight: '1.5',
                    }}
                >
                    {!hasContent ? (
                        <div className="flex items-center justify-center h-full min-h-[600px] text-gray-400 text-center">
                            <div>
                                <div className="text-4xl mb-3">📝</div>
                                <p className="text-lg font-medium">Your resume preview will appear here</p>
                                <p className="text-sm mt-1">Start filling in the form on the left</p>
                            </div>
                        </div>
                    ) : (
                        <div className="resume-container">
                            {/* Header */}
                            {personalInfo.name && (
                                <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #2d2d2d' }}>
                                    <h1 style={{ fontSize: '22pt', fontWeight: 700, color: '#111', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                        {personalInfo.name}
                                    </h1>
                                    <div style={{ fontSize: '9pt', color: '#555' }}>
                                        {[personalInfo.email, personalInfo.phone, personalInfo.location]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </div>
                                    {(personalInfo.linkedin || personalInfo.portfolio) && (
                                        <div style={{ fontSize: '9pt', color: '#555', marginTop: '2px' }}>
                                            {[personalInfo.linkedin, personalInfo.portfolio]
                                                .filter(Boolean)
                                                .join(' · ')}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Summary */}
                            {summary && (
                                <div style={{ marginBottom: '14px' }}>
                                    <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>
                                        Professional Summary
                                    </div>
                                    <p style={{ fontSize: '10pt', color: '#333', lineHeight: '1.6' }}>{summary}</p>
                                </div>
                            )}

                            {/* Experience */}
                            {experience.length > 0 && experience.some((e) => e.role || e.company) && (
                                <div style={{ marginBottom: '14px' }}>
                                    <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>
                                        Experience
                                    </div>
                                    {experience.map(
                                        (entry) =>
                                            (entry.role || entry.company) && (
                                                <div key={entry.id} style={{ marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                        <span style={{ fontWeight: 700, fontSize: '11pt', color: '#111' }}>{entry.role}</span>
                                                        <span style={{ fontSize: '9pt', color: '#666', whiteSpace: 'nowrap' }}>
                                                            {[entry.startDate, entry.endDate].filter(Boolean).join(' – ')}
                                                        </span>
                                                    </div>
                                                    {entry.company && (
                                                        <div style={{ fontSize: '10pt', color: '#444', marginBottom: '4px' }}>{entry.company}</div>
                                                    )}
                                                    {entry.bullets.filter(Boolean).length > 0 && (
                                                        <ul style={{ paddingLeft: '18px', margin: 0 }}>
                                                            {entry.bullets
                                                                .filter(Boolean)
                                                                .map((bullet, i) => (
                                                                    <li key={i} style={{ fontSize: '10pt', color: '#333', marginBottom: '2px' }}>
                                                                        {bullet}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            )
                                    )}
                                </div>
                            )}

                            {/* Education */}
                            {education.length > 0 && education.some((e) => e.institution || e.degree) && (
                                <div style={{ marginBottom: '14px' }}>
                                    <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>
                                        Education
                                    </div>
                                    {education.map(
                                        (entry) =>
                                            (entry.institution || entry.degree) && (
                                                <div key={entry.id} style={{ marginBottom: '8px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                        <span style={{ fontWeight: 700, fontSize: '11pt', color: '#111' }}>
                                                            {[entry.degree, entry.field].filter(Boolean).join(' in ')}
                                                        </span>
                                                        <span style={{ fontSize: '9pt', color: '#666' }}>
                                                            {[entry.startYear, entry.endYear].filter(Boolean).join(' – ')}
                                                        </span>
                                                    </div>
                                                    {entry.institution && (
                                                        <div style={{ fontSize: '10pt', color: '#444' }}>{entry.institution}</div>
                                                    )}
                                                </div>
                                            )
                                    )}
                                </div>
                            )}

                            {/* Skills */}
                            {skills.length > 0 && (
                                <div style={{ marginBottom: '14px' }}>
                                    <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>
                                        Skills
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {skills.map((skill) => (
                                            <span
                                                key={skill}
                                                style={{ fontSize: '9pt', color: '#333', padding: '2px 8px', background: '#f0f0f0', borderRadius: '3px' }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {projects.length > 0 && projects.some((p) => p.name) && (
                                <div style={{ marginBottom: '14px' }}>
                                    <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>
                                        Projects
                                    </div>
                                    {projects.map(
                                        (entry) =>
                                            entry.name && (
                                                <div key={entry.id} style={{ marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                        <div style={{ fontWeight: 700, fontSize: '11pt', color: '#111' }}>{entry.name}</div>
                                                        {entry.url && (
                                                            <div style={{ fontSize: '9pt', color: '#3b82f6' }}>
                                                                <a href={entry.url} style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                                                    {entry.url.replace(/^https?:\/\//, '')}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {entry.description && (
                                                        <p style={{ fontSize: '10pt', color: '#333', margin: '2px 0' }}>{entry.description}</p>
                                                    )}
                                                    {entry.technologies.length > 0 && (
                                                        <div style={{ fontSize: '9pt', color: '#666', fontStyle: 'italic' }}>
                                                            Technologies: {entry.technologies.join(', ')}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
