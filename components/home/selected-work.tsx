'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ExternalLink, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: '01',
    title: 'CYBERNETIC SPINE',
    category: 'CGI IMPLANT RENDERING',
    year: '2025',
    image: 'https://picsum.photos/seed/cybernetics/1920/1080?grayscale',
    description: 'A deep dive into biomechanical integration, utilizing high-fidelity CGI to simulate neural-link spinal enhancements with obsidian-class aesthetics.',
    link: '#'
  },
  {
    id: '02',
    title: 'BOTANICAL ILLUSION',
    category: 'CREATIVE DIRECTION',
    year: '2026',
    image: 'https://picsum.photos/seed/floral/1920/1080',
    description: 'Merging organic geometry with digital distortion. An exploration of how floral patterns can be deconstructed through procedural voxel manipulation.',
    link: '#'
  },
  {
    id: '03',
    title: 'KINETIC ASSAULT',
    category: 'ACTION & CHOREOGRAPHY',
    year: '2024',
    image: 'https://picsum.photos/seed/martialarts/1920/1080',
    description: 'Capturing the raw energy of martial arts through motion-tracking digital overlays and aggressive cinematic editing techniques.',
    link: '#'
  },
  {
    id: '04',
    title: 'FRAGMENTED IDENTITIES',
    category: 'GLITCH VEX',
    year: '2026',
    image: 'https://picsum.photos/seed/glitch-art/1920/1080?blur=1',
    description: 'A study on digital self-perception in the age of neural networks. Heavy use of data-moshing and frequency modulation shaders.',
    link: '#'
  },
  {
    id: '05',
    title: 'THERMAL OPTICS',
    category: 'PRODUCT EXPLORATION',
    year: '2025',
    image: 'https://picsum.photos/seed/fire-sunglasses/1920/1080',
    description: 'Product visualization for next-gen wearable tech, featuring heat-reactive materials and reactive lighting systems.',
    link: '#'
  },
  {
    id: '06',
    title: 'NEURAL SYNC',
    category: 'BRAIN-COMPUTER INTERFACE',
    year: '2026',
    image: 'https://picsum.photos/seed/neuron/1920/1080?blur=1',
    description: 'Visualizing data streams between human grey matter and cloud-based synthetic intelligence modules.',
    link: '#'
  },
  {
    id: '07',
    title: 'VOID RUNNER',
    category: 'EXPERIMENTAL KINETICS',
    year: '2025',
    image: 'https://picsum.photos/seed/void-runner/1920/1080?grayscale',
    description: 'A futuristic racing concept exploring hyper-speed aesthetics through vacuum-simulated environments and neon-trace physics.',
    link: '#'
  }
];

export function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} id="work" className="relative h-[700vh] bg-transparent z-10 w-full pointer-events-auto">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        {/* Background gradient/noise */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-void/60 pointer-events-none" 
        />
        
        {/* Section Header */}
        <div className="absolute top-32 left-6 md:left-12 z-20 pointer-events-none">
          <motion.span 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[11px] text-danverse uppercase tracking-[0.2em] mb-4 block"
          >
            [ 02 // SELECTED WORK ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-sans text-5xl md:text-[80px] font-black tracking-[-0.04em] leading-[0.9] text-titanium drop-shadow-[0_4px_20px_rgba(0,0,0,1)]"
          >
            CINEMATIC<br />EXECUTION
          </motion.h2>
        </div>

        {/* Horizontal scroll container */}
        <motion.div style={{ x }} className="flex gap-16 px-6 md:px-[20vw] items-center h-full pt-16 perspective-1000">
          {PROJECTS.map((project, i) => (
            <div 
              key={project.id} 
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] flex-shrink-0 group cursor-none"
              data-cursor="EXPAND"
              onClick={() => setSelectedProject(project)}
            >
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
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
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: i * 0.05 + 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10 lg:translate-y-4 lg:opacity-80 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500"
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-danverse tracking-widest">{project.id} {'//'} {project.category}</span>
                    <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-titanium">{project.title}</h3>
                  </div>
                  <span className="font-mono text-sm text-titanium/50">{project.year}</span>
                </motion.div>

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

      {/* Detailed Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-void/90 backdrop-blur-xl cursor-pointer"
            />
            
            <motion.div 
              layoutId={selectedProject.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-6xl h-fit max-h-[90vh] bg-obsidian border border-titanium/10 shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-30 w-12 h-12 flex items-center justify-center bg-void border border-titanium/10 rounded-full text-titanium hover:bg-danverse hover:border-danverse transition-all group"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Project Visual */}
              <div className="relative w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-transparent hidden md:block" />
              </div>

              {/* Project Info */}
              <div className="p-8 md:p-16 flex flex-col justify-center flex-1 gap-8 relative overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                     <span className="font-mono text-sm text-danverse tracking-widest">{selectedProject.id}</span>
                     <div className="h-[1px] w-12 bg-danverse/30" />
                     <span className="font-mono text-sm text-titanium/40 uppercase tracking-widest">{selectedProject.year}</span>
                  </div>
                  <h2 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-titanium uppercase leading-none">
                    {selectedProject.title}
                  </h2>
                  <p className="font-mono text-xs text-lusion-cyan uppercase tracking-[0.2em]">
                    {selectedProject.category}
                  </p>
                </div>

                <p className="font-sans text-lg text-titanium/60 leading-relaxed max-w-md">
                   {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-6 items-center mt-4">
                  <a 
                    href={selectedProject.link}
                    className="flex items-center gap-3 px-8 py-4 bg-titanium text-void font-bold tracking-widest uppercase text-xs hover:bg-danverse hover:text-titanium transition-all group"
                  >
                    CASE STUDY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="font-mono text-[10px] text-titanium/40 uppercase tracking-[0.3em] hover:text-danverse transition-colors py-2"
                  >
                    [ RETURN TO PORTFOLIO ]
                  </button>
                </div>

                {/* Tactical accents */}
                <div className="absolute bottom-8 right-8 pointer-events-none opacity-10">
                   <div className="font-mono text-[80px] font-black leading-none">
                     {selectedProject.id}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
