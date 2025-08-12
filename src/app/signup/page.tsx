"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building } from "lucide-react";

export default function SignupRoleSelectionPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-headline">Rejoignez BARA</CardTitle>
          <CardDescription>
            Choisissez votre type de compte pour commencer.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Button 
            variant="outline" 
            className="h-auto py-8 flex flex-col items-center justify-center space-y-3"
            onClick={() => router.push('/signup/candidate')}
          >
            <User className="h-10 w-10 text-accent" />
            <span className="font-semibold text-lg">Je suis un Candidat</span>
            <p className="text-xs text-muted-foreground text-center">Je cherche un emploi ou une formation.</p>
          </Button>
           <Button 
            variant="outline" 
            className="h-auto py-8 flex flex-col items-center justify-center space-y-3"
            onClick={() => router.push('/signup/employer')}
          >
            <Building className="h-10 w-10 text-accent" />
            <span className="font-semibold text-lg">Je suis un Employeur</span>
            <p className="text-xs text-muted-foreground text-center">Je cherche à recruter des talents qualifiés.</p>
          </Button>
        </CardContent>
        <div className="mt-2 mb-6 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="underline font-semibold text-primary">
                Se connecter
            </Link>
        </div>
      </Card>
    </div>
  )
}
    