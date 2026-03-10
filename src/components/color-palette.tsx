'use client';

import { colors } from "@/lib/config";
import { cn } from "@/lib/utils";

export function ColorPalette() {
  return (
    <div className="flex flex-col gap-2.5">
      {colors.map((color) => (
        <div key={color.name} className="flex items-center gap-3 group">
          {color.name === "RGB" ? (
            <div
              className={cn(
                "relative w-7 h-7 rounded-full p-0.5 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-spin"
              )}
            >
              <div className="bg-secondary w-full h-full rounded-full"></div>
            </div>
          ) : (
            <div
              className={cn(
                "relative w-7 h-7 rounded-full border border-white/80 shadow-sm transition-all duration-300 group-hover:scale-110",
                color.twClass
              )}
              style={{
                boxShadow: `
                  0 0 2px #fff,
                  0 0 5px ${color.value},
                  0 0 8px ${color.value}
                `,
              }}
            />
          )}
          <h3
            className="font-bold text-sm transition-colors duration-300 group-hover:text-primary"
            style={{
              color: color.name === "RGB" ? "hsl(var(--foreground))" : color.value,
              textShadow: color.name === "RGB" ? 'none' : `0 0 6px ${color.value}`,
            }}
          >
            {color.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
