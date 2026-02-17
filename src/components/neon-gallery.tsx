
"use client";

import { useState } from "react";
import Image from "next/image";
import { OurJobsImages, type OurJobsImage } from "@/lib/placeholder-images";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { JobDetailsModal } from "@/components/job-details-modal";
import { cn } from "@/lib/utils";

export function NeonGallery() {
  const [selectedJob, setSelectedJob] = useState<OurJobsImage | null>(null);

  return (
    <>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {OurJobsImages.map((job) => (
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
                  data-ai-hint={job.imageHint}
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: job.objectPosition || 'center' }}
                />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{job.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{job.ciudad}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <JobDetailsModal 
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </>
  );
}
