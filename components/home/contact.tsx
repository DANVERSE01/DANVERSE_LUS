'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export function Contact() {
  return (
    <section id="contact" className="w-full min-h-[80vh] py-32 px-6 bg-transparent relative flex flex-col justify-between z-10 pointer-events-auto">
      <div className="absolute inset-0 bg-void/50 backdrop-blur-sm pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col items-center justify-center gap-8 text-center relative z-10">
        <span className="font-mono text-[11px] text-lusion-cyan uppercase tracking-[0.2em] block">
          [ GET IN TOUCH ]
        </span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-sans text-5xl md:text-8xl lg:text-[130px] font-medium tracking-tight text-titanium leading-[0.8] drop-shadow-lg"
        >
          Let&apos;s talk.
        </motion.h2>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5, duration: 1 }}
        >
          <Link 
            href="mailto:contact@danverse.studio"
            className="inline-block mt-8 text-xl md:text-3xl font-sans text-titanium/60 hover:text-white transition-colors duration-500 cursor-none relative hover-fluid"
            data-cursor="HELLO"
          >
            hello@danverse.studio
          </Link>
        </motion.div>
      </div>

      <footer className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-titanium/5 pt-12 mt-24 relative z-10">
         <div className="flex items-center gap-6 font-mono text-[11px] opacity-60 uppercase tracking-widest text-titanium">
           <div>© 2026 DANVERSE STUDIO.</div>
           <div className="hidden md:block">ALL RIGHTS RESERVED.</div>
         </div>
         <div className="flex items-center gap-8">
           <Link href="#" className="font-mono text-[11px] text-titanium/50 hover:text-lusion-cyan transition-colors uppercase tracking-[2px] cursor-none" data-cursor="LINK">AWWWARDS</Link>
           <Link href="#" className="font-mono text-[11px] text-titanium/50 hover:text-lusion-cyan transition-colors uppercase tracking-[2px] cursor-none" data-cursor="LINK">TWITTER</Link>
           <Link href="#" className="font-mono text-[11px] text-titanium/50 hover:text-lusion-cyan transition-colors uppercase tracking-[2px] cursor-none" data-cursor="LINK">LINKEDIN</Link>
         </div>
      </footer>
    </section>
  );
}
