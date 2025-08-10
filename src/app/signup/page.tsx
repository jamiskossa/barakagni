"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate successful signup and login
    localStorage.setItem("isSignedIn", "true");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-xl font-headline">S'inscrire</CardTitle>
            <CardDescription>
            Entrez vos informations pour créer un compte
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="first-name">Prénom</Label>
                    <Input id="first-name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="last-name">Nom</Label>
                    <Input id="last-name" placeholder="Robinson" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Créer un compte
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="underline">
                Se connecter
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}