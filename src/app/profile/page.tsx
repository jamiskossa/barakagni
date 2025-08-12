"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, Briefcase, MessageSquare, Edit, Link as LinkIcon, Download } from "lucide-react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty?: string;
  bio?: string;
  portfolioUrl?: string;
  cvDataUri?: string;
  cvFileName?: string;
};

function ProfileDetails({ user }: { user: User }) {
  return (
     <Card>
        <CardHeader>
            <CardTitle>Mes Informations</CardTitle>
            <CardDescription>Vos détails personnels et professionnels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="font-medium">
                <p className="text-sm text-muted-foreground">Spécialité / Métier</p>
                <p>{user.specialty || "Non spécifié"}</p>
            </div>
             <div className="font-medium">
                <p className="text-sm text-muted-foreground">Biographie</p>
                <p className="text-sm font-normal whitespace-pre-wrap">{user.bio || "Non spécifié"}</p>
            </div>
            {user.portfolioUrl && (
                 <div className="font-medium">
                    <p className="text-sm text-muted-foreground">Portfolio / Site</p>
                    <a href={user.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-accent hover:underline">
                        <LinkIcon className="h-4 w-4" />
                        <span>{user.portfolioUrl}</span>
                    </a>
                </div>
            )}
             <div className="flex flex-wrap gap-4 mt-4">
                <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier le profil
                </Button>
                {user.cvDataUri && (
                    <Button asChild variant="secondary">
                        <a href={user.cvDataUri} download={user.cvFileName || 'cv.pdf'}>
                           <Download className="mr-2 h-4 w-4" />
                           Télécharger le CV
                        </a>
                    </Button>
                )}
             </div>
        </CardContent>
    </Card>
  )
}

function PlaceholderContent({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
    return (
        <Card className="text-center flex flex-col items-center justify-center h-64 border-dashed">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            <CardContent>
                <p className="text-muted-foreground mt-2">{description}</p>
            </CardContent>
        </Card>
    );
}


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // This check needs to be in useEffect to avoid hydration mismatch
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    if (!signedIn) {
      router.push("/login");
      return;
    }
    
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
        // If no user data, something is wrong, redirect to login
        router.push("/login");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    router.push("/");
    router.refresh(); // Forces a re-render to update the navbar state
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">Chargement du profil...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
                 <Card className="w-full text-center p-6">
                    <div className="mx-auto mb-4">
                        <Image 
                            src="/logo.png" 
                            alt="User profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-primary mx-auto"
                        />
                    </div>
                    <CardTitle className="text-2xl font-headline">{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                     <Button onClick={handleSignOut} className="w-full mt-6" variant="gradient">
                        <LogOut className="mr-2 h-4 w-4" />
                        Se déconnecter
                    </Button>
                </Card>
            </aside>
            <main className="md:col-span-3">
                 <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profil</TabsTrigger>
                        <TabsTrigger value="applications"><Briefcase className="mr-2 h-4 w-4" />Candidatures</TabsTrigger>
                        <TabsTrigger value="messages"><MessageSquare className="mr-2 h-4 w-4" />Messages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="mt-6">
                        <ProfileDetails user={user} />
                    </TabsContent>
                    <TabsContent value="applications" className="mt-6">
                       <PlaceholderContent 
                            title="Mes Candidatures" 
                            description="Les offres auxquelles vous avez postulé apparaîtront ici."
                            icon={Briefcase}
                        />
                    </TabsContent>
                     <TabsContent value="messages" className="mt-6">
                        <PlaceholderContent 
                            title="Mes Messages" 
                            description="Vos conversations avec les employeurs apparaîtront ici."
                            icon={MessageSquare}
                        />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
  );
}
