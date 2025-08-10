"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, GraduationCap, UserCircle } from "lucide-react";

export function Navbar() {
  const navLinks = [
    { href: "/jobs", label: "Jobs", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/courses", label: "Courses", icon: <GraduationCap className="h-4 w-4" /> },
  ];

  // This is a placeholder for authentication state
  const isSignedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <span className="font-bold font-headline sm:inline-block">
              BARA Connect
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
               <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
               </Button>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <span className="font-bold font-headline">BARA Connect</span>
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
                     <Button className="w-full">
                        <UserCircle className="mr-2 h-5 w-5" />
                        Profile
                      </Button>
                   ) : (
                     <Button className="w-full" asChild>
                       <Link href="/login">
                        <UserCircle className="mr-2 h-5 w-5" />
                        Sign In
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
