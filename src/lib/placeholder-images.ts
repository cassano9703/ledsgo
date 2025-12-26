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

export const HeroImages: HeroImage[] = data.heroImages;
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
