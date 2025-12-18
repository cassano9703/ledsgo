"use client";

import { useState, useRef, useCallback } from "react";
import { fonts, colors, sizes, backgrounds } from "@/lib/config";
import type { FontConfig, ColorConfig, SizeConfig, BackgroundConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LedSignPreview } from "./led-sign-preview";
import { OrderModal } from "./order-modal";
import { PreviewModal } from "./preview-modal";
import { cn } from "@/lib/utils";
import { Ruler, Heart, Star, Camera } from "lucide-react";
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";

const EMOJIS = ["♡", "☆"];

export function LedSignConfigurator() {
  const [text, setText] = useState("Leds Go!");
  const [text2, setText2] = useState("");
  const [font, setFont] = useState<FontConfig>(fonts[4]);
  const [color, setColor] = useState<ColorConfig>(colors[5]);
  const [size, setSize] = useState<SizeConfig>(sizes[1]);
  const [background, setBackground] = useState<BackgroundConfig>(backgrounds[0]);
  
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFontChange = (fontName: string) => {
    const newFont = fonts.find((f) => f.name === fontName);
    if (newFont) setFont(newFont);
  };

  const handleSizeChange = (sizeName: string) => {
    const newSize = sizes.find((s) => s.name === sizeName);
    if (newSize) setSize(newSize);
  };

  const handleBackgroundChange = (backgroundName: string) => {
    const newBackground = backgrounds.find((b) => b.name === backgroundName);
    if (newBackground) setBackground(newBackground);
  };
  
  const removeEmojis = (str: string) => {
    let newStr = str;
    for (const e of EMOJIS) {
      newStr = newStr.replaceAll(e, "");
    }
    return newStr;
  }

  const addEmoji = (emoji: string) => {
    if (EMOJIS.some(e => text.includes(e))) {
      const textWithoutEmojis = removeEmojis(text);
      setText(textWithoutEmojis + emoji);
    } else {
      setText(text + emoji);
    }
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    
    if (EMOJIS.some(emoji => text.includes(emoji)) && !EMOJIS.some(emoji => newText.includes(emoji))) {
      setText(removeEmojis(newText));
    } else {
      setText(newText);
    }
  }

  const captureImage = useCallback((callback: (dataUrl: string) => void) => {
    if (previewRef.current === null) {
      return;
    }

    toPng(previewRef.current, { cacheBust: true, pixelRatio: 1.5 })
      .then(callback)
      .catch((err) => {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Error al capturar la imagen",
          description: "No se pudo generar la imagen. Por favor, inténtalo de nuevo.",
        });
      });
  }, [previewRef, toast]);

  const handleCaptureAndShow = () => {
    captureImage((dataUrl) => {
      setCapturedImage(dataUrl);
      setPreviewModalOpen(true);
    });
  };
  
  const handleOpenOrderModal = () => {
    captureImage((dataUrl) => {
      setCapturedImage(dataUrl);
      setOrderModalOpen(true);
    });
  };


  const currentConfig = { text, text2, font, color: color.value, size, background, capturedImage };

  return (
    <>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-9 sticky top-24">
           <LedSignPreview 
            ref={previewRef}
            background={background} 
            text={text} 
            text2={text2}
            font={font} 
            color={color.value} 
            size={size} 
          />
          <div className="mt-4 flex justify-center gap-4">
            <Button size="lg" variant="outline" onClick={handleCaptureAndShow}>
              <Camera className="mr-2 h-4 w-4" />
              Capturar Diseño
            </Button>
            <Button size="lg" onClick={handleOpenOrderModal}>
              Ordenar Tu Letrero Personalizado
            </Button>
          </div>
        </div>
        
        <Card className="lg:col-span-3 sticky top-24">
          <CardHeader>
            <CardTitle>Edición</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="sign-text">Texto</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="sign-text"
                  placeholder="Tu texto aquí"
                  value={text}
                  onChange={handleTextChange}
                />
                <Button variant="outline" size="icon" onClick={() => addEmoji('♡')}>
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => addEmoji('☆')}>
                  <Star className="w-4 h-4 fill-transparent" />
                </Button>
              </div>
              <Input
                id="sign-text-2"
                placeholder="Segunda línea (opcional)"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Color</Label>
              <RadioGroup
                  value={color.name}
                  onValueChange={(val) => setColor(colors.find(c => c.name === val)!)}
                  className="flex flex-wrap gap-2"
              >
                  {colors.map((c) => (
                    <Label key={c.name} htmlFor={c.name} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 ${color.name === c.name ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'}`}>
                        <RadioGroupItem value={c.name} id={c.name} className="sr-only" />
                        <span className={cn("w-full h-full rounded-full", c.twClass)} />
                    </Label>
                  ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="font-select">Tipografía</Label>
                <Select value={font.name} onValueChange={handleFontChange}>
                  <SelectTrigger id="font-select">
                    <SelectValue placeholder="Selecciona una tipografía" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => (
                      <SelectItem key={f.name} value={f.name} style={f.style}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size-select" className="flex items-center gap-2"><Ruler className="w-4 h-4" /> Tamaño</Label>
                <Select value={size.name} onValueChange={handleSizeChange}>
                  <SelectTrigger id="size-select">
                    <SelectValue placeholder="Selecciona un tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-select">Fondo de Acrílico</Label>
              <Select value={background.name} onValueChange={handleBackgroundChange}>
                <SelectTrigger id="background-select">
                  <SelectValue placeholder="Selecciona un fondo" />
                </SelectTrigger>
                <SelectContent>
                  {backgrounds.map((b) => (
                    <SelectItem key={b.name} value={b.name}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} config={currentConfig} />
      <PreviewModal isOpen={isPreviewModalOpen} onClose={() => setPreviewModalOpen(false)} imageUrl={capturedImage} />
    </>
  );
}
