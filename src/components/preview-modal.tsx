"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

export function PreviewModal({ isOpen, onClose, imageUrl }: PreviewModalProps) {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.download = 'letrero-leds-go.png';
    link.href = imageUrl;
    link.click();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Vista Previa de la Captura</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {imageUrl ? (
            <div className="rounded-md overflow-hidden border bg-slate-900">
              <Image 
                src={imageUrl} 
                alt="Vista previa del letrero LED capturado"
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-slate-200 animate-pulse rounded-md" />
          )}
           <p className="text-xs text-muted-foreground mt-1 text-center">Así se verá la imagen descargada.</p>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Descargar Imagen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
