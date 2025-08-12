import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { Facebook, Github, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import { WhatsAppWidget } from '@/components/whatsapp-widget';

export const metadata: Metadata = {
  title: 'BARA',
  description: "Votre passerelle vers les opportunités d'emploi et de formation en Guinée.",
};

function Footer() {
  return (
    <footer className="w-full py-6 mt-auto bg-background/50 backdrop-blur-sm border-t">
      <div className="container mx-auto text-center ">
        <div className="flex justify-center gap-6 mb-4">
            <Link href="#" target="_blank" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
             <Link href="#" target="_blank" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
             <Link href="#" target="_blank" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-6 w-6" />
            </Link>
             <Link href="#" target="_blank" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Application créée par Yattara Ousmane
        </p>
         <p className="text-xs text-muted-foreground mt-2">
          BARA est une plateforme qui met en relation des artisans qualifiés avec des opportunités d'emploi et de formation en Guinée.
        </p>
      </div>
    </footer>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppWidget phoneNumber="0758541347" />
        <Toaster />
      </body>
    </html>
  );
}
