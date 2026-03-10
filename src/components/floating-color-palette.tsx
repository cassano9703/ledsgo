'use client';

import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColorPalette } from '@/components/color-palette';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function FloatingColorPalette() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 transform transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle color palette"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Palette className="w-7 h-7" />}
        </Button>
      </div>

      {/* Palette Backdrop (for closing when clicking outside) */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Panel */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        <Card className="w-[180px] shadow-2xl border-primary/50 neon-glow-primary bg-background/60 backdrop-blur-xl">
          <CardHeader className="p-3 pb-0 text-center">
            <CardTitle className="text-sm font-bold tracking-tight">Colores</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <ColorPalette />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
