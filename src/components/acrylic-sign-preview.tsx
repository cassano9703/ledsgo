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


const FrameOverlay = ({ frame, frameStyle, isDorado, shape }: { frame: FrameConfig, frameStyle: string, isDorado: boolean, shape: string }) => {
  const frameBgStyle: React.CSSProperties = isDorado
    ? { backgroundImage: `linear-gradient(170deg, #FFFFFF, ${frame.value}, #FFFFFF)` }
    : { backgroundColor: frame.value };

  if (frameStyle === 'corners') {
    const margin = '8px';
    const armLength = '30%';
    const armWidth = '5%'; 

    const Corner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
      let style: React.CSSProperties = {
        position: 'absolute',
        width: armLength,
        height: armLength,
        ...frameBgStyle,
      };

      if (position === 'top-left') {
        style.top = margin;
        style.left = margin;
        style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${armWidth}, ${armWidth} ${armWidth}, ${armWidth} 100%, 0% 100%)`;
      } else if (position === 'top-right') {
        style.top = margin;
        style.right = margin;
        style.clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, calc(100% - ${armWidth}) 100%, calc(100% - ${armWidth}) ${armWidth}, 0% ${armWidth})`;
      } else if (position === 'bottom-left') {
        style.bottom = margin;
        style.left = margin;
        style.clipPath = `polygon(0% 0%, ${armWidth} 0%, ${armWidth} calc(100% - ${armWidth}), 100% calc(100% - ${armWidth}), 100% 100%, 0% 100%)`;
      } else if (position === 'bottom-right') {
        style.bottom = margin;
        style.right = margin;
        style.clipPath = `polygon(calc(100% - ${armWidth}) 0%, 100% 0%, 100% 100%, 0% 100%, 0% calc(100% - ${armWidth}), calc(100% - ${armWidth}) calc(100% - ${armWidth}))`;
      }
      
      return <div style={style} />;
    };

    return (
      <>
        <Corner position="top-left" />
        <Corner position="top-right" />
        <Corner position="bottom-left" />
        <Corner position="bottom-right" />
      </>
    );
  }

  let clipPath = '';
  const borderWidth = '3px';
  const marginWidth = '8px';

  if (frameStyle === 'edge') {
    clipPath = `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${borderWidth} ${borderWidth}, ${borderWidth} calc(100% - ${borderWidth}), calc(100% - ${borderWidth}) calc(100% - ${borderWidth}), calc(100% - ${borderWidth}) ${borderWidth}, ${borderWidth} ${borderWidth})`;
  } else if (frameStyle === 'margin') {
    const inner = `calc(${marginWidth} + ${borderWidth})`;
    clipPath = `polygon(evenodd, 
      ${marginWidth} ${marginWidth}, 
      calc(100% - ${marginWidth}) ${marginWidth}, 
      calc(100% - ${marginWidth}) calc(100% - ${marginWidth}), 
      ${marginWidth} calc(100% - ${marginWidth}), 
      ${marginWidth} ${marginWidth},
      ${inner} ${inner}, 
      ${inner} calc(100% - ${inner}), 
      calc(100% - ${inner}) calc(100% - ${inner}), 
      calc(100% - ${inner}) calc(100% - ${inner}), 
      calc(100% - ${inner}) ${inner}, 
      ${inner} ${inner}
    )`;
  }
  
  return <div className="absolute inset-0" style={{ ...frameBgStyle, clipPath }} />;
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
    const isTransparent = mirrorColor.name === 'Plateado';

    const getTextStyle = (baseFont: FontConfig, fontSize: string): React.CSSProperties => {
        const style: React.CSSProperties = {
            fontFamily: baseFont.style.fontFamily,
            fontSize: fontSize,
            ...baseFont.style,
        };

        if (isMirrorFinish) {
            style.backgroundImage = `linear-gradient(145deg, hsla(0,0%,100%,.9) 15%, ${color.value} 50%, hsla(0,0%,100%,.9) 85%)`;
            style.backgroundClip = 'text';
            style.WebkitBackgroundClip = 'text';
            style.color = 'transparent';
            style.filter = `drop-shadow(0 0 5px ${color.value})`;
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
      circle: 'rounded-full',
      square: 'rounded-2xl',
      rectangle: 'rounded-2xl',
    };

    const aspectRatios = {
      circle: 'aspect-square',
      square: 'aspect-square',
      rectangle: 'aspect-[16/9]',
    }

    const hasFrame = frame.name !== "Sin Marco";
    const isDorado = hasFrame && frame.name === 'Dorado Brilloso';
    
    const Standoff = ({ className }: { className?: string }) => (
      <div className={cn("absolute w-4 h-4 rounded-full shadow-md border border-slate-400/50 z-20", standoffColor.twClass, className)} />
    );

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
          className={cn(
            "absolute cursor-grab",
            aspectRatios[shape],
            "w-1/2",
          )}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            filter: [
              withBacklight ? `drop-shadow(0 0 20px ${backlightColor.value})` : null,
              isDorado ? `drop-shadow(0 0 8px ${frame.value})` : null,
            ].filter(Boolean).join(' ') || 'none',
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
            <div
                className={cn(
                    "relative w-full h-full flex items-center justify-center overflow-hidden",
                    shapeClasses[shape],
                )}
            >
                {/* Acrylic Base */}
                <div
                    className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-8",
                         mirrorColor.twClass
                    )}
                    style={{
                      border: isTransparent && hasFrame ? `3px solid ${frame.value}` : 'none',
                      boxShadow: !isTransparent ? 'inset 0 0 60px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5)' : '0 0 20px rgba(0,0,0,0.5)',
                    }}
                >
                    {!isTransparent && <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />}

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

                {/* Frame Overlay */}
                {hasFrame && !isTransparent && <FrameOverlay frame={frame} frameStyle={frameStyle} isDorado={isDorado} shape={shape} />}
            </div>
          
          {withStandoffs && (
            shape === 'circle' ? (
              <>
                <Standoff className="top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2" />
                <Standoff className="top-[15%] right-[15%] translate-x-1/2 -translate-y-1/2" />
                <Standoff className="bottom-[15%] left-[15%] -translate-x-1/2 translate-y-1/2" />
                <Standoff className="bottom-[15%] right-[15%] translate-x-1/2 translate-y-1/2" />
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
        </div>
      </div>
    );
  }
);

AcrylicSignPreview.displayName = "AcrylicSignPreview";
