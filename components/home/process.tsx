'use client';

import { motion } from 'motion/react';

const PROCESS_STEPS = [
  { num: '01', title: 'Concept & Strategy', desc: 'Working closely to understand your brand and define a bold creative direction.' },
  { num: '02', title: 'Design & Motion', desc: 'Crafting beautiful interfaces and fluid motion systems that feel alive.' },
  { num: '03', title: 'WebGL & Interaction', desc: 'Building custom 3D experiences, shaders, and micro-interactions.' },
  { num: '04', title: 'Development', desc: 'Ensuring everything runs flawlessly across devices with high performance.' },
];

export function Process() {
  return (
    <section id="process" className="w-full py-32 px-6 bg-transparent relative overflow-hidden border-t border-titanium/5 z-10 pointer-events-auto">
      <div className="absolute inset-0 bg-void/30 backdrop-blur-md pointer-events-none" />
      {/* Background glow */}
      <div className="absolute left-0 bottom-0 w-[800px] h-[800px] bg-lusion-purple/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10 w-full">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[11px] text-lusion-purple uppercase tracking-[0.2em] block">
            [ OUR PROCESS ]
          </span>
          <h2 className="font-sans text-5xl md:text-[80px] font-medium tracking-tight leading-[0.9] text-titanium drop-shadow-md max-w-3xl">
            How we bring<br/>ideas to life.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col gap-6 border-l border-titanium/10 pl-6 hover:border-lusion-cyan transition-colors duration-500 cursor-none group"
              data-cursor="READ"
            >
              <span className="font-mono text-xs text-titanium/30 tracking-widest block transition-colors group-hover:text-lusion-cyan">{step.num}</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-2xl font-medium text-titanium tracking-tight transition-colors group-hover:text-white">{step.title}</h3>
                <p className="font-sans text-base text-titanium/50 leading-relaxed transition-colors group-hover:text-titanium/80">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
