'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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
        className="fixed top-0 left-0 w-4 h-4 bg-danverse rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:block"
        style={{ boxShadow: '0 0 20px 4px var(--color-danverse), 0 0 40px var(--color-lusion-purple)' }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }}
      />
      
      <motion.div
        className={cn(
          "fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex mix-blend-screen",
          isHovering ? "w-[80px] h-[80px] bg-void/5" : "w-12 h-12 bg-transparent"
        )}
        style={{
          boxShadow: isHovering ? 'inset 0 0 20px var(--color-lusion-cyan), 0 0 30px var(--color-danverse)' : 'inset 0 0 10px rgba(255,255,255,0.1)'
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      >
        {isHovering && label && (
          <motion.span 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-sans font-bold tracking-widest text-titanium uppercase drop-shadow-md"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
