
export type NeonJob = {
  id: string;
  name: string;
  alt: string;
  imageUrl: string;
  measurements: string;
  colors: string;
  city: string;
  objectPosition?: string;
  imageHint?: string;
  createdAt?: { seconds: number, nanoseconds: number };
  category?: string;
};
