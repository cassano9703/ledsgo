export type FontConfig = {
  name: string;
  style: React.CSSProperties;
};

export const fonts: FontConfig[] = [
  { name: "Poppins", style: { fontFamily: "'Poppins', sans-serif" } },
  { name: "Lobster", style: { fontFamily: "'Lobster', cursive" } },
  { name: "Pacifico", style: { fontFamily: "'Pacifico', cursive" } },
  { name: "Bebas Neue", style: { fontFamily: "'Bebas Neue', sans-serif" } },
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
  { name: "Small", multiplier: 0.8 },
  { name: "Medium", multiplier: 1 },
  { name: "Large", multiplier: 1.2 },
  { name: "Extra Large", multiplier: 1.5 },
];
