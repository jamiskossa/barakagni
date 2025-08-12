"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, Briefcase, MessageSquare, Edit, Link as LinkIcon, Download, GraduationCap, Mail } from "lucide-react";
import { JobCard, type JobCardProps } from "@/components/job-card";
import { CourseCard, type CourseCardProps } from "@/components/course-card";

type User = {
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
};

type Registration = {
    course: CourseCardProps;
    motivation: string;
    registeredAt: string;
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

function SentMessageCard({ to, subject, message, date }: { to: string, subject: string, message: string, date: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-primary" />
                    {subject}
                </CardTitle>
                <CardDescription>
                    Envoyé à: {to} - {new Date(date).toLocaleDateString("fr-FR")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap p-4 bg-muted/50 rounded-md">{message}</p>
            </CardContent>
        </Card>
    );
}


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    // This check needs to be in useEffect to avoid hydration mismatch
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    if (!signedIn) {
      router.push("/login");
      return;
    }
    
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
       if (currentUser.role === 'employer') {
            router.push('/dashboard/employer');
            return;
        }
      setUser(currentUser);
    } else {
        router.push("/login");
        return;
    }

    const storedApplications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    setApplications(storedApplications.reverse());
    
    const storedRegistrations = JSON.parse(localStorage.getItem("courseRegistrations") || "[]");
    setRegistrations(storedRegistrations.reverse());

  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    // Also clear applications for privacy
    // In a real app, this would be handled by server-side sessions
    localStorage.removeItem("jobApplications");
    localStorage.removeItem("courseRegistrations");
    router.push("/");
    router.refresh(); // Forces a re-render to update the navbar state
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">Chargement du profil...</div>;
  }

  const allSentMessages = [...applications, ...registrations].sort((a, b) => new Date(b.appliedAt || b.registeredAt).getTime() - new Date(a.appliedAt || a.registeredAt).getTime());

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
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profil</TabsTrigger>
                        <TabsTrigger value="applications"><Briefcase className="mr-2 h-4 w-4" />Candidatures</TabsTrigger>
                        <TabsTrigger value="courses"><GraduationCap className="mr-2 h-4 w-4" />Formations</TabsTrigger>
                        <TabsTrigger value="messages"><MessageSquare className="mr-2 h-4 w-4" />Messages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="mt-6">
                        <ProfileDetails user={user} />
                    </TabsContent>
                    <TabsContent value="applications" className="mt-6">
                       {applications.length > 0 ? (
                           <div className="space-y-6">
                               {applications.map((app, index) => (
                                   <JobCard key={index} {...app.job} hideApplyButton={true} />
                               ))}
                           </div>
                       ) : (
                            <PlaceholderContent 
                                title="Mes Candidatures" 
                                description="Les offres auxquelles vous avez postulé apparaîtront ici."
                                icon={Briefcase}
                            />
                       )}
                    </TabsContent>
                    <TabsContent value="courses" className="mt-6">
                       {registrations.length > 0 ? (
                           <div className="space-y-6">
                               {registrations.map((reg, index) => (
                                   <CourseCard key={index} {...reg.course} hideRegisterButton={true} />
                               ))}
                           </div>
                       ) : (
                            <PlaceholderContent 
                                title="Mes Formations" 
                                description="Les formations auxquelles vous vous êtes inscrit apparaîtront ici."
                                icon={GraduationCap}
                            />
                       )}
                    </TabsContent>
                    <TabsContent value="messages" className="mt-6">
                        {allSentMessages.length > 0 ? (
                            <div className="space-y-6">
                                {applications.map((app, index) => (
                                    <SentMessageCard 
                                        key={`app-msg-${index}`}
                                        to={app.job.company}
                                        subject={`Candidature: ${app.job.title}`}
                                        message={app.coverLetter}
                                        date={app.appliedAt}
                                    />
                                ))}
                                {registrations.map((reg, index) => (
                                    <SentMessageCard 
                                        key={`reg-msg-${index}`}
                                        to={reg.course.provider}
                                        subject={`Inscription: ${reg.course.title}`}
                                        message={reg.motivation}
                                        date={reg.registeredAt}
                                    />
                                ))}
                            </div>
                        ) : (
                            <PlaceholderContent 
                                title="Mes Messages Envoyés" 
                                description="Vos lettres de motivation et messages d'inscription apparaîtront ici."
                                icon={MessageSquare}
                            />
                        )}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
  );
}
