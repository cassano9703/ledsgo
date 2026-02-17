
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { colors as colorOptions } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { NeonJob } from "@/lib/types";


interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: NeonJob | null;
}

export function JobDetailsModal({ isOpen, onClose, job }: JobDetailsModalProps) {
  if (!job) return null;

  const jobColors = job.colors.split(',').map(c => c.trim().toLowerCase());
  const colorDetails = colorOptions.filter(c => jobColors.includes(c.name.toLowerCase()));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-3xl border-accent shadow-[0_0_20px_hsl(var(--accent))]"
      >
        <DialogHeader>
          <DialogTitle>{job.name}</DialogTitle>
          <DialogDescription>
            {job.alt}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg overflow-hidden border-2 border-white/50 aspect-square bg-black/30">
                <Image 
                    src={job.imageUrl} 
                    alt={job.alt}
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                    style={{ objectPosition: job.objectPosition }}
                />
            </div>
            <div className="space-y-4 text-sm">
                <h3 className="font-bold text-lg text-primary">Detalles del Proyecto</h3>
                <Separator />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <p className="font-semibold text-muted-foreground">Nombre:</p>
                    <p>{job.name}</p>

                    <p className="font-semibold text-muted-foreground">Medidas:</p>
                    <p>{job.measurements}</p>

                    <p className="font-semibold text-muted-foreground flex items-center">Colores:</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {colorDetails.map(color => (
                        <div key={color.name} className="flex items-center gap-1.5">
                           <div className={cn("w-4 h-4 rounded-full border", color.twClass)} style={{backgroundColor: color.value}}></div>
                           <span className="text-xs">{color.name}</span>
                        </div>
                      ))}
                    </div>

                    <p className="font-semibold text-muted-foreground">Ciudad:</p>
                    <p>{job.city}</p>
                </div>
            </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
