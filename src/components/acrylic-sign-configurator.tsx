
"use client";

import { useState, useRef, useCallback } from "react";
import { fonts, vinylColors, mirrorFinishColors, sizes, backgrounds, frameOptions, mirrorColors, lightColors, standoffColors } from "@/lib/config";
import type { FontConfig, ColorConfig, SizeConfig, BackgroundConfig, FrameConfig } from "@/lib/config";
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
import { Square, RectangleHorizontal } from "lucide-react";
import { CircleIcon } from "@/components/icons";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

type Shape = "circle" | "square" | "rectangle";
type FrameStyle = "edge" | "margin" | "corners";

export function AcrylicSignConfigurator() {
  const [text, setText] = useState("Dra. Sophia");
  const [text2, setText2] = useState("Clínica Dental");
  const [font, setFont] = useState<FontConfig>(fonts[2]);
  const [font2, setFont2] = useState<FontConfig>(fonts[0]);
  const [engravingColor, setEngravingColor] = useState<ColorConfig>(vinylColors[0]);
  const [mirrorColor, setMirrorColor] = useState<ColorConfig>(mirrorColors[1]);
  const [size, setSize] = useState<SizeConfig>(sizes[1]);
  const [shape, setShape] = useState<Shape>('rectangle');
  const [background, setBackground] = useState<BackgroundConfig>(backgrounds[2]);
  const [frame, setFrame] = useState<FrameConfig>(frameOptions[1]);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('corners');
  const [withStandoffs, setWithStandoffs] = useState(true);
  const [standoffColor, setStandoffColor] = useState<ColorConfig>(standoffColors[0]);
  const [withBacklight, setWithBacklight] = useState(true);
  const [backlightColor, setBacklightColor] = useState<ColorConfig>(lightColors[1]);


  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFontChange = (fontName: string) => {
    const newFont = fonts.find((f) => f.name === fontName);
    if (newFont) setFont(newFont);
  };

  const handleFont2Change = (fontName: string) => {
    const newFont = fonts.find((f) => f.name === fontName);
    if (newFont) setFont2(newFont);
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

  const handleShapeChange = (newShape: Shape) => {
    setShape(newShape);
  };

  const currentConfig = { text, text2, font, font2, color: engravingColor.name, size, capturedImage, mirrorColor: mirrorColor.name, frame: frame.name, frameStyle, withStandoffs, standoffColor: standoffColor.name, withBacklight, backlightColor: backlightColor.name };

  return (
    <>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-12 gap-x-8 items-start">
        
        <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-start gap-4 flex-wrap">
                {backgrounds.map(bg => (
                    <div 
                        key={bg.name}
                        className={cn(
                            "rounded-md border-2 overflow-hidden cursor-pointer transition-all w-24 h-20",
                            background.name === bg.name ? "border-primary ring-2 ring-primary" : "border-transparent"
                        )}
                        onClick={() => setBackground(bg)}
                    >
                        <Image 
                            src={bg.imageUrl}
                            alt={bg.name}
                            width={96}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
            <AcrylicSignPreview
                ref={previewRef}
                text={text}
                text2={text2}
                font={font}
                font2={font2}
                color={engravingColor}
                mirrorColor={mirrorColor}
                size={size}
                shape={shape}
                background={background}
                frame={frame}
                frameStyle={frameStyle}
                withStandoffs={withStandoffs}
                standoffColor={standoffColor}
                withBacklight={withBacklight}
                backlightColor={backlightColor}
            />
        </div>
        
        <Card className="lg:col-span-4 sticky top-24">
          <CardHeader>
            <CardTitle>Detalles del Letrero</CardTitle>
            <CardDescription>
                Personaliza tu acrílico espejo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Color del Acrílico</Label>
                <RadioGroup
                    value={mirrorColor.name}
                    onValueChange={(val) => setMirrorColor(mirrorColors.find(c => c.name === val)!)}
                    className="flex flex-wrap gap-2"
                >
                    {mirrorColors.map((c) => (
                      <Label key={`mirror-${c.name}`} htmlFor={`mirror-${c.name}`} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 ${mirrorColor.name === c.name ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                          <RadioGroupItem value={c.name} id={`mirror-${c.name}`} className="sr-only" />
                          <span className={cn("w-full h-full rounded-full", c.twClass)} />
                      </Label>
                    ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Forma del Acrílico</Label>
                <div className="flex gap-2">
                  <Button variant={shape === 'circle' ? 'default' : 'outline'} onClick={() => handleShapeChange('circle')} size="icon"><CircleIcon className="w-5 h-5"/></Button>
                  <Button variant={shape === 'square' ? 'default' : 'outline'} onClick={() => handleShapeChange('square')} size="icon"><Square/></Button>
                  <Button variant={shape === 'rectangle' ? 'default' : 'outline'} onClick={() => handleShapeChange('rectangle')} size="icon"><RectangleHorizontal/></Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="sign-text">Texto Grabado</Label>
                  <Input
                    id="sign-text"
                    placeholder="Tu texto aquí"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
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
              </div>
              <div className="grid grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="sign-subtitle">Subtitulo</Label>
                  <Input
                    id="sign-subtitle"
                    placeholder="Texto secundario (opcional)"
                    value={text2}
                    onChange={(e) => setText2(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-2-select">Tipografia Sub</Label>
                  <Select value={font2.name} onValueChange={handleFont2Change}>
                    <SelectTrigger id="font-2-select">
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
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
              <Label className="font-semibold text-accent">Color de Grabado</Label>
              <RadioGroup
                value={engravingColor.name}
                onValueChange={(val) => {
                  const allColors = [...vinylColors, ...mirrorFinishColors];
                  const selected = allColors.find(c => c.name === val);
                  if (selected) setEngravingColor(selected);
                }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  <Label className="text-sm font-normal text-muted-foreground">Acrílico Espejo</Label>
                  <div className="flex flex-wrap gap-2">
                    {mirrorFinishColors.map((c) => (
                      <Label 
                        key={`mirror-finish-${c.name}`} 
                        htmlFor={`mirror-finish-${c.name}`} 
                        className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 overflow-hidden ${engravingColor.name === c.name ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
                      >
                        <RadioGroupItem value={c.name} id={`mirror-finish-${c.name}`} className="sr-only" />
                        <span className={cn("w-full h-full rounded-full", c.twClass)} />
                        <span 
                          className="absolute top-0 left-0 w-full h-full rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)'
                          }}
                        />
                      </Label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-normal text-muted-foreground">Otros Colores</Label>
                  <div className="flex flex-wrap gap-2">
                    {vinylColors.map((c) => (
                      <Label key={`vinyl-${c.name}`} htmlFor={`vinyl-${c.name}`} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 ${engravingColor.name === c.name ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                        <RadioGroupItem value={c.name} id={`vinyl-${c.name}`} className="sr-only" />
                        <span className={cn("w-full h-full rounded-full", c.twClass)} />
                      </Label>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="size-select" className="flex items-center gap-2">
              Tamaño
              </Label>
              <Select
              value={size.name}
              onValueChange={(val) => setSize(sizes.find((s) => s.name === val)!)}
              >
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frame-select">Marco</Label>
                <Select
                  value={frame.name}
                  onValueChange={(val) =>
                    setFrame(frameOptions.find((f) => f.name === val)!)
                  }
                >
                  <SelectTrigger id="frame-select">
                    <SelectValue placeholder="Selecciona un marco" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameOptions.map((f) => (
                      <SelectItem key={f.name} value={f.name}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {frame.name !== "Sin Marco" && (
                <div className="space-y-2">
                  <Label htmlFor="frame-style-select">Estilo de Marco</Label>
                  <Select
                      value={frameStyle}
                      onValueChange={(val) => setFrameStyle(val as FrameStyle)}
                  >
                      <SelectTrigger id="frame-style-select">
                          <SelectValue placeholder="Selecciona un estilo" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="edge">Al Borde</SelectItem>
                          <SelectItem value="margin">Con Margen</SelectItem>
                          <SelectItem value="corners">Esquinas</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="standoffs-switch"
                    className="text-sm font-medium"
                  >
                    Distanciadores
                  </Label>
                  <Switch
                    id="standoffs-switch"
                    checked={withStandoffs}
                    onCheckedChange={setWithStandoffs}
                  />
                </div>
                {withStandoffs && (
                    <RadioGroup
                        value={standoffColor.name}
                        onValueChange={(val) => setStandoffColor(standoffColors.find(c => c.name === val)!)}
                        className="flex flex-wrap gap-2"
                    >
                        {standoffColors.map((c) => (
                          <Label key={`standoff-${c.name}`} htmlFor={`standoff-${c.name}`} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 ${standoffColor.name === c.name ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                              <RadioGroupItem value={c.name} id={`standoff-${c.name}`} className="sr-only" />
                              <span className={cn("w-full h-full rounded-full", c.twClass)} />
                          </Label>
                        ))}
                    </RadioGroup>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="backlight-switch"
                    className="text-sm font-medium"
                  >
                    Luz de Fondo
                  </Label>
                  <Switch
                    id="backlight-switch"
                    checked={withBacklight}
                    onCheckedChange={setWithBacklight}
                  />
                </div>
                 {withBacklight && (
                    <RadioGroup
                        value={backlightColor.name}
                        onValueChange={(val) => setBacklightColor(lightColors.find(c => c.name === val)!)}
                        className="flex flex-wrap gap-2"
                    >
                        {lightColors.map((c) => (
                          <Label key={`light-${c.name}`} htmlFor={`light-${c.name}`} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer transition-all border-2 ${backlightColor.name === c.name ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                              <RadioGroupItem value={c.name} id={`light-${c.name}`} className="sr-only" />
                              <span className={cn("w-full h-full rounded-full", c.twClass)} />
                          </Label>
                        ))}
                    </RadioGroup>
                )}
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

    