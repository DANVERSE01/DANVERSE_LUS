'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const CAPABILITIES = [
  { id: 'SYS.01', name: 'Worldbuilding', desc: 'Constructing cohesive digital environments.' },
  { id: 'SYS.02', name: 'Visual Systems', desc: 'Architecting scalable design languages.' },
  { id: 'SYS.03', name: 'Campaign Direction', desc: 'Orchestrating high-impact narratives.' },
  { id: 'SYS.04', name: 'Motion Intelligence', desc: 'Directing cinematic, physics-based motion.' },
  { id: 'SYS.05', name: 'Digital Storytelling', desc: 'Crafting non-linear immersive journeys.' },
  { id: 'SYS.06', name: 'Premium Execution', desc: 'Delivering flawless technical implementation.' },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="w-full py-32 px-6 bg-transparent relative border-t border-titanium/10 z-10 pointer-events-auto">
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <span className="font-mono text-[11px] text-lusion-cyan uppercase tracking-[0.2em] block">
            [ EXPERTISE ]
          </span>
          <h2 className="font-sans text-5xl md:text-[80px] font-medium tracking-tight leading-[0.9] text-titanium drop-shadow-md">
            Creative<br/>Technology
          </h2>
          <p className="font-sans text-titanium/60 text-base max-w-sm mt-4 leading-relaxed tracking-wide">
            We don&apos;t just build websites. We create immersive digital worlds that command attention through interactive 3D and fluid motion.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
          {CAPABILITIES.map((cap, i) => (
            <motion.div 
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col gap-4 group cursor-none relative"
              data-cursor="OPEN"
            >
              {/* Cinematic Glow Hover Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-lusion-purple)_0%,transparent_70%)] opacity-0 group-hover:opacity-10 pointer-events-none -z-10 transition-opacity duration-700 blur-xl mix-blend-screen" />

              <div className="flex items-center gap-4 pb-4 hover-fluid transition-colors duration-300 relative overflow-hidden text-titanium/30 group-hover:text-lusion-cyan">
                <span className="font-mono text-xs tracking-widest relative z-10 transition-colors">{cap.id}</span>
                <div className="h-[1px] flex-grow bg-titanium/10 relative z-10" />
              </div>
              <h3 className="font-sans text-3xl font-medium tracking-tight text-titanium group-hover:text-white transition-colors flex items-center gap-3">
                {cap.name}
              </h3>
              <p className="font-sans text-sm text-titanium/50 leading-relaxed max-w-xs transition-colors group-hover:text-titanium">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
