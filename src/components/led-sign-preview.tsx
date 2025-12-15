'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { FontConfig, SizeConfig, BackgroundConfig } from '@/lib/config';

interface LedSignPreviewProps {
  text: string;
  font: FontConfig;
  color: string;
  size: SizeConfig;
  background: BackgroundConfig;
}

export function LedSignPreview({ text, font, color, size, background }: LedSignPreviewProps) {
  const previewText = text || 'Tu Texto Aquí';

  const baseFontSize = 3; // base font size in rem
  const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;
  const lineHeight = `${baseFontSize * size.multiplier * 1.2}rem`;

  return (
    <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-8 shadow-2xl border-4 border-slate-700">
      {background.imageUrl && (
        <Image
          src={background.imageUrl}
          alt={background.name}
          fill
          className="object-cover"
          data-ai-hint={background.imageHint}
        />
      )}
      <div 
        className={cn("absolute inset-0", background.imageUrl ? 'bg-black/20' : "bg-repeat bg-[length:20px_20px]")}
        style={!background.imageUrl ? {backgroundImage: 'radial-gradient(hsla(0,0%,100%,.05) 1px, transparent 0)'} : {}}
        aria-hidden="true"
      />
      <p
        className={cn(
          'relative text-center font-bold break-words transition-all duration-300 ease-in-out z-10',
          color !== '#FFFFFF' && 'animate-glow'
        )}
        style={{
          '--glow-color': color,
          fontFamily: font.style.fontFamily,
          fontSize: dynamicFontSize,
          lineHeight: lineHeight,
          color: color,
          ...font.style
        } as React.CSSProperties}
      >
        {previewText}
      </p>
    </div>
  );
}
