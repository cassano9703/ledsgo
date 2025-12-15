'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { FontConfig, SizeConfig } from '@/lib/config';

interface LedSignPreviewProps {
  text: string;
  font: FontConfig;
  color: string;
  size: SizeConfig;
}

export function LedSignPreview({ text, font, color, size }: LedSignPreviewProps) {
  const previewText = text || 'Your Text Here';

  const baseFontSize = 3; // base font size in rem
  const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;
  const lineHeight = `${baseFontSize * size.multiplier * 1.2}rem`;

  return (
    <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-8 shadow-2xl border-4 border-slate-700">
      <div 
        className="absolute inset-0 bg-repeat bg-[length:20px_20px]" 
        style={{backgroundImage: 'radial-gradient(hsla(0,0%,100%,.05) 1px, transparent 0)'}}
        aria-hidden="true"
      />
      <p
        className={cn(
          'text-center font-bold break-words transition-all duration-300 ease-in-out',
          color !== '#FFFFFF' && 'animate-glow'
        )}
        style={{
          '--glow-color': color,
          fontFamily: font.style.fontFamily,
          fontSize: dynamicFontSize,
          lineHeight: lineHeight,
          color: color,
        } as React.CSSProperties}
      >
        {previewText}
      </p>
    </div>
  );
}
