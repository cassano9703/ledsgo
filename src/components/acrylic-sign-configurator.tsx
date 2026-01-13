"use client";

import { useState, useRef, useCallback } from "react";
import { fonts, acrylicColors, sizes, backgrounds, silhouettes } from "@/lib/config";
import type { FontConfig, ColorConfig, SizeConfig, BackgroundConfig, SilhouetteConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AcrylicSignPreview } from "./acrylic-sign-preview";
import { OrderModal } from "./order-modal";
import { cn } from "@/lib/utils";
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";
import { Circle, Square, RectangleHorizontal, X } from "lucide-react";
import Image from "next/image";

type Shape = "circle" | "square" | "rectangle";

export function AcrylicSignConfigurator() {
  const [text, setText] = useState("Dra. Sophia");
  const [font, setFont] = useState<FontConfig>(fonts[2]);
  const [color, setColor] = useState<ColorConfig>(acrylicColors[0]);
  const [size, setSize] = useState<SizeConfig>(sizes[1]);
  const [shape, setShape] = useState<Shape>('circle');
  const [background, setBackground] = useState<BackgroundConfig>(backgrounds[2]);
  const [silhouette, setSilhouette] = useState<SilhouetteConfig | null>(null);

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFontChange = (fontName: string) => {
    const newFont = fonts.find((f) => f.name === fontName);
    if (newFont) setFont(newFont);
  };

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
  
  const handleOpenOrderModal = () => {
    captureImage((dataUrl) => {
      setCapturedImage(dataUrl);
      setOrderModalOpen(true);
    });
  };

  const handleSilhouetteClick = (s: SilhouetteConfig) => {
    if (silhouette?.name === s.name) {
      setSilhouette(null);
    } else {
      setSilhouette(s);
    }
  }

  const currentConfig = { text, font, color: color.name, size, capturedImage, silhouette: silhouette?.name };

  return (
    <>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <div className="lg:col-span-1">
          <div className="flex lg:flex-col gap-2">
              {backgrounds.map(bg => (
                  <div 
                      key={bg.name}
                      className={cn(
                          "rounded-md border-2 overflow-hidden cursor-pointer transition-all w-20 h-16",
                          background.name === bg.name ? "border-primary ring-2 ring-primary" : "border-transparent"
                      )}
                      onClick={() => setBackground(bg)}
                  >
                      <Image 
                          src={bg.imageUrl}
                          alt={bg.name}
                          width={80}
                          height={60}
                          className="object-cover w-full h-full"
                      />
                  </div>
              ))}
          </div>
        </div>
        
        <div className="lg:col-span-8">
           <AcrylicSignPreview
            ref={previewRef}
            text={text}
            font={font}
            color={color}
            size={size}
            shape={shape}
            background={background}
            silhouette={silhouette}
          />
        </div>
        
        <Card className="lg:col-span-3 sticky top-24">
          <CardHeader>
            <CardTitle>Detalles del Letrero</CardTitle>
            <CardDescription>
                Personaliza tu acrílico espejo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="sign-text">Texto Grabado</Label>
              <Input
                id="sign-text"
                placeholder="Tu texto aquí"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Forma del Acrílico</Label>
              <div className="flex gap-2">
                <Button variant={shape === 'circle' ? 'default' : 'outline'} onClick={() => setShape('circle')} size="icon"><Circle/></Button>
                <Button variant={shape === 'square' ? 'default' : 'outline'} onClick={() => setShape('square')} size="icon"><Square/></Button>
                <Button variant={shape === 'rectangle' ? 'default' : 'outline'} onClick={() => setShape('rectangle')} size="icon"><RectangleHorizontal/></Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Silueta (Opcional)</Label>
              <div className="flex gap-2">
                {silhouettes.map((s) => (
                  <Button 
                    key={s.name}
                    variant={silhouette?.name === s.name ? 'default' : 'outline'}
                    onClick={() => handleSilhouetteClick(s)}
                    size="icon"
                  >
                    <s.Icon className="w-5 h-5"/>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color del Grabado</Label>
              <RadioGroup
                  value={color.name}
                  onValueChange={(val) => setColor(acrylicColors.find(c => c.name === val)!)}
                  className="flex flex-wrap gap-2"
              >
                  {acrylicColors.map((c) => (
                    <Label key={c.name} htmlFor={`acrylic-${c.name}`} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 ${color.name === c.name ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'}`}>
                        <RadioGroupItem value={c.name} id={`acrylic-${c.name}`} className="sr-only" />
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
                 <Label htmlFor="size-select" className="flex items-center gap-2">Tamaño</Label>
                <Select value={size.name} onValueChange={(val) => setSize(sizes.find(s => s.name === val)!)}>
                  <SelectTrigger id="size-select">
                    <SelectValue placeholder="Selecciona un tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name} ({s.multiplier}x)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <Button size="lg" onClick={handleOpenOrderModal}>
                    Ordenar Tu Letrero
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} config={currentConfig} />
    </>
  );
}