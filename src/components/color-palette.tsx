import { colors } from "@/lib/config";
import { cn } from "@/lib/utils";

export function ColorPalette() {
  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center">
      {colors.map((color) => (
        <div key={color.name} className="flex flex-col items-center gap-4 group">
          <div
            className={cn(
              "relative w-28 h-28 rounded-full border-4 border-white/20 dark:border-gray-800/50 shadow-lg transition-all duration-300 group-hover:scale-105",
              color.twClass
            )}
            style={{
              boxShadow: `
                  0 0 10px ${color.value},
                  0 0 20px ${color.value},
                  0 0 30px ${color.value},
                  0 0 40px ${color.value},
                  0 0 50px #fff,
                  inset 0 0 12px ${color.value}
                `,
            }}
          />
          <h3
            className="font-bold text-lg text-center transition-colors duration-300 group-hover:text-primary"
            style={{
                color: color.value,
                textShadow: `
                0 0 2px ${color.value},
                0 0 5px #fff
                `,
            }}
          >
            {color.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
