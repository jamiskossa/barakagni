"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Building, Briefcase, BarChart, PlusCircle, Edit, Inbox, User, Mail, MessageSquare } from "lucide-react";
import type { JobCardProps } from "@/components/job-card";


type Employer = {
  id: string;
  role: 'employer';
  companyName: string;
  email: string;
  sector?: string;
  description?: string;
  website?: string;
};

type Candidate = {
  id: string;
  role?: 'candidate';
  firstName: string;
  lastName: string;
  email: string;
  specialty?: string;
  bio?: string;
  portfolioUrl?: string;
  cvDataUri?: string;
  cvFileName?: string;
};

type Application = {
    job: JobCardProps;
    coverLetter: string;
    appliedAt: string;
    // We'll simulate finding the user who applied
    applicant?: Candidate;
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

function ApplicationReceivedCard({ application }: { application: Application }) {
    const { job, coverLetter, appliedAt, applicant } = application;
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Candidature pour : {job.title}</CardTitle>
                <CardDescription>Reçue le {new Date(appliedAt).toLocaleDateString('fr-FR')}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                    <h4 className="font-semibold text-primary flex items-center"><User className="mr-2 h-5 w-5"/> Candidat</h4>
                     <Card className="p-4 bg-muted/50">
                        <p className="font-bold">{applicant?.firstName} {applicant?.lastName}</p>
                        <p className="text-sm text-muted-foreground">{applicant?.specialty}</p>
                        <a href={`mailto:${applicant?.email}`} className="text-sm text-accent hover:underline flex items-center gap-2 mt-2">
                           <Mail className="h-4 w-4"/> {applicant?.email}
                        </a>
                        <p className="text-xs mt-2 italic">{applicant?.bio}</p>
                    </Card>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <h4 className="font-semibold text-primary flex items-center"><MessageSquare className="mr-2 h-5 w-5"/> Lettre de motivation</h4>
                    <div className="p-4 border rounded-md whitespace-pre-wrap bg-background text-sm">
                        {coverLetter}
                    </div>
                    <Button>
                        Répondre au candidat
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export default function EmployerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Employer | null>(null);
  const [jobOffers, setJobOffers] = useState<JobCardProps[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    const currentUserData = localStorage.getItem("currentUser");
    
    if (!signedIn || !currentUserData) {
      router.push("/login");
      return;
    }
    
    const currentUser = JSON.parse(currentUserData);
    if (currentUser.role !== 'employer') {
        router.push("/profile");
        return;
    }
    
    setUser(currentUser);
    
    // In a real app, you would fetch data from your API
    setJobOffers([]);
    
    // Fetch all applications and simulate finding the applicant's data
    const allApplications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // In a real app, the applicant's ID would be stored with the application.
    // Here, we just assign the first found candidate to each application for demonstration.
    const candidateUsers = allUsers.filter((u: any) => u.role === 'candidate');
    
    const applicationsWithData = allApplications.map((app: any, index: number) => ({
        ...app,
        // This is a rough simulation. A real app would have a userId on the application.
        applicant: candidateUsers[index % candidateUsers.length] 
    })).reverse();


    setApplications(applicationsWithData);

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
                 <Tabs defaultValue="applications" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="offers"><Briefcase className="mr-2 h-4 w-4" />Offres d'Emploi</TabsTrigger>
                        <TabsTrigger value="applications"><Inbox className="mr-2 h-4 w-4" />Candidatures</TabsTrigger>
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
                    <TabsContent value="applications" className="mt-6">
                       {applications.length > 0 ? (
                           <div className="space-y-6">
                               {applications.map((app, index) => (
                                   <ApplicationReceivedCard key={index} application={app} />
                               ))}
                           </div>
                       ) : (
                            <PlaceholderContent 
                                title="Candidatures Reçues" 
                                description="Les candidatures pour vos offres d'emploi apparaîtront ici."
                                icon={Inbox}
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
    
