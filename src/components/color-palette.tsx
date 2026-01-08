import { colors } from "@/lib/config";
import { cn } from "@/lib/utils";

export function ColorPalette() {
  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center">
      {colors.map((color) => (
        <div key={color.name} className="flex flex-col items-center gap-4 group">
          <div
            className={cn(
              "relative w-24 h-24 rounded-full border-2 border-white/80 shadow-lg transition-all duration-300 group-hover:scale-105",
              color.twClass
            )}
            style={{
              boxShadow: `
                  0 0 5px #fff,
                  inset 0 0 5px #fff,
                  0 0 10px ${color.value},
                  inset 0 0 10px ${color.value}
                `,
            }}
          />
          <h3
            className="font-bold text-lg text-center transition-colors duration-300 group-hover:text-primary"
            style={{
                color: color.name === 'White' ? '#333' : color.value,
                textShadow: `0 0 8px ${color.value}`,
            }}
          >
            {color.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
