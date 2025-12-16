'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
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
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });

  const baseFontSize = 3; // base font size in rem
  const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;
  const lineHeight = `${baseFontSize * size.multiplier * 1.2}rem`;

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextDimensions({
        width: textRef.current.offsetWidth,
        height: textRef.current.offsetHeight,
      });
    }
  }, [text, font, size]);

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
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className="absolute bg-black/20 backdrop-blur-[2px] rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: `${textDimensions.width + 32}px`, // 32px for padding
            height: `${textDimensions.height + 16}px`, // 16px for padding
          }}
        />
        <p
          ref={textRef}
          className={cn(
            'relative text-center font-bold break-words transition-all duration-300 ease-in-out',
          )}
          style={textStyle}
        >
          {previewText}
        </p>
      </div>
    </div>
  );
}
