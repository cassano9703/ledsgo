
'use client';

import React, { forwardRef, useState, useRef, MouseEvent, TouchEvent } from 'react';
import { cn } from '@/lib/utils';
import { mirrorFinishColors, type FontConfig, type SizeConfig, type BackgroundConfig, type ColorConfig, type FrameConfig } from '@/lib/config';

interface AcrylicSignPreviewProps {
  text: string;
  text2?: string;
  font: FontConfig;
  font2: FontConfig;
  color: ColorConfig;
  mirrorColor: ColorConfig;
  size: SizeConfig;
  shape: 'circle' | 'square' | 'rectangle';
  background: BackgroundConfig;
  frame: FrameConfig;
  frameStyle: 'edge' | 'margin' | 'corners';
  withStandoffs: boolean;
  standoffColor: ColorConfig;
  withBacklight: boolean;
  backlightColor: ColorConfig;
}

export const AcrylicSignPreview = forwardRef<HTMLDivElement, AcrylicSignPreviewProps>(
  ({ text, text2, font, font2, color, mirrorColor, size, shape, background, frame, frameStyle, withStandoffs, standoffColor, withBacklight, backlightColor }, ref) => {
    const previewText = text || 'Tu Texto Aquí';
    const baseFontSize = 2.5;
    const dynamicFontSize = `${baseFontSize * size.multiplier}rem`;
    const subtitleFontSize = `${baseFontSize * size.multiplier * 0.6}rem`;

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

    const isMirrorFinish = mirrorFinishColors.some(c => c.name === color.name);
    const isTransparentSign = mirrorColor.name === 'Plateado';
    const isSolidWhite = mirrorColor.name === 'Blanco Lechoso';

    const getTextStyle = (baseFont: FontConfig, fontSize: string): React.CSSProperties => {
        const style: React.CSSProperties = {
            fontFamily: baseFont.style.fontFamily,
            fontSize: fontSize,
            ...baseFont.style,
        };

        if (isMirrorFinish) {
          if (isSolidWhite) {
            // On white background, the reflection is less visible and can affect readability.
            // We use the solid color with a more subtle glow.
            style.color = color.value;
            style.textShadow = `0 0 8px ${color.value}`;
          } else {
            style.backgroundImage = `linear-gradient(145deg, hsla(0,0%,100%,.9) 15%, ${color.value} 50%, hsla(0,0%,100%,.9) 85%)`;
            style.backgroundClip = 'text';
            style.WebkitBackgroundClip = 'text';
            style.color = 'transparent';
            style.filter = `drop-shadow(0 0 5px ${color.value})`;
          }
        } else {
            style.color = color.value;
            style.textShadow = `0 0 8px ${color.value}`;
        }
        return style;
    };
    
    const textStyle = getTextStyle(font, dynamicFontSize);
    
    const subtitleTextStyle = {
      ...getTextStyle(font2, subtitleFontSize),
      fontWeight: '400',
    };

    const shapeClasses = {
      circle: 'rounded-full aspect-square',
      square: 'rounded-2xl aspect-square',
      rectangle: 'rounded-2xl aspect-[16/9]',
    };

    const hasFrame = frame.name !== "Sin Marco";
    
    const frameInsetClass = frameStyle === 'edge' ? 'inset-0' : 'inset-2';

    const Standoff = ({ className }: { className?: string }) => (
      <div className={cn("absolute w-4 h-4 rounded-full shadow-md border border-slate-400/50 z-10", standoffColor.twClass, className)} />
    );

    const isDorado = frame.name === 'Dorado Brilloso';
    const isCircularWithSquareFrame = shape === 'circle' && hasFrame;

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
          className="absolute cursor-grab w-1/2"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            filter: withBacklight && !isTransparentSign
              ? `drop-shadow(0 0 40px ${backlightColor.value}) drop-shadow(0 0 150px ${backlightColor.value})`
              : 'none',
            transition: 'filter 0.3s ease-in-out',
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className={cn(
            "relative flex items-center justify-center",
            isCircularWithSquareFrame ? shapeClasses.square : shapeClasses[shape],
            isCircularWithSquareFrame && !isTransparentSign ? mirrorColor.twClass : ''
            )}>
            <div 
              className={cn(
                "relative w-full h-full flex items-center justify-center transition-all duration-300 overflow-hidden",
                !isSolidWhite && "backdrop-blur-sm",
                isCircularWithSquareFrame ? '' : (!isTransparentSign && mirrorColor.twClass),
                shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
              )}
               style={{
                boxShadow: [
                  withBacklight && isTransparentSign ? `inset 0 0 150px ${backlightColor.value}` : null,
                  !isSolidWhite ? 'inset 0 0 60px rgba(255,255,255,0.1)' : null, 
                  '0 0 20px rgba(0,0,0,0.5)'
                ].filter(Boolean).join(', '),
              }}
            >
              <div className={cn("absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent", shape === 'circle' ? 'rounded-full' : 'rounded-t-2xl')} />
              
              {withStandoffs && (
                shape === 'circle' ? (
                  <>
                    <Standoff className="top-1/2 left-4 -translate-y-1/2" />
                    <Standoff className="top-1/2 right-4 -translate-y-1/2" />
                  </>
                ) : (
                  <>
                    <Standoff className="top-4 left-4" />
                    <Standoff className="top-4 right-4" />
                    <Standoff className="bottom-4 left-4" />
                    <Standoff className="bottom-4 right-4" />
                  </>
                )
              )}

              <div className={cn(
                "absolute text-center flex flex-col items-center justify-center gap-2 p-8 overflow-hidden",
                hasFrame ? frameInsetClass : 'inset-0'
              )}>
                <p
                  className='font-bold break-words transition-all duration-300 ease-in-out select-none'
                  style={textStyle}
                >
                  {previewText}
                </p>
                {text2 && (
                  <p
                    className='break-words transition-all duration-300 ease-in-out select-none'
                    style={subtitleTextStyle}
                  >
                    {text2}
                  </p>
                )}
              </div>
            </div>
            {hasFrame && (
              <div
                className={cn(
                  'absolute pointer-events-none',
                  frameInsetClass,
                   'rounded-2xl'
                )}
                style={
                  isDorado ? {
                    border: '4px solid transparent',
                    borderImage: `linear-gradient(145deg, hsla(0,0%,100%,.9) 15%, ${frame.value} 50%, hsla(0,0%,100%,.9) 85%) 1`,
                    filter: `drop-shadow(0 0 8px ${frame.value})`,
                  } : {
                    border: `4px solid ${frame.value}`,
                  }
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

AcrylicSignPreview.displayName = "AcrylicSignPreview";
