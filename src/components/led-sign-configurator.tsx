"use client";

import { useState } from "react";
import { fonts, colors, sizes, backgrounds } from "@/lib/config";
import type { FontConfig, ColorConfig, SizeConfig, BackgroundConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LedSignPreview } from "./led-sign-preview";
import { OrderModal } from "./order-modal";
import { cn } from "@/lib/utils";
import { Ruler, Star, Heart } from "lucide-react";

export function LedSignConfigurator() {
  const [text, setText] = useState("Leds Go!");
  const [font, setFont] = useState<FontConfig>(fonts[4]);
  const [color, setColor] = useState<ColorConfig>(colors[5]);
  const [size, setSize] = useState<SizeConfig>(sizes[1]);
  const [background, setBackground] = useState<BackgroundConfig>(backgrounds[0]);
  
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const handleFontChange = (fontName: string) => {
    const newFont = fonts.find((f) => f.name === fontName);
    if (newFont) setFont(newFont);
  };

  const handleBackgroundChange = (bgName: string) => {
    const newBg = backgrounds.find((b) => b.name === bgName);
    if (newBg) setBackground(newBg);
  };

  const handleSizeChange = (sizeName: string) => {
    const newSize = sizes.find((s) => s.name === sizeName);
    if (newSize) setSize(newSize);
  };
  
  const addEmoji = (emoji: string) => {
    setText(text + emoji);
  };

  const currentConfig = { text, font, color: color.value, size, background };

  return (
    <>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="sticky top-24">
          <LedSignPreview text={text} font={font} color={color.value} size={size} background={background} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Letrero</CardTitle>
            <CardDescription>Ingresa el texto y elige tus opciones a continuación.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sign-text">Texto</Label>
              <Input
                id="sign-text"
                placeholder="Tu texto aquí"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Añadir un Emoji</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => addEmoji(' ❤️')}>
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => addEmoji(' ⭐')}>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </Button>
              </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

               <div className="space-y-2">
                <Label htmlFor="background-select">Fondo</Label>
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
            </div>

          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={() => setOrderModalOpen(true)}>
              Ordenar Tu Letrero Personalizado
            </Button>
          </CardFooter>
        </Card>
      </div>
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} config={currentConfig} />
    </>
  );
}
