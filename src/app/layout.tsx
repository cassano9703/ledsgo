import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Leds Go Configurator',
  description: 'Personaliza y ordena tus propios letreros de neón LED.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Lobster&family=Pacifico&family=Bebas+Neue&family=Dancing+Script&family=Kalam&family=Alex+Brush&family=Parisienne&family=Caveat&family=Allura&family=Cedarville+Cursive&family=Orbitron&family=Tangerine&family=Yeseva+One&display=swap" rel="stylesheet" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
