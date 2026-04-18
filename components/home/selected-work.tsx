'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: '01',
    title: 'CYBERNETIC SPINE',
    category: 'CGI IMPLANT RENDERING',
    year: '2025',
    image: 'https://picsum.photos/seed/cybernetics/1920/1080?grayscale'
  },
  {
    id: '02',
    title: 'BOTANICAL ILLUSION',
    category: 'CREATIVE DIRECTION',
    year: '2026',
    image: 'https://picsum.photos/seed/floral/1920/1080'
  },
  {
    id: '03',
    title: 'KINETIC ASSAULT',
    category: 'ACTION & CHOREOGRAPHY',
    year: '2024',
    image: 'https://picsum.photos/seed/martialarts/1920/1080'
  },
  {
    id: '04',
    title: 'FRAGMENTED IDENTITIES',
    category: 'GLITCH VEX',
    year: '2026',
    image: 'https://picsum.photos/seed/glitch-art/1920/1080?blur=1'
  },
  {
    id: '05',
    title: 'THERMAL OPTICS',
    category: 'PRODUCT EXPLORATION',
    year: '2025',
    image: 'https://picsum.photos/seed/fire-sunglasses/1920/1080'
  }
];

export function SelectedWork() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // 5 items

  return (
    <section ref={targetRef} id="work" className="relative h-[500vh] bg-transparent z-10 w-full pointer-events-auto">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        {/* Background gradient/noise */}
        <div className="absolute inset-0 bg-void/60 pointer-events-none" />
        
        {/* Section Header */}
        <div className="absolute top-32 left-6 md:left-12 z-20 pointer-events-none">
          <span className="font-mono text-[11px] text-danverse uppercase tracking-[0.2em] mb-4 block">
            [ 02 // SELECTED WORK ]
          </span>
          <h2 className="font-sans text-5xl md:text-[80px] font-black tracking-[-0.04em] leading-[0.9] text-titanium drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
            CINEMATIC<br />EXECUTION
          </h2>
        </div>

        {/* Horizontal scroll container */}
        <motion.div style={{ x }} className="flex gap-16 px-6 md:px-[20vw] items-center h-full pt-16 perspective-1000">
          {PROJECTS.map((project, i) => (
            <div 
              key={project.id} 
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] flex-shrink-0 group cursor-none"
              data-cursor="VIEW"
            >
              <motion.div 
                initial={{ rotateY: 25, scale: 0.8, opacity: 0 }}
                whileInView={{ rotateY: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px -20%" }}
                transition={{ duration: 1.2, delay: 0.1, type: "spring", damping: 15 }}
                className="w-full h-full relative overflow-hidden bg-obsidian/80 border border-titanium/5 group-hover:border-danverse/50 transition-colors duration-500 shadow-2xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1] grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-80" />
                
                {/* Item Details */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10 translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-danverse tracking-widest">{project.id} {'//'} {project.category}</span>
                    <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-titanium">{project.title}</h3>
                  </div>
                  <span className="font-mono text-sm text-titanium/50">{project.year}</span>
                </div>

                {/* Tactical Frame borders */}
                <div className="absolute top-0 left-0 w-4 h-[1px] bg-titanium/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 left-0 w-[1px] h-4 bg-titanium/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-titanium/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-titanium/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
