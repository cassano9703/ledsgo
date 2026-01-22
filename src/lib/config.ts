
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

// Colores de vinilo para el grabado
export const vinylColors: ColorConfig[] = [
  { name: "Blanco", value: "#FFFFFF", twClass: "bg-white" },
  { name: "Negro", value: "#000000", twClass: "bg-black" },
  { name: "Azul Marino", value: "#000080", twClass: "bg-blue-900" },
  { name: "Naranja", value: "#FFA500", twClass: "bg-orange-500" },
];

// Colores con acabado espejo para el grabado
export const mirrorFinishColors: ColorConfig[] = [
  { name: "Dorado Brilloso", value: "#D4AF37", twClass: "bg-yellow-600" },
  { name: "Rosado Brilloso", value: "#B76E79", twClass: "bg-rose-400" },
  { name: "Plateado Brilloso", value: "#C0C0C0", twClass: "bg-slate-400" },
];

// Colores del material acrílico espejo
export const mirrorColors: ColorConfig[] = [
  { name: "Plateado", value: "bg-transparent", twClass: "bg-slate-300" },
  { name: "Blanco Lechoso", value: "bg-white", twClass: "bg-white" },
  { name: "Negro", value: "bg-black", twClass: "bg-black" },
];

export const lightColors: ColorConfig[] = [
  { name: "Ámbar", value: "#FFBF00", twClass: "bg-amber-400" },
  { name: "Blanco", value: "#FFFFFF", twClass: "bg-white" },
  { name: "Fucsia", value: "#FF00FF", twClass: "bg-fuchsia-500" },
];

export const standoffColors: ColorConfig[] = [
    { name: "Plateado", value: "#C0C0C0", twClass: "bg-slate-400" },
    { name: "Dorado Brilloso", value: "#D4AF37", twClass: "bg-yellow-600" },
];

export type FrameConfig = {
  name: string;
  value: string;
  twClass: string;
};

export const frameOptions: FrameConfig[] = [
    { name: "Sin Marco", value: "", twClass: "" },
    { name: "Dorado Brilloso", value: "#D4AF37", twClass: "border-yellow-600" },
    { name: "Plateado", value: "#C0C0C0", twClass: "border-slate-300" },
    { name: "Negro", value: "#000000", twClass: "border-black" },
];


export type SizeConfig = {
  name: string;
  multiplier: number;
};

export const sizes: SizeConfig[] = [
  { name: "S", multiplier: 0.65 },
  { name: "M", multiplier: 0.9 },
  { name: "L", multiplier: 1.18 },
  { name: "XL", multiplier: 1.45 },
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
