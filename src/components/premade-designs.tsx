import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export function PremadeDesigns() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
      {PlaceHolderImages.map((design) => (
        <Card key={design.id} className="overflow-hidden group max-w-sm w-full bg-black shadow-lg rounded-lg">
          <CardContent className="p-0 relative">
            <Link href="/crear">
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={design.imageUrl}
                  alt={design.title || "Premade LED sign design"}
                  width={600}
                  height={800}
                  data-ai-hint={design.imageHint}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 text-center">
                <h3 className="font-bold text-lg text-black">{design.title}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{design.description}</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
