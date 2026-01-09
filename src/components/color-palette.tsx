'use client';

import { colors } from "@/lib/config";
import { cn } from "@/lib/utils";

export function ColorPalette() {
  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center">
      {colors.map((color) => (
        <div key={color.name} className="flex flex-col items-center gap-4 group">
          {color.name === "RGB" ? (
            <div
              className={cn(
                "relative w-24 h-24 rounded-full p-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-spin"
              )}
            >
              <div className="bg-secondary w-full h-full rounded-full"></div>
            </div>
          ) : (
            <div
              className={cn(
                "relative w-24 h-24 rounded-full border-2 border-white/80 shadow-lg transition-all duration-300 group-hover:scale-105",
                color.twClass
              )}
              style={{
                boxShadow: `
                  0 0 5px #fff,
                  0 0 10px ${color.value},
                  0 0 15px ${color.value}
                `,
              }}
            />
          )}
          <h3
            className="font-bold text-lg text-center transition-colors duration-300 group-hover:text-primary"
            style={{
              color: color.name === "RGB" ? "hsl(var(--foreground))" : color.value,
              textShadow: color.name === "RGB" ? 'none' : `0 0 8px ${color.value}`,
            }}
          >
            {color.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
