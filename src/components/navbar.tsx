"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, GraduationCap, UserCircle, LogOut, Home, Info } from "lucide-react";

export function Navbar() {
  const navLinks = [
    { href: "/", label: "Accueil", icon: <Home className="h-4 w-4" /> },
    { href: "/jobs", label: "Emplois", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/courses", label: "Formations", icon: <GraduationCap className="h-4 w-4" /> },
    { href: "/about", label: "À propos", icon: <Info className="h-4 w-4" /> },
  ];

  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path to re-check auth state on navigation

  useEffect(() => {
    // Check localStorage on mount on the client side
    if (typeof window !== "undefined") {
      const signedIn = localStorage.getItem("isSignedIn") === "true";
      setIsSignedIn(signedIn);
    }
  }, [pathname]); // Rerun effect when route changes

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    setIsSignedIn(false);
    router.push("/");
    router.refresh();
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="BARA Logo" width={32} height={32} />
            <span className="font-bold font-headline sm:inline-block">
              BARA
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex">
            {isSignedIn ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Paramètres</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Connexion
                </Link>
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                     <Image src="/logo.png" alt="BARA Logo" width={32} height={32} />
                    <span className="font-bold font-headline">BARA</span>
                  </Link>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 text-lg font-medium"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto">
                   {isSignedIn ? (
                     <Button className="w-full" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-5 w-5" />
                        Se déconnecter
                      </Button>
                   ) : (
                     <Button className="w-full" asChild>
                       <Link href="/login">
                        <UserCircle className="mr-2 h-5 w-5" />
                        Connexion
                       </Link>
                    </Button>
                   )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
