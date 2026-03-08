import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background decorations */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary-light border border-primary/20 mb-6">
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up">
            Build an ATS-Friendly Resume
            <br />
            <span className="gradient-text">in Under 2 Minutes</span>
          </h1>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Stop spending hours on your resume. ZestResume uses AI to craft
            professionally written, recruiter-approved resumes that get you
            through applicant tracking systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/builder" className="btn-primary text-base px-8 py-3.5 animate-pulse-glow">
              Create Your Resume — Free →
            </Link>
            <Link href="/resume/software-engineer" className="btn-secondary text-base px-8 py-3.5">
              See Example
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { value: '2 min', label: 'Average build time' },
              { value: '95%', label: 'ATS pass rate' },
              { value: 'Free', label: 'No credit card' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary-light">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Three simple steps to your perfect resume. No sign-up required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Fill in Your Details',
                description: 'Enter your experience, education, and skills into our intuitive form. It guides you through every section.',
                icon: '📝',
              },
              {
                step: '02',
                title: 'AI Enhances Your Content',
                description: 'Our AI rewrites bullet points with strong action verbs and professional tone, optimized for ATS systems.',
                icon: '✨',
              },
              {
                step: '03',
                title: 'Download Your Resume',
                description: 'Preview your polished resume in real-time and download a pixel-perfect PDF ready to send to employers.',
                icon: '📄',
              },
            ].map((item) => (
              <div key={item.step} className="card group hover:border-primary/40 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-5xl font-black text-surface-lighter/40 select-none">
                  {item.step}
                </div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Template Preview */}
      <section className="py-24 bg-surface-light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Clean, <span className="gradient-text">ATS-Friendly</span> Template
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Our single-column template is designed to pass through any applicant tracking system while looking great to human reviewers.
            </p>
          </div>

          {/* Mock Resume Preview */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl shadow-primary/10 p-10 text-gray-800">
              <div className="text-center mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-2xl font-bold text-gray-900">Alex Johnson</h3>
                <p className="text-sm text-gray-500 mt-1">
                  alex@email.com · (555) 123-4567 · San Francisco, CA
                </p>
                <p className="text-sm text-gray-500">
                  linkedin.com/in/alexjohnson · alexjohnson.dev
                </p>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-200 pb-1">
                  Professional Summary
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Results-driven software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud infrastructure, delivering products that serve millions of users.
                </p>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-200 pb-1">
                  Experience
                </h4>
                <div className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-sm">Senior Frontend Engineer</span>
                    <span className="text-xs text-gray-500">2022 – Present</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">TechCorp Inc.</div>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
                    <li>Led migration to Next.js, reducing page load time by 40%</li>
                    <li>Mentored team of 4 junior developers across 3 projects</li>
                  </ul>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-200 pb-1">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Join thousands of job seekers who&apos;ve built standout resumes with
            ZestResume. It&apos;s free, fast, and powered by AI.
          </p>
          <Link href="/builder" className="btn-primary text-base px-10 py-4 animate-pulse-glow">
            Start Building Your Resume →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-text-muted">
            © {new Date().getFullYear()} ZestResume. Built with AI.
          </div>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="/builder" className="hover:text-text-primary transition-colors">Builder</Link>
            <Link href="/resume/software-engineer" className="hover:text-text-primary transition-colors">Examples</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
