'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isBuilder = pathname === '/builder';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110">
                        Z
                    </div>
                    <span className="text-lg font-bold text-text-primary">
                        Zest<span className="text-primary-light">Resume</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    {!isBuilder && (
                        <>
                            <Link
                                href="/resume/software-engineer"
                                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                            >
                                Examples
                            </Link>
                        </>
                    )}
                    <Link
                        href={isBuilder ? '/' : '/builder'}
                        className={isBuilder ? 'btn-secondary text-sm' : 'btn-primary text-sm'}
                    >
                        {isBuilder ? '← Back Home' : 'Create Resume →'}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
