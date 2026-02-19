
import { Header } from "@/components/layout/header";
import { NeonGallery } from "@/components/neon-gallery";
import { Footer } from "@/components/layout/footer";
import { NeonJobs } from "@/lib/placeholder-images";

export default function NeonCatalogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section id="catalog" className="py-12 md:py-20 lg:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Catálogo de Letreros Neón
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Inspírate con algunos de los proyectos que hemos realizado.
                </p>
              </div>
            </div>
            <NeonGallery jobs={NeonJobs} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
