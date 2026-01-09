import { Zap } from "lucide-react";

export function MovingTextBar() {
  const text = "Iluminando tu mundo Led a Led";
  const items = Array(8).fill(text); 

  return (
    <div className="relative flex overflow-x-hidden bg-primary text-primary-foreground py-3 border-y-2 border-primary-foreground">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span key={index} className="flex items-center text-xl font-bold mx-4 tracking-wider">
            {item}
            <Zap className="w-5 h-5 ml-4 text-yellow-300 fill-current" />
          </span>
        ))}
      </div>

      <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
         {items.map((item, index) => (
          <span key={index} className="flex items-center text-xl font-bold mx-4 tracking-wider">
            {item}
            <Zap className="w-5 h-5 ml-4 text-yellow-300 fill-current" />
          </span>
        ))}
      </div>
    </div>
  );
}
