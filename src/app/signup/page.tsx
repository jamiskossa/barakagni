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
import { Textarea } from "@/components/ui/textarea";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const firstName = (event.currentTarget.elements.namedItem("first-name") as HTMLInputElement).value;
    const lastName = (event.currentTarget.elements.namedItem("last-name") as HTMLInputElement).value;
    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const specialty = (event.currentTarget.elements.namedItem("specialty") as HTMLInputElement).value;
    const bio = (event.currentTarget.elements.namedItem("bio") as HTMLTextAreaElement).value;
    const portfolioUrl = (event.currentTarget.elements.namedItem("portfolio-url") as HTMLInputElement).value;
    const cvFile = (event.currentTarget.elements.namedItem("cv-file") as HTMLInputElement).files?.[0];

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const cvDataUri = e.target?.result as string;

        const newUser = {
          id: `user_${Date.now()}`,
          firstName,
          lastName,
          email,
          specialty,
          bio,
          portfolioUrl,
          cvDataUri: cvFile ? cvDataUri : undefined,
          cvFileName: cvFile ? cvFile.name : undefined,
        };
        
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        router.push("/profile");
    };

    if (cvFile) {
        reader.readAsDataURL(cvFile);
    } else {
        // If no file, proceed without it
        reader.onload(new ProgressEvent('load'));
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
        <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline">Créez Votre Profil Artisan</CardTitle>
            <CardDescription>
            Rejoignez BARA et mettez en avant vos compétences.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">Prénom</Label>
                    <Input id="first-name" name="first-name" placeholder="Ousmane" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Nom</Label>
                    <Input id="last-name" name="last-name" placeholder="Yattara" required />
                  </div>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ousmane.yattara@exemple.com"
                    required
                  />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" required />
              </div>
               <div className="grid gap-2">
                    <Label htmlFor="specialty">Spécialité / Métier</Label>
                    <Input id="specialty" name="specialty" placeholder="Ex: Électricien, Menuisier" required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea id="bio" name="bio" placeholder="Décrivez brièvement votre expérience et vos compétences." required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="portfolio-url">Lien Portfolio / Site (facultatif)</Label>
                    <Input id="portfolio-url" name="portfolio-url" placeholder="https://mon-portfolio.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cv-file">Téléverser votre CV</Label>
                    <Input id="cv-file" name="cv-file" type="file" accept=".pdf,.doc,.docx" />
                     <p className="text-xs text-muted-foreground">Formats acceptés : PDF, DOC, DOCX.</p>
                </div>
                <Button type="submit" className="w-full" variant="gradient" size="lg">
                    Créer mon compte
                </Button>
            </form>
            <div className="mt-6 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="underline font-semibold text-primary">
                Se connecter
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
