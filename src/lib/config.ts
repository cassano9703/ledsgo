import type { SVGProps } from "react";
import { Scissors, Sparkles } from "lucide-react";

export type FontConfig = {
  name: string;
  style: React.CSSProperties;
};

// Inspired by https://neon51.com/
export const fonts: FontConfig[] = [
    { name: "Amsterdam", style: { fontFamily: "'Dancing Script', cursive" } },
    { name: "Freehand", style: { fontFamily: "'Kalam', cursive" } },
    { name: "Barcelona", style: { fontFamily: "'Alex Brush', cursive" } },
    { name: "Photogenic", style: { fontFamily: "'Parisienne', cursive" } },
    { name: "Beachfront", style: { fontFamily: "'Caveat', cursive" } },
    { name: "Alexa", style: { fontFamily: "'Allura', cursive" } },
    { name: "Bayview", style: { fontFamily: "'Cedarville Cursive', cursive" } },
    { name: "Sorrento", style: { fontFamily: "'Tangerine', cursive" } },
];


export type ColorConfig = {
  name: string;
  value: string;
  twClass: string;
};

export const colors: ColorConfig[] = [
  { name: "Cyan", value: "#00FFFF", twClass: "bg-cyan-400" },
  { name: "Fuchsia", value: "#FF00FF", twClass: "bg-fuchsia-500" },
  { name: "Yellow", value: "#FFFF00", twClass: "bg-yellow-300" },
  { name: "Lime", value: "#7FFF00", twClass: "bg-lime-400" },
  { name: "Red", value: "#FF0000", twClass: "bg-red-500" },
  { name: "Blue", value: "#007FFF", twClass: "bg-blue-500" },
  { name: "Purple", value: "#BF00FF", twClass: "bg-purple-500" },
  { name: "Orange", value: "#FFA500", twClass: "bg-orange-400" },
  { name: "Amber", value: "#FFBF00", twClass: "bg-amber-400" },
  { name: "RGB", value: "rgb", twClass: "" },
];

export const acrylicColors: ColorConfig[] = [
  { name: "Dorado", value: "#D4AF37", twClass: "bg-yellow-600" },
  { name: "Plata", value: "#C0C0C0", twClass: "bg-slate-400" },
  { name: "Oro Rosa", value: "#B76E79", twClass: "bg-rose-400" },
  { name: "Negro", value: "#000000", twClass: "bg-black" },
  { name: "Blanco", value: "#FFFFFF", twClass: "bg-white" },
];

export type SizeConfig = {
  name: string;
  multiplier: number;
};

export const sizes: SizeConfig[] = [
  { name: "Pequeño", multiplier: 0.65 },
  { name: "Mediano", multiplier: 0.9 },
  { name: "Grande", multiplier: 1.18 },
  { name: "Extra Grande", multiplier: 1.45 },
];

export type BackgroundConfig = {
    name: string;
    imageUrl: string;
};

export const backgrounds: BackgroundConfig[] = [
    { name: "Grass Sintético", imageUrl: "https://i.imgur.com/sI68Yek.jpeg" },
    { name: "Panel de Madera", imageUrl: "https://i.imgur.com/aAelWay.jpeg" },
    { name: "Pared Cementada", imageUrl: "https://i.imgur.com/53KZ8PC.jpeg" },
    { name: "Pared Blanca", imageUrl: "https://i.imgur.com/43rzGcD.jpeg" },
    { name: "Madera Negra", imageUrl: "https://i.imgur.com/YLmP78J.jpeg" },
    { name: "Pared Negra", imageUrl: "https://i.imgur.com/x8649Os.jpeg" }, 
  ];

export type SilhouetteConfig = {
  name: string;
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
};

export const silhouettes: SilhouetteConfig[] = [
  { name: "Belleza", Icon: Sparkles },
  { name: "Barbería", Icon: Scissors },
];