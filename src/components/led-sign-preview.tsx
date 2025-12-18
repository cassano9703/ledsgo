'use client';

import React, { useRef, useState, MouseEvent, TouchEvent, useLayoutEffect, forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { BackgroundConfig, FontConfig, SizeConfig } from '@/lib/config';

interface LedSignPreviewProps {
  text: string;
  text2?: string;
  font: FontConfig;
  color: string;
  size: SizeConfig;
  background: BackgroundConfig;
}

export const LedSignPreview = forwardRef<HTMLDivElement, LedSignPreviewProps>(
  ({ text, text2, font, color, size, background }, ref) => {
    const previewText = text || 'Tu Texto Aquí';
    const hasSecondLine = text2 && text2.trim() !== '';

    const textRef = useRef<HTMLDivElement>(null);
    const signContainerRef = useRef<HTMLDivElement>(null);
    const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
    
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const PIXELS_PER_CM = 3.8;
    const baseFontSize = 4;
    const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;
    const lineHeight = `${baseFontSize * size.multiplier * 1.2}rem`;

    useLayoutEffect(() => {
      const textElement = textRef.current;
      if (!textElement) return;

      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setTextDimensions({
            width: width,
            height: height,
          });
        }
      });

      observer.observe(textElement);
      return () => {
        observer.disconnect();
      };
    }, [text, text2, font, size]);

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

    const isCutToShape = background.name === 'Corte de Silueta';
    const isRectangular = background.name === 'Corte Rectangular';

    const getMaskSvg = (textToMask: string) => {
      // Basic sanitization
      const sanitizedText = textToMask.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${textDimensions.width} ${textDimensions.height}"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-family: ${font.style.fontFamily}; font-size: ${dynamicFontSize}; font-weight: ${font.style.fontWeight || 'normal'};">${sanitizedText}</text></svg>')`;
    };
    
    const getMaskStyle = () => {
      if (!isCutToShape || !textDimensions.width || !textDimensions.height) return {};
    
      let fullText = previewText;
      if (hasSecondLine) {
        // This is tricky because SVG <text> doesn't wrap lines like HTML.
        // For a simple two-liner, we can use two <text> elements with dy.
        const sanitizedLine1 = previewText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const sanitizedLine2 = text2.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${textDimensions.width} ${textDimensions.height}">
                      <text x="50%" y="50%" dy="-${(parseFloat(lineHeight) / 4)}rem" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-family: ${font.style.fontFamily}; font-size: ${dynamicFontSize}; font-weight: ${font.style.fontWeight || 'normal'};">${sanitizedLine1}</text>
                      <text x="50%" y="50%" dy="${(parseFloat(lineHeight) / 3)}rem" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-family: ${font.style.fontFamily}; font-size: ${dynamicFontSize}; font-weight: ${font.style.fontWeight || 'normal'};">${sanitizedLine2}</text>
                    </svg>`;

        return {
          maskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        };
      } else {
         const sanitizedText = previewText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
         const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${textDimensions.width} ${textDimensions.height}">
                       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" style="font-family: ${font.style.fontFamily}; font-size: ${dynamicFontSize}; font-weight: ${font.style.fontWeight || 'normal'};">${sanitizedText}</text>
                     </svg>`;
        return {
          maskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        };
      }
    };

    return (
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <div 
            ref={ref}
            className="relative w-full aspect-[16/9] bg-green-900/50 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl border-4 border-slate-700 p-8"
            style={{ 
              backgroundImage: `url('https://i.imgur.com/uG9sYbd.jpeg')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div 
              className="absolute inset-0 bg-black/20"
              aria-hidden="true"
            />
            <div 
              ref={signContainerRef}
              className="absolute cursor-grab"
              style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
               <div
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                  "bg-black/30 backdrop-blur-sm",
                  isRectangular && "rounded-md",
                )}
                style={{
                  width: isCutToShape ? textDimensions.width : (textDimensions.width + 60),
                  height: isCutToShape ? textDimensions.height: (textDimensions.height + 60),
                  padding: isCutToShape ? '15px' : '0',
                  opacity: isCutToShape || isRectangular ? 1 : 0,
                  ...getMaskStyle(),
                }}
              />
              <div
                ref={textRef}
                className={cn(
                  'relative text-center font-bold break-words transition-all duration-300 ease-in-out select-none',
                )}
                style={textStyle}
              >
                <p>{previewText}</p>
                {hasSecondLine && <p>{text2}</p>}
              </div>

              {textDimensions.width > 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{width: textDimensions.width, height: textDimensions.height}}>
                  <div className="absolute -bottom-6 left-0 w-full flex flex-col items-center">
                    <div className="w-full h-px bg-white/70 relative">
                      <div className="absolute left-0 -top-1 w-px h-2 bg-white/70"></div>
                      <div className="absolute right-0 -top-1 w-px h-2 bg-white/70"></div>
                    </div>
                    <span className="text-white/80 text-xs font-mono mt-1 select-none">{signWidthCm} cm</span>
                  </div>

                  <div className="absolute -right-10 top-0 h-full flex items-center">
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
        </div>
      </div>
    );
  }
);

LedSignPreview.displayName = "LedSignPreview";
