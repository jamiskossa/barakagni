"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd fetch user data from your backend.
    // For this simulation, we'll check localStorage.
    // This is a simplified simulation. A real login would be more secure.
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const role = (event.currentTarget.elements.namedItem("role") as HTMLInputElement).value;
    
    const existingUser = users.find((user: any) => user.email === email);

    if (existingUser) {
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      // In a real app, you'd route based on the 'role'
      if (role === 'employer') {
        // Redirect to an employer dashboard (to be created)
        // For now, we'll just log it and go to profile
        console.log("Logging in as an employer");
        router.push("/profile");
      } else {
        router.push("/profile");
      }
    } else {
      // For simulation, if user doesn't exist, let's create a basic one
      // and log them in.
      const guestUser = {
        id: `user_${Date.now()}`,
        firstName: "Utilisateur",
        lastName: "Invité",
        email: email,
      };
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(guestUser));
      // Optionally add the new guest to the users list
      users.push(guestUser);
      localStorage.setItem("users", JSON.stringify(users));
      router.push("/profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Connexion</CardTitle>
          <CardDescription>
            Entrez vos informations pour vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input id="password" type="password" defaultValue="password" required />
              </div>
               <div className="grid gap-2">
                <Label>Je suis un</Label>
                <RadioGroup defaultValue="candidate" name="role" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="r1" />
                    <Label htmlFor="r1">Candidat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="r2" />
                    <Label htmlFor="r2">Employeur</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" variant="gradient">
                Se connecter
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous n'avez pas de compte ?{" "}
            <Link href="/signup" className="underline">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
