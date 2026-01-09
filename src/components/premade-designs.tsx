import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { SimpleCrown } from "./icons";

export function PremadeDesigns() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
      {PlaceHolderImages.map((design) => (
        <Card key={design.id} className="overflow-hidden group w-full max-w-sm flex flex-col shadow-[0_0_20px_hsl(var(--accent))]">
          <CardHeader className="p-0">
            <div className="aspect-video overflow-hidden">
              <Image
                src={design.imageUrl}
                alt={design.title}
                width={600}
                height={400}
                data-ai-hint={design.imageHint}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 flex-grow">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{design.title}</span>
              {design.id === 'premade-1' && <SimpleCrown className="w-5 h-5 text-amber-400" />}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
              {design.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
                <Link href="/crear">Personalizar y Ordenar</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
