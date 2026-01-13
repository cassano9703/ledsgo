'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { FontConfig, SizeConfig, BackgroundConfig, ColorConfig } from '@/lib/config';

interface AcrylicSignPreviewProps {
  text: string;
  font: FontConfig;
  color: ColorConfig;
  size: SizeConfig;
  shape: 'circle' | 'square' | 'rectangle';
  background: BackgroundConfig;
}

export const AcrylicSignPreview = forwardRef<HTMLDivElement, AcrylicSignPreviewProps>(
  ({ text, font, color, size, shape, background }, ref) => {
    const previewText = text || 'Tu Texto Aquí';
    const baseFontSize = 2.5;
    const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;

    const textStyle = {
      fontFamily: font.style.fontFamily,
      fontSize: dynamicFontSize,
      color: color.value,
      ...font.style,
    } as React.CSSProperties;
    
    const shapeClasses = {
      circle: 'rounded-full aspect-square w-3/4',
      square: 'rounded-2xl aspect-square w-3/4',
      rectangle: 'rounded-2xl aspect-[16/9] w-full',
    };

    return (
      <div 
        ref={ref}
        className="relative w-full aspect-[4/3] bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl border-4 border-slate-700 p-8 transition-all bg-cover bg-center"
        style={{ backgroundImage: `url('${background.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        
        <div 
          className={cn(
            "relative flex items-center justify-center p-8 bg-black/10 backdrop-blur-sm transition-all duration-300",
            shapeClasses[shape]
          )}
          // Simula el efecto espejo
          style={{
            boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5)',
            transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
          }}
        >
           {/* Reflejo sutil */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent "/>

          <p
            className='relative text-center font-bold break-words transition-all duration-300 ease-in-out select-none'
            style={textStyle}
          >
            {previewText}
          </p>
        </div>
      </div>
    );
  }
);

AcrylicSignPreview.displayName = "AcrylicSignPreview";
