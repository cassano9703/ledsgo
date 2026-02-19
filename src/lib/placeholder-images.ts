import data from './placeholder-images.json';
import type { NeonJob } from './types';

export type ImagePlaceholder = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
  buttonText: string;
  featured: boolean;
};

export type HeroImage = {
  id: string;
  alt: string;
  imageUrl: string;
  imageHint: string;
}

export type AboutUsImage = {
  id: string;
  alt: string;
  imageUrl: string;
  imageHint: string;
}

export type VideoData = {
  id: string;
  title: string;
  thumbnailUrl: string;
  creator: {
    name: string;
    avatarUrl: string;
    subscribers: string;
  }
}

export const HeroImages: HeroImage[] = data.heroImages;
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
export const NeonJobs: NeonJob[] = data.neonJobs;
export const ClientPhotos: NeonJob[] = data.clientPhotos;
export const AboutUsImages: AboutUsImage[] = data.aboutUsImages;
export const VideoDataItems: VideoData[] = data.videoGallery;

    