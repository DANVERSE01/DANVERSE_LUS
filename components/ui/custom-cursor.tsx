'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickableArea = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (clickableArea) {
        setIsHovering(true);
        const dataCursor = clickableArea.getAttribute('data-cursor');
        setLabel(dataCursor);
      } else {
        setIsHovering(false);
        setLabel(null);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-danverse rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:block"
        style={{ boxShadow: '0 0 20px 4px var(--color-danverse), 0 0 40px var(--color-lusion-purple)' }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />
      
      <motion.div
        className={cn(
          "fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex mix-blend-screen overflow-hidden border border-white/10",
        )}
        style={{
          backgroundColor: isHovering ? 'rgba(8, 8, 8, 0.4)' : 'rgba(255, 255, 255, 0)',
        }}
        animate={{
          x: position.x,
          y: position.y,
          width: isHovering ? 100 : 48,
          height: isHovering ? 100 : 48,
          boxShadow: isHovering 
            ? 'inset 0 0 20px var(--color-lusion-cyan), 0 0 40px rgba(255, 16, 64, 0.3)' 
            : 'inset 0 0 10px rgba(255, 255, 255, 0.1)',
          scale: isHovering ? 1.1 : 1,
          backdropFilter: isHovering ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 120, 
          damping: 24, 
          mass: 0.8,
          // Specific transitions for some properties to make them smoother
          width: { type: 'spring', stiffness: 100, damping: 20 },
          height: { type: 'spring', stiffness: 100, damping: 20 },
          scale: { type: 'spring', stiffness: 80, damping: 15 },
          backdropFilter: { duration: 0.4 },
          backgroundColor: { duration: 0.3 }
        }}
      >
        <AnimatePresence mode="wait">
          {isHovering && label && (
            <motion.span 
              key={label}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] font-sans font-bold tracking-[0.2em] text-titanium uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] whitespace-nowrap px-4"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
