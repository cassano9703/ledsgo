'use client';

import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColorPalette } from '@/components/color-palette';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function FloatingColorPalette() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 transform transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle color palette"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Palette className="w-8 h-8" />}
        </Button>
      </div>

      {/* Palette Modal/Panel */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        <Card className="w-[350px] sm:w-[550px] max-w-lg shadow-2xl border-primary neon-glow-primary">
          <CardHeader>
            <CardTitle>Nuestra Paleta de Colores</CardTitle>
            <CardDescription>
              Elige entre nuestra vibrante selección para crear un letrero único.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorPalette />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
