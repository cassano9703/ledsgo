'use client';

import React, { forwardRef, useState, useRef, MouseEvent, TouchEvent } from 'react';
import { cn } from '@/lib/utils';
import type { FontConfig, SizeConfig, BackgroundConfig, ColorConfig, SilhouetteConfig } from '@/lib/config';

interface AcrylicSignPreviewProps {
  text: string;
  font: FontConfig;
  color: ColorConfig;
  size: SizeConfig;
  shape: 'circle' | 'square' | 'rectangle';
  background: BackgroundConfig;
  silhouette: SilhouetteConfig | null;
}

export const AcrylicSignPreview = forwardRef<HTMLDivElement, AcrylicSignPreviewProps>(
  ({ text, font, color, size, shape, background, silhouette }, ref) => {
    const previewText = text || 'Tu Texto Aquí';
    const baseFontSize = 2.5;
    const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;

    const signContainerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleDragStart = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStartPos.current = {
        x: clientX - position.x,
        y: clientY - position.y,
      };
      if (signContainerRef.current) {
        signContainerRef.current.style.cursor = 'grabbing';
      }
    };
    
    const handleDragMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      setPosition({
        x: clientX - dragStartPos.current.x,
        y: clientY - dragStartPos.current.y,
      });
    };
    
    const handleDragEnd = () => {
      setIsDragging(false);
      if (signContainerRef.current) {
        signContainerRef.current.style.cursor = 'grab';
      }
    };

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

    const SilhouetteIcon = silhouette?.Icon;

    return (
      <div 
        ref={ref}
        className="relative w-full aspect-[4/3] bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl border-4 border-slate-700 p-8 transition-all bg-cover bg-center"
        style={{ backgroundImage: `url('${background.imageUrl}')` }}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        
        <div
          ref={signContainerRef}
          className="absolute cursor-grab"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div 
            className={cn(
              "relative flex items-center justify-center p-8 bg-black/10 backdrop-blur-sm transition-all duration-300 overflow-hidden",
              shapeClasses[shape]
            )}
            // Simula el efecto espejo
            style={{
              boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5)',
            }}
          >
            {/* Reflejo sutil */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent "/>

            <div className="relative text-center flex flex-col items-center gap-2">
              {SilhouetteIcon && (
                <SilhouetteIcon 
                  className="transition-all duration-300 ease-in-out"
                  style={{ 
                    color: color.value,
                    width: `${baseFontSize * size.multiplier * 0.8}rem`,
                    height: `${baseFontSize * size.multiplier * 0.8}rem`,
                  }} 
                />
              )}
              <p
                className='font-bold break-words transition-all duration-300 ease-in-out select-none'
                style={textStyle}
              >
                {previewText}
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
);

AcrylicSignPreview.displayName = "AcrylicSignPreview";
