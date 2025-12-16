'use client';

import React, { useRef, useState, useLayoutEffect, MouseEvent, TouchEvent } from 'react';
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

  const textRef = useRef<HTMLParagraphElement>(null);
  const signContainerRef = useRef<HTMLDivElement>(null);
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const PIXELS_PER_CM = 2.4; // Calibrated conversion factor for more realistic measurements
  const baseFontSize = 4; // base font size in rem
  const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;
  const lineHeight = `${baseFontSize * size.multiplier * 1.2}rem`;

  useLayoutEffect(() => {
    if (textRef.current) {
      const { offsetWidth, offsetHeight } = textRef.current;
      setTextDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [text, font, size]);

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
    e.preventDefault(); // Prevents text selection while dragging
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
    lineHeight: lineHeight,
    color: color,
    textShadow: `
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px ${color},
      0 0 20px ${color},
      0 0 25px ${color},
      0 0 30px ${color},
      0 0 35px ${color}
    `,
    ...font.style,
  } as React.CSSProperties;

  const signWidthCm = (textDimensions.width / PIXELS_PER_CM).toFixed(0);
  const signHeightCm = (textDimensions.height / PIXELS_PER_CM).toFixed(0);

  return (
    <div 
      className="relative w-full aspect-[16/9] bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-8 shadow-2xl border-4 border-slate-700"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
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
      <div 
        ref={signContainerRef}
        className="absolute cursor-grab"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <p
          ref={textRef}
          className={cn(
            'relative text-center font-bold break-words transition-all duration-300 ease-in-out select-none',
          )}
          style={textStyle}
        >
          {previewText}
        </p>

        {/* Dimension Lines */}
        {textDimensions.width > 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{width: textDimensions.width, height: textDimensions.height}}>
            {/* Width Dimension */}
            <div className="absolute -bottom-6 left-0 w-full flex flex-col items-center">
              <div className="w-full h-px bg-white/70 relative">
                <div className="absolute left-0 -top-1 w-px h-2 bg-white/70"></div>
                <div className="absolute right-0 -top-1 w-px h-2 bg-white/70"></div>
              </div>
              <span className="text-white/80 text-xs font-mono mt-1 select-none">{signWidthCm} cm</span>
            </div>

            {/* Height Dimension */}
            <div className="absolute -left-10 top-0 h-full flex items-center">
              <div className="h-full w-px bg-white/70 relative">
                <div className="absolute top-0 -left-1 h-px w-2 bg-white/70"></div>
                <div className="absolute bottom-0 -left-1 h-px w-2 bg-white/70"></div>
              </div>
              <span className="text-white/80 text-xs font-mono ml-2 transform -rotate-90 origin-center select-none">{signHeightCm} cm</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
