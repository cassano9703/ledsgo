import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PremadeDesigns() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {PlaceHolderImages.map((design) => (
        <Card key={design.id} className="overflow-hidden group">
          <CardHeader>
            <CardTitle>{design.title}</CardTitle>
            <CardDescription>{design.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-md">
              <Image
                src={design.imageUrl}
                alt={design.title || "Premade LED sign design"}
                width={600}
                height={400}
                data-ai-hint={design.imageHint}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/crear">Personalizar y Ordenar</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
