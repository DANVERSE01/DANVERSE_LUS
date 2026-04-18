'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full flex items-center justify-between px-10 transition-all duration-500 font-mono text-[11px] tracking-[2px] uppercase border-b border-titanium/10",
        scrolled ? "bg-obsidian/90 backdrop-blur-md py-4" : "bg-obsidian py-4"
      )}
    >
      <div className="flex items-center gap-8">
        <Link href="/" data-cursor="HOME" className="text-titanium hover:text-danverse transition-colors tracking-[2px] flex items-center">
          <span className="inline-block w-1.5 h-1.5 bg-danverse mr-2 animate-[pulse_2s_ease-in-out_infinite]" />
          DANVERSE STUDIO // CORE_V4.0.1
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 mix-blend-difference">
        <Link href="#work" data-cursor="WORK" className="text-titanium/70 hover:text-titanium transition-colors">WORK</Link>
        <Link href="#capabilities" data-cursor="CAPS" className="text-titanium/70 hover:text-titanium transition-colors">CAPABILITIES</Link>
        <Link href="#process" data-cursor="PROCESS" className="text-titanium/70 hover:text-titanium transition-colors">PROCESS</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center gap-2">
          <Link href="#contact" data-cursor="INIT" className="text-titanium hover:text-danverse transition-colors">
            EST. 2024 / LONDON OFFICE
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
