'use client';

import { useState } from 'react';
import { Hero } from '@/components/home/hero';
import { StudioDefinition } from '@/components/home/studio-definition';
import { SelectedWork } from '@/components/home/selected-work';
import { Capabilities } from '@/components/home/capabilities';
import { Process } from '@/components/home/process';
import { Contact } from '@/components/home/contact';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Preloader } from '@/components/ui/preloader';
import { AnimatePresence } from 'motion/react';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  return (
    <ReactLenis root>
      <AnimatePresence mode="wait">
        {!isReady && <Preloader key="preloader" onComplete={() => setIsReady(true)} />}
      </AnimatePresence>
      <main className="w-full flex min-h-screen flex-col bg-transparent overflow-hidden">
        <Hero isReady={isReady} />
        <StudioDefinition />
        <SelectedWork />
        <Capabilities />
        <Process />
        <Contact />
      </main>
    </ReactLenis>
  );
}
