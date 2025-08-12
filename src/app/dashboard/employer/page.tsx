"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Building, Briefcase, BarChart, PlusCircle, Edit } from "lucide-react";
import { JobCard, type JobCardProps } from "@/components/job-card";


type Employer = {
  id: string;
  role: 'employer';
  companyName: string;
  email: string;
  sector?: string;
  description?: string;
  website?: string;
};


function PlaceholderContent({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
    return (
        <Card className="text-center flex flex-col items-center justify-center h-64 border-dashed">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            <CardContent>
                <p className="text-muted-foreground mt-2">{description}</p>
                 <Button className="mt-4" variant="gradient">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une offre
                </Button>
            </CardContent>
        </Card>
    );
}


export default function EmployerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Employer | null>(null);
  // This would come from your database
  const [jobOffers, setJobOffers] = useState<JobCardProps[]>([]);

  useEffect(() => {
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    const currentUserData = localStorage.getItem("currentUser");
    
    if (!signedIn || !currentUserData) {
      router.push("/login");
      return;
    }
    
    const currentUser = JSON.parse(currentUserData);
    if (currentUser.role !== 'employer') {
        // Redirect if a non-employer tries to access this page
        router.push("/profile");
        return;
    }
    
    setUser(currentUser);
    
    // In a real app, you would fetch job offers created by this employer
    // For now, it's an empty array
    setJobOffers([]);

  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
                 <Card className="w-full text-center p-6">
                    <div className="mx-auto mb-4 flex items-center justify-center h-32 w-32 rounded-full bg-muted border-4 border-primary">
                        <Building className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">{user.companyName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                     <Button onClick={handleSignOut} className="w-full mt-6" variant="gradient">
                        <LogOut className="mr-2 h-4 w-4" />
                        Se déconnecter
                    </Button>
                </Card>
                 <Card className="w-full mt-6">
                    <CardHeader>
                        <CardTitle className="text-xl">Infos Entreprise</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                         <p><strong>Secteur:</strong> {user.sector}</p>
                         <p>{user.description}</p>
                         {user.website && <a href={user.website} target="_blank" rel="noreferrer" className="text-accent hover:underline break-all">{user.website}</a>}
                    </CardContent>
                     <CardFooter>
                        <Button variant="outline" className="w-full">
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier les infos
                        </Button>
                    </CardFooter>
                 </Card>
            </aside>
            <main className="md:col-span-3">
                 <Tabs defaultValue="offers" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="offers"><Briefcase className="mr-2 h-4 w-4" />Offres d'Emploi</TabsTrigger>
                        <TabsTrigger value="stats"><BarChart className="mr-2 h-4 w-4" />Statistiques</TabsTrigger>
                    </TabsList>
                    <TabsContent value="offers" className="mt-6">
                       {jobOffers.length > 0 ? (
                           <div className="space-y-6">
                                {/* Map through job offers */}
                           </div>
                       ) : (
                            <PlaceholderContent 
                                title="Gérez vos Offres d'Emploi" 
                                description="Vous n'avez pas encore publié d'offre. Commencez dès maintenant !"
                                icon={Briefcase}
                            />
                       )}
                    </TabsContent>
                     <TabsContent value="stats" className="mt-6">
                        <PlaceholderContent 
                            title="Statistiques des Candidatures" 
                            description="Les données sur les vues et les candidatures apparaîtront ici."
                            icon={BarChart}
                        />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
  );
}
    