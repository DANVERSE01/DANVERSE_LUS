'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('INI_SYSTEM_CORE');

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate erratic loading speeds for realism
      const increment = Math.random() * 15;
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setPhase('SYS_ONLINE');
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 800);
      } else if (currentProgress > 70) {
        setPhase('LOADING_WEBGL_SHADERS');
      } else if (currentProgress > 40) {
        setPhase('AURA_PROTOCOL_SYNC');
      }

      setProgress(Math.min(currentProgress, 100));
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-10vh' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col justify-end p-10 bg-void text-titanium"
    >
      <div className="noise-overlay" />
      <div className="scanline" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
         <h1 className="font-sans text-[20vw] font-black tracking-[-0.04em] leading-none">DNVS</h1>
      </div>

      <div className="flex flex-col gap-6 relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-end font-mono text-[11px] uppercase tracking-[2px] text-titanium/50">
          <div className="flex flex-col gap-1">
            <span>[ SYSTEM BOOT SEQUENCE ]</span>
            <span className="text-danverse flex items-center gap-2">
              {phase} <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>_</motion.span>
            </span>
          </div>
          <div className="text-right flex flex-col items-end">
             <span>MEM_ALLOC: {Math.floor(progress * 24.5)}MB</span>
             <span className="text-titanium text-4xl mt-2">{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="w-full h-[2px] bg-obsidian relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-danverse"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
