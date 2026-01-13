import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type HeroImage = {
  id: string;
  alt: string;
  imageUrl: string;
  imageHint: string;
}

export type OurJobsImage = {
  id: string;
  alt: string;
  imageUrl: string;
  imageHint: string;
  nombre: string;
  medidas: string;
  colores: string;
  ciudad: string;
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
export const OurJobsImages: OurJobsImage[] = data.ourJobsImages;
export const AboutUsImages: AboutUsImage[] = data.aboutUsImages;
export const VideoDataItems: VideoData[] = data.videoGallery;
