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
    { name: "Rocket", style: { fontFamily: "'Orbitron', sans-serif" } },
    { name: "Sorrento", style: { fontFamily: "'Tangerine', cursive" } },
    { name: "Vintage", style: { fontFamily: "'Yeseva One', cursive" } },
    { name: "MONACO", style: { fontFamily: "'Bebas Neue', sans-serif" } },
    { name: "Funky", style: { fontFamily: "'Lobster', cursive" } },
    { name: "Neotokyo", style: { fontFamily: "'Poppins', sans-serif" } },
    { name: "Avante", style: { fontFamily: "'Avant Garde', sans-serif" } },
    { name: "Melbourne", style: { fontFamily: "'Pacifico', cursive" } },
    { name: "OUTLINE", style: { fontFamily: "'Poppins', sans-serif", WebkitTextStroke: '1px', WebkitTextFillColor: 'transparent' } },
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
    imageUrl: string;
    imageHint: string;
};

export const backgrounds: BackgroundConfig[] = [
    { name: "Grass artificial", imageUrl: "https://i.imgur.com/YoMyLHL.jpeg", imageHint: "brick wall" },
    { name: "Wath Pannel", imageUrl: "https://i.imgur.com/LRqRxnY.jpeg", imageHint: "vegetation wall" },
    { name: "Pared Blanca", imageUrl: "https://i.imgur.com/mAhInl0.jpeg", imageHint: "dark interior" },
    { name: "Pared Negra", imageUrl: "https://i.imgur.com/UulMLJq.jpeg", imageHint: "black wall" },
    { name: "Pared Ploma", imageUrl: "https://i.imgur.com/kHwV51f.jpeg", imageHint: "" },

    
];
