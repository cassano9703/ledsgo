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
  { name: "Cyan", value: "#00BFFF", twClass: "bg-cyan-500" },
  { name: "Fuchsia", value: "#FF00FF", twClass: "bg-fuchsia-500" },
  { name: "Yellow", value: "#FFFF00", twClass: "bg-yellow-300" },
  { name: "Lime", value: "#32CD32", twClass: "bg-lime-500" },
  { name: "Red", value: "#FF073A", twClass: "bg-red-600" },
  { name: "Blue", value: "#0000FF", twClass: "bg-blue-600" },
  { name: "Purple", value: "#A020F0", twClass: "bg-purple-600" },
  { name: "Orange", value: "#FFA500", twClass: "bg-orange-500" },
  { name: "Amber", value: "#FFBF00", twClass: "bg-amber-400" },
  { name: "White", value: "#FFFFFF", twClass: "bg-white" },
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
    style: 'cut-to-shape' | 'rectangular';
};

export const backgrounds: BackgroundConfig[] = [
    { name: "Corte de Silueta", style: 'cut-to-shape' },
    { name: "Corte Rectangular", style: 'rectangular' },
];
