import { Briefcase, Calendar, Home } from "lucide-react";
import { Card } from "./ui/card";

const categories = [
  {
    name: "Negocios",
    icon: Briefcase,
    color: "cyan",
  },
  {
    name: "Eventos",
    icon: Calendar,
    color: "fuchsia",
  },
  {
    name: "Home Decor",
    icon: Home,
    color: "yellow",
  },
];

export function ProductCategories() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Categorías de Productos
            </h2>
          </div>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="p-8 flex flex-col items-center justify-center gap-4 bg-background/50 border-border/50 hover:bg-background transition-colors"
            >
              <category.icon
                className="w-20 h-20"
                style={{
                  color: category.color,
                  filter: `drop-shadow(0 0 5px ${category.color})`,
                }}
              />
              <h3 className="text-xl font-bold">{category.name}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
