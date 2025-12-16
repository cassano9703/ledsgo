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
  { name: "White", value: "#FFFFFF", twClass: "bg-white" },
];

export type SizeConfig = {
  name: string;
  multiplier: number;
};

export const sizes: SizeConfig[] = [
  { name: "Mediano", multiplier: 1 },
  { name: "Pequeño", multiplier: 0.7 },
  { name: "Grande", multiplier: 1.3 },
  { name: "Extra Grande", multiplier: 1.6 },
];

export type BackgroundConfig = {
    name: string;
    imageUrl: string;
    imageHint: string;
};

export const backgrounds: BackgroundConfig[] = [
    { name: "Pared de Ladrillo", imageUrl: "https://i.imgur.com/YoMyLHL.jpeg", imageHint: "brick wall" },
    { name: "Pared de Vegetación", imageUrl: "https://picsum.photos/seed/greenwall/600/400", imageHint: "vegetation wall" },
    { name: "Interior Oscuro", imageUrl: "https://i.imgur.com/8soLzCg.jpeg", imageHint: "dark interior" },
    { name: "Sin Fondo", imageUrl: "", imageHint: "" },
];
