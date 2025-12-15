"use client";

import { useState, useTransition } from "react";
import { Wand2, Loader2, Lightbulb } from "lucide-react";
import { fonts, colors, sizes } from "@/lib/config";
import type { FontConfig, ColorConfig, SizeConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LedSignPreview } from "./led-sign-preview";
import { getAiSuggestions } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { OrderModal } from "./order-modal";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function LedSignConfigurator() {
  const { toast } = useToast();
  const [text, setText] = useState("Leds Go!");
  const [font, setFont] = useState<FontConfig>(fonts[0]);
  const [color, setColor] = useState<ColorConfig>(colors[0]);
  const [size, setSize] = useState<SizeConfig>(sizes[1]);

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAiLoading, startAiTransition] = useTransition();

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const handleFontChange = (fontName: string) => {
    const newFont = fonts.find((f) => f.name === fontName);
    if (newFont) setFont(newFont);
  };

  const handleAiSuggest = () => {
    startAiTransition(async () => {
      setAiSuggestions([]);
      const result = await getAiSuggestions({
        signText: text,
        font: font.name,
        size: size.name,
        color: color.name,
      });

      if (result.success && result.suggestions) {
        setAiSuggestions(result.suggestions);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  const currentConfig = { text, font, color: color.value, size };

  return (
    <>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="sticky top-24">
          <LedSignPreview text={text} font={font} color={color.value} size={size} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign Details</CardTitle>
            <CardDescription>Enter text and choose your options below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sign-text">Text</Label>
              <Input
                id="sign-text"
                placeholder="Your text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="font-select">Font</Label>
                <Select value={font.name} onValueChange={handleFontChange}>
                  <SelectTrigger id="font-select">
                    <SelectValue placeholder="Select a font" />
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
                <Label htmlFor="size-select">Size</Label>
                <Select value={size.name} onValueChange={(val) => setSize(sizes.find(s => s.name === val)!)}>
                  <SelectTrigger id="size-select">
                    <SelectValue placeholder="Select a size" />
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
              <Label>Color</Label>
              <RadioGroup
                value={color.name}
                onValueChange={(val) => setColor(colors.find(c => c.name === val)!)}
                className="flex flex-wrap gap-2"
              >
                {colors.map((c) => (
                  <Label key={c.name} htmlFor={c.name} className={`relative flex items-center justify-center rounded-full w-8 h-8 cursor-pointer border-2 ${color.name === c.name ? 'border-primary' : 'border-transparent'}`}>
                    <RadioGroupItem value={c.name} id={c.name} className="sr-only" />
                    <span className="w-full h-full rounded-full" style={{ backgroundColor: c.value }} />
                  </Label>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-4 pt-4">
              <Button onClick={handleAiSuggest} disabled={isAiLoading} className="w-full sm:w-auto">
                {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Get AI Design Suggestions
              </Button>
               <p className="text-xs text-muted-foreground">
                Our AI will act as your personal design expert, offering tips to make your sign look even better.
              </p>
              
              {isAiLoading && (
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                </div>
              )}

              {aiSuggestions.length > 0 && (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Design Tips from AI</AlertTitle>
                  <AlertDescription>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Here are some suggestions to improve your design:</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            {aiSuggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </AlertDescription>
                </Alert>
              )}
            </div>

          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={() => setOrderModalOpen(true)}>
              Order Your Custom Sign
            </Button>
          </CardFooter>
        </Card>
      </div>
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} config={currentConfig} />
    </>
  );
}
