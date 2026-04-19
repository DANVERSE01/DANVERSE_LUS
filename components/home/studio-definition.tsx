'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

export function StudioDefinition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const text = "We are an interactive production studio. We blend deep technical capability with beautiful art direction to craft digital experiences that people remember.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="w-full min-h-[100vh] flex items-center justify-center py-40 px-6 bg-transparent relative z-10 pointer-events-auto overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-void/50 backdrop-blur-sm pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(157,0,255,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(0,255,204,0.05),transparent_50%)]" />
      </motion.div>

      <div className="max-w-5xl mx-auto flex flex-col gap-12 relative z-10 w-full">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col gap-6"
        >
           <motion.span 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="font-mono text-[11px] text-lusion-purple uppercase tracking-[0.4em] mb-2 block"
           >
             [ VISUAL INTELLIGENCE & ENGINEERING ]
           </motion.span>
           
           <h3 ref={textRef} className="font-sans text-4xl md:text-6xl lg:text-[72px] font-medium leading-[1.1] tracking-tight text-titanium max-w-4xl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ 
                  duration: 1.2, 
                  delay: i * 0.03, // Tighter stagger
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={cn(
                  "inline-block mr-[0.25em] py-1",
                  word.includes("interactive") || word.includes("digital") ? "text-lusion-cyan drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]" : "text-titanium/85",
                  word.includes("remember.") ? "text-lusion-purple drop-shadow-[0_0_20px_rgba(157,0,255,0.4)]" : ""
                )}
              >
                {word}
              </motion.span>
            ))}
           </h3>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, delay: 0.5 }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-titanium/10 pt-12"
        >
          <div className="flex flex-col gap-4">
             <span className="font-mono text-sm text-lusion-cyan uppercase tracking-widest">01</span>
             <h4 className="font-sans text-xl font-medium tracking-tight text-titanium">Visual Intelligence</h4>
             <p className="font-sans text-base text-titanium/50 leading-relaxed max-w-xs">We apply a high level of aesthetic judgment and art direction to everything we build.</p>
          </div>
          <div className="flex flex-col gap-4">
             <span className="font-mono text-sm text-lusion-purple uppercase tracking-widest">02</span>
             <h4 className="font-sans text-xl font-medium tracking-tight text-titanium">Creative Engineering</h4>
             <p className="font-sans text-base text-titanium/50 leading-relaxed max-w-xs">Connecting the dots between cutting-edge technology and impactful design.</p>
          </div>
          <div className="flex flex-col gap-4">
             <span className="font-mono text-sm text-danverse uppercase tracking-widest">03</span>
             <h4 className="font-sans text-xl font-medium tracking-tight text-titanium">Motion Systems</h4>
             <p className="font-sans text-base text-titanium/50 leading-relaxed max-w-xs">Using kinetic animation not just for decoration, but to guide and enhance the user journey.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
