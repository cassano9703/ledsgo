
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { JobDetailsModal } from "@/components/job-details-modal";
import type { NeonJob } from "@/lib/types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Hogar", "Negocios", "Personalizados", "Ciudad"];

interface NeonGalleryProps {
  jobs: NeonJob[];
}

export function NeonGallery({ jobs }: NeonGalleryProps) {
  const [selectedJob, setSelectedJob] = useState<NeonJob | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  if (!jobs || jobs.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-96 gap-4 text-center">
            <h3 className="text-2xl font-bold">La galería está vacía</h3>
            <p className="text-muted-foreground">Parece que todavía no se han añadido trabajos.</p>
        </div>
    )
  }
  
  const filteredJobs = activeCategory === "Todos"
    ? jobs
    : jobs.filter(job => job.category === activeCategory);

  return (
    <>
      <div className="flex justify-center gap-2 my-8 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border-2 text-base px-6 py-2 h-auto transition-all duration-300",
              activeCategory === category
                ? "border-primary text-primary neon-glow-primary bg-primary/10"
                : "border-border hover:border-primary hover:text-primary"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {filteredJobs.map((job) => (
          <Card 
            key={job.id} 
            className="overflow-hidden group w-full max-w-sm flex flex-col shadow-[0_0_20px_hsl(var(--accent))] cursor-pointer hover:shadow-[0_0_30px_hsl(var(--primary))] transition-shadow"
            onClick={() => setSelectedJob(job)}
          >
            <div className="aspect-square overflow-hidden bg-black/30 border-2 border-white/50 rounded-t-lg">
                <Image
                  src={job.imageUrl}
                  alt={job.alt}
                  width={600}
                  height={600}
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: job.objectPosition || 'center' }}
                />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{job.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{job.city}</p>
            </CardContent>
          </Card>
        ))}
        {filteredJobs.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-64 gap-4 text-center">
                <h3 className="text-2xl font-bold">No hay trabajos en esta categoría</h3>
                <p className="text-muted-foreground">Prueba seleccionando otra categoría.</p>
            </div>
        )}
      </div>
      <JobDetailsModal 
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </>
  );
}
