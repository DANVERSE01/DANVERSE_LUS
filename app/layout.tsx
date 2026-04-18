import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { Navigation } from '@/components/layout/navigation';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DANVERSE STUDIO | Cinematic Digital Platform',
  description: 'Digital command environment for elite creative execution. Cinematic digital brutalism, tactical luxury interface.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-void text-titanium overflow-x-hidden" suppressHydrationWarning>
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
