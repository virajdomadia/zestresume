'use client';

import Link from 'next/link';
import { SOFTWARE_ENGINEER_SAMPLE, MODERN_PM_SAMPLE, MINIMAL_DESIGNER_SAMPLE } from '@/lib/samples';

export default function HomePage() {
  const templates = [
    {
      id: 'classic',
      name: 'Classic ATS',
      role: 'software-engineer',
      description: 'The industry standard. High density, professional, and zero-risk for ATS systems.',
      color: 'border-slate-700',
      icon: '🏛️',
      sample: SOFTWARE_ENGINEER_SAMPLE,
    },
    {
      id: 'modern',
      name: 'Modern Prof.',
      role: 'product-manager',
      description: 'Sleek two-column layout with Inter typography and elegant color accents.',
      color: 'border-indigo-500/30',
      icon: '✨',
      sample: MODERN_PM_SAMPLE,
    },
    {
      id: 'minimal',
      name: 'Minimalist',
      role: 'designer',
      description: 'Clean, spacious, and contemporary. Perfect for designers and creative pros.',
      color: 'border-emerald-500/30',
      icon: '🌿',
      sample: MINIMAL_DESIGNER_SAMPLE,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30">
      {/* Premium Navbar for Landing */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
              <span className="text-xl font-black text-white italic">Z</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Zest<span className="text-indigo-400">Resume</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="#features" className="hover:text-white transition-colors">AI Features</Link>
            <Link href="/builder" className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2.5 rounded-full shadow-lg shadow-indigo-500/20 transition-all font-bold">Build for Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-sm">
              🚀 V1.0 Launch: Industry-Standard ATS Optimization
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] mb-8 animate-slide-up">
            Hire-Ready Resumes
            <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">in 2 Minutes FLAT.</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            ZestResume uses advanced AI to craft recruiter-approved resumes.
            Stop fighting with formatting. Start winning with <span className="text-indigo-400 font-bold">95%+ ATS-score</span> optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/builder" className="group relative bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-white/10 hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all">
              Start Building — It's Free
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
            <Link href="#templates" className="text-slate-400 hover:text-white font-bold transition-colors py-4 px-8">
              Explore Templates
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {['FAANG Approved', 'ATS-Optimized', 'Recruiter-Safe', 'Privacy First'].map((item) => (
              <span key={item} className="text-xs font-bold tracking-[0.2em] uppercase">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-32 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-black mb-6">Built for <span className="text-indigo-400 italic font-serif">Every</span> Professional.</h2>
            <p className="text-slate-400">Choose from out 3 core V1 templates, each battle-tested for high conversion rates.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {templates.map((template, idx) => (
              <div key={template.id} className={`group relative flex flex-col bg-slate-800/50 border ${template.color} rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10`}>
                <div className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{template.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400/80 bg-indigo-500/10 px-3 py-1 rounded-full">Template {idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3">{template.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {template.description}
                  </p>
                </div>
                <div className="relative aspect-[4/5] mx-8 mb-8 rounded-xl overflow-hidden bg-white border border-white/5 shadow-2xl group-hover:scale-[1.02] transition-transform">
                  {/* Realistic Sample Preview Rendering */}
                  <div className="absolute inset-0 p-4 text-[5px] leading-[1.2] text-slate-900 pointer-events-none overflow-hidden origin-top">
                    {template.id === 'modern' ? (
                      <div className="flex gap-3 h-full">
                        {/* Modern Sidebar */}
                        <div className="w-[30%] border-r border-slate-100 pr-2 pt-2">
                          <div className="w-10 h-10 bg-slate-100 rounded-full mb-3 mx-auto" />
                          <div className="font-bold border-b border-indigo-100 mb-1 text-indigo-600 uppercase tracking-tighter">Skills</div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {(template.sample.categorizedSkills ? Object.entries(template.sample.categorizedSkills).flatMap(([_, v]) => v) : template.sample.skills).slice(0, 12).map(s => (
                              <span key={s} className="px-1 bg-slate-50 border border-slate-100 rounded">{s}</span>
                            ))}
                          </div>
                          <div className="font-bold border-b border-indigo-100 mb-1 text-indigo-600 uppercase tracking-tighter">Education</div>
                          <div className="mb-2">
                            <div className="font-bold">{template.sample.education[0]?.institution || (template.sample.education[0] as any)?.school}</div>
                            <div className="text-slate-500">{template.sample.education[0]?.degree} • {template.sample.education[0]?.endYear}</div>
                          </div>
                        </div>
                        {/* Modern Main Content */}
                        <div className="flex-1 pt-2">
                          <div className="mb-4">
                            <div className="text-[10px] font-black text-indigo-600 uppercase tracking-tight mb-0.5">{template.sample.personalInfo.name}</div>
                            <div className="text-[6px] text-slate-500 font-bold uppercase tracking-widest">{template.sample.experience[0].role}</div>
                          </div>
                          <div className="mb-3">
                            <div className="font-bold border-b border-indigo-100 mb-1 text-indigo-600 uppercase tracking-tighter">Profile</div>
                            <div className="text-slate-700">{template.sample.summary}</div>
                          </div>
                          <div className="mb-3">
                            <div className="font-bold border-b border-indigo-100 mb-1 text-indigo-600 uppercase tracking-tighter">Experience</div>
                            {template.sample.experience.slice(0, 1).map((exp, i) => (
                              <div key={i} className="mb-2">
                                <div className="font-black text-slate-900">{exp.company}</div>
                                <div className="text-slate-500 italic mb-1">{exp.role} • {exp.startDate}-{exp.endDate}</div>
                                <div className="text-slate-700">{exp.description.split('\n')[0]}</div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="font-bold border-b border-indigo-100 mb-1 text-indigo-600 uppercase tracking-tighter">Projects</div>
                            {template.sample.projects.slice(0, 1).map((proj, i) => (
                              <div key={i} className="mb-2">
                                <div className="font-black text-slate-900">{proj.name}</div>
                                <div className="text-slate-700">{proj.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : template.id === 'minimal' ? (
                      <div className="pt-4 px-2">
                        {/* Minimal Left Header */}
                        <div className="mb-6 flex justify-between items-end border-b border-slate-900 pb-2">
                          <div>
                            <div className="text-[12px] font-light tracking-tight text-slate-950 mb-1">{template.sample.personalInfo.name}</div>
                            <div className="text-[6px] text-slate-500 font-medium">{template.sample.personalInfo.email} • {template.sample.personalInfo.location}</div>
                          </div>
                          <div className="text-[6px] font-bold tracking-widest uppercase">Portfolio ↗</div>
                        </div>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-2">
                            <div className="font-black text-[6px] uppercase tracking-[0.2em] mb-2 text-slate-400">About Me</div>
                            <div className="text-slate-700 leading-relaxed font-serif italic text-[5px] mb-4">{template.sample.summary}</div>

                            <div className="font-black text-[6px] uppercase tracking-[0.2em] mb-2 text-slate-400">Education</div>
                            <div className="text-[5px] mb-4">
                              <div className="font-bold">{template.sample.education[0]?.institution || (template.sample.education[0] as any)?.school}</div>
                              <div className="text-slate-500">{template.sample.education[0]?.field}</div>
                            </div>

                            <div className="font-black text-[6px] uppercase tracking-[0.2em] mb-2 text-slate-400">Skills</div>
                            <div className="flex flex-wrap gap-1">
                              {template.sample.skills.slice(0, 8).map(s => (
                                <span key={s} className="bg-slate-50 px-1 rounded border border-slate-100">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div className="font-black text-[6px] uppercase tracking-[0.2em] mb-2 text-slate-400">Experience</div>
                            {template.sample.experience.slice(0, 2).map((exp, i) => (
                              <div key={i} className="mb-4">
                                <div className="flex justify-between items-baseline mb-0.5">
                                  <span className="font-bold text-slate-950">{exp.company}</span>
                                  <span className="text-slate-400 font-medium tabular-nums">{exp.startDate}-{exp.endDate}</span>
                                </div>
                                <div className="text-indigo-600 font-bold mb-1 italic">{exp.role}</div>
                                <div className="text-slate-700 line-clamp-2">{exp.description.split('\n')[0]}</div>
                              </div>
                            ))}

                            <div className="font-black text-[6px] uppercase tracking-[0.2em] mb-2 text-slate-400">Featured Project</div>
                            {template.sample.projects.slice(0, 1).map((proj, i) => (
                              <div key={i} className="mb-2">
                                <div className="font-bold text-slate-950">{proj.name}</div>
                                <div className="text-slate-700 line-clamp-1">{proj.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Classic ATS Rendering */
                      <div className="p-2">
                        <div className="text-center mb-4 border-b border-slate-200 pb-2">
                          <div className="text-[10px] font-bold uppercase tracking-tighter mb-1">{template.sample.personalInfo.name}</div>
                          <div className="text-slate-500 font-medium">
                            {template.sample.personalInfo.email} • {template.sample.personalInfo.phone} • {template.sample.personalInfo.location}
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="font-bold border-b border-slate-200 mb-1 tracking-widest uppercase text-indigo-600">Summary</div>
                          <div className="text-slate-700">{template.sample.summary}</div>
                        </div>
                        <div className="mb-3">
                          <div className="font-bold border-b border-slate-200 mb-1 tracking-widest uppercase text-indigo-600">Experience</div>
                          {template.sample.experience.map((exp, i) => (
                            <div key={i} className="mb-2">
                              <div className="flex justify-between font-bold text-slate-900 mb-0.5">
                                <span>{exp.company} • {exp.role}</span>
                                <span>{exp.startDate} – {exp.endDate}</span>
                              </div>
                              <ul className="list-disc pl-3 text-slate-700 space-y-0.5">
                                {exp.description.split('\n').slice(0, 2).map((line, j) => (
                                  <li key={j}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="font-bold border-b border-slate-200 mb-1 tracking-widest uppercase text-indigo-600">Education</div>
                            <div className="text-slate-900 font-bold">
                              {template.sample.education[0]?.institution || (template.sample.education[0] as any)?.school}
                            </div>
                            <div className="text-slate-500">{template.sample.education[0]?.degree} • {template.sample.education[0]?.endYear}</div>
                          </div>
                          <div>
                            <div className="font-bold border-b border-slate-200 mb-1 tracking-widest uppercase text-indigo-600">Skills</div>
                            <div className="text-slate-700 flex flex-wrap gap-1">
                              {template.sample.skills.slice(0, 8).map(s => <span key={s} className="bg-slate-50 px-1 rounded border border-slate-100">{s}</span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/builder?role=${template.role}`}
                      className="bg-white text-slate-950 px-8 py-3 rounded-full font-black text-sm shadow-xl active:scale-95 transition-transform"
                    >
                      Use This Sample
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight">
                  Powered by the <span className="text-indigo-400">Elite</span>
                  <br />AI Engine.
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'Metric Injection', desc: 'AI automatically extracts and quantifies your achievements (e.g., "Increased performance by 30%").', icon: '📈' },
                    { title: 'Advanced Verb Rotation', desc: 'Never repeat "Developed" or "Built". Our engine uses 200+ power verbs to sound elite.', icon: '⚡' },
                    { title: 'ATS Compliance Engine', desc: 'Invisible formatting rules ensure every keyword is indexed by corporate software.', icon: '🛡️' },
                  ].map((feature) => (
                    <div key={feature.title} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all font-bold">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
              <div className="relative bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-indigo-400 ml-auto">ZestAI Live Rewrite</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-indigo-500/20">
                    <p className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Before</p>
                    <p className="text-sm italic font-serif opacity-50 line-through">"I worked on React projects and improved the code."</p>
                  </div>
                  <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/40">
                    <p className="text-[10px] text-indigo-400 mb-2 font-mono uppercase">AI Optimized</p>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      "Engineered scalable React architectures, optimizing component rendering for 30% faster load times and enhanced UX."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
            Stop Applying.
            <br />
            <span className="text-indigo-400">Start Interviewing.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            ZestResume is free to start. Join 10,000+ professionals who land more jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="bg-indigo-500 hover:bg-indigo-400 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-indigo-500/30 transition-all hover:-translate-y-1">
              Build My Resume Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-black text-white italic">Z</span>
                </div>
                <span className="text-lg font-bold tracking-tight">Zest<span className="text-indigo-400">Resume</span></span>
              </Link>
              <p className="text-slate-400 text-sm max-w-sm">
                The ultimate high-performance resume builder for modern professionals. Powered by AI, designed for ATS.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Templates</h5>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/builder?template=classic" className="hover:text-white transition-colors">Classic ATS</Link></li>
                <li><Link href="/builder?template=modern" className="hover:text-white transition-colors">Modern Pro</Link></li>
                <li><Link href="/builder?template=minimal" className="hover:text-white transition-colors">Minimalist</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">GTM Roles</h5>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/templates/software-engineer" className="hover:text-white transition-colors">Software Engineer</Link></li>
                <li><Link href="/templates/frontend-developer" className="hover:text-white transition-colors">Frontend Developer</Link></li>
                <li><Link href="/templates/product-manager" className="hover:text-white transition-colors">Product Manager</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
              © {new Date().getFullYear()} ZestResume. All Rights Reserved. Recruiter-Proven AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
