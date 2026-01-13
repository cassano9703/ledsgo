"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoDataItems } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Volume2, PlayCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function VideoGallery() {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {VideoDataItems.map((video) => (
          <div
            key={video.id}
            className="relative group aspect-w-9 aspect-h-16 rounded-lg overflow-hidden border-2 border-card shadow-lg"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
            </div>

            {/* Mute/Unmute Button */}
            <div className="absolute top-3 right-3">
              <button className="bg-black/40 rounded-full p-1.5 text-white/80 hover:text-white hover:bg-black/60 transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-primary">
                  <AvatarImage src={video.creator.avatarUrl} alt={video.creator.name} />
                  <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm leading-tight truncate">{video.creator.name}</h4>
                  <p className="text-xs text-neutral-300">{video.subscribers}</p>
                </div>
              </div>
              <p className="text-sm mt-2 truncate">{video.title}</p>
            </div>
            
            {/* Like button on hover */}
             <div className={cn("absolute top-3 left-3 transition-opacity duration-300", hoveredVideo === video.id ? 'opacity-100' : 'opacity-0')}>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-red-500 hover:bg-transparent">
                    <Heart className="w-6 h-6"/>
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
