"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, Building, Briefcase, BarChart, PlusCircle, Edit, Inbox, User, Mail, MessageSquare } from "lucide-react";
import { JobCard, type JobCardProps } from "@/components/job-card";
import { JobOfferForm } from "@/components/job-offer-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationStats } from "@/components/application-stats";

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

type Message = {
    senderId: string;
    receiverId: string;
    content: string;
    sentAt: string;
};

type Application = {
    job: JobCardProps;
    coverLetter: string;
    appliedAt: string;
    applicant?: Candidate;
    messages?: Message[];
};

export type ApplicationStatsData = {
    jobTitle: string;
    applications: number;
}

const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères." }),
  category: z.string().min(2, { message: "La catégorie est requise." }),
  location: z.string().min(2, { message: "Le lieu est requis." }),
  type: z.string().min(2, { message: "Le type de contrat est requis." }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
});

const messageFormSchema = z.object({
  content: z.string().min(10, { message: "Votre message doit contenir au moins 10 caractères." }),
});


function PlaceholderContent({ title, description, icon: Icon, actionButton }: { title: string; description: string; icon: React.ElementType, actionButton?: React.ReactNode }) {
    return (
        <Card className="text-center flex flex-col items-center justify-center h-64 border-dashed">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            <CardContent>
                <p className="text-muted-foreground mt-2">{description}</p>
                 {actionButton && <div className="mt-4">{actionButton}</div>}
            </CardContent>
        </Card>
    );
}

function ReplyForm({ onSubmit }: { onSubmit: (data: { content: string }) => void }) {
    const [content, setContent] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = messageFormSchema.safeParse({ content });
        if (result.success) {
            onSubmit(result.data);
            setContent('');
        } else {
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description: result.error.errors[0].message,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrivez votre réponse ici..."
                className="min-h-[120px]"
            />
            <Button type="submit" className="w-full">Envoyer la réponse</Button>
        </form>
    );
}


function ApplicationReceivedCard({ application, onReply }: { application: Application; onReply: (applicantId: string, content: string) => void }) {
    const { job, coverLetter, appliedAt, applicant, messages = [] } = application;
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    const handleReplySubmit = (data: { content: string }) => {
        if (applicant) {
            onReply(applicant.id, data.content);
            setIsReplyOpen(false);
        }
    };
    
    const employerId = JSON.parse(localStorage.getItem('currentUser') || '{}').id;

    return (
        <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg md:text-xl">Candidature pour : {job.title}</CardTitle>
                    <CardDescription>Reçue le {new Date(appliedAt).toLocaleDateString('fr-FR')}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <h4 className="font-semibold text-primary flex items-center"><User className="mr-2 h-5 w-5"/> Candidat</h4>
                         <Card className="p-4 bg-muted/50">
                            <p className="font-bold">{applicant?.firstName} {applicant?.lastName}</p>
                            <p className="text-sm text-muted-foreground">{applicant?.specialty}</p>
                            <p className="text-sm text-accent flex items-center gap-2 mt-2 cursor-default" title="L'email est masqué pour la confidentialité">
                               <Mail className="h-4 w-4"/> Email masqué
                            </p>
                            <p className="text-xs mt-2 italic">{applicant?.bio}</p>
                        </Card>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="font-semibold text-primary flex items-center"><MessageSquare className="mr-2 h-5 w-5"/> Discussion</h4>
                        <div className="p-4 border rounded-md whitespace-pre-wrap bg-background text-sm max-h-48 overflow-y-auto space-y-4">
                           <div className="text-muted-foreground">
                                <p className="font-bold">Lettre de motivation :</p>
                                <p>{coverLetter}</p>
                           </div>
                           {messages.map((msg, index) => (
                               <div key={index} className={`p-2 rounded-lg ${msg.senderId === employerId ? 'bg-primary/10 text-right' : 'bg-muted'}`}>
                                   <p className="text-xs text-muted-foreground">{msg.senderId === employerId ? 'Vous' : `${applicant?.firstName}`}, le {new Date(msg.sentAt).toLocaleDateString('fr-FR')}</p>
                                   <p>{msg.content}</p>
                               </div>
                           ))}
                        </div>
                         <div className="flex flex-col sm:flex-row gap-4">
                            <DialogTrigger asChild>
                                <Button>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Répondre
                                </Button>
                            </DialogTrigger>
                             <Button variant="outline" asChild>
                                <a href={`https://wa.me/?text=Bonjour%20${applicant?.firstName},%20concernant%20votre%20candidature%20pour%20${job.title}...`} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>Répondre à {applicant?.firstName} {applicant?.lastName}</DialogTitle>
                </DialogHeader>
                <ReplyForm onSubmit={handleReplySubmit} />
            </DialogContent>
        </Dialog>
    )
}


export default function EmployerDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<Employer | null>(null);
  const [jobOffers, setJobOffers] = useState<JobCardProps[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [statsData, setStatsData] = useState<ApplicationStatsData[]>([]);
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("applications");

  useEffect(() => {
    if (localStorage.getItem("demoEmployersInitialized") !== "true") {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const demoEmployers = [
            { id: 'emp_1722020000001', role: 'employer', companyName: 'Conakry Constructions Co.', email: 'contact@ccc.com', sector: 'BTP', description: 'Leader de la construction en Guinée.' },
            { id: 'emp_1722020000002', role: 'employer', companyName: 'Services des Eaux de Kindia', email: 'contact@sek.com', sector: 'Services', description: 'Distribution et maintenance des eaux.' },
            { id: 'emp_ousmaneyat2003', role: 'employer', companyName: 'Yattara Corp', email: 'ousmaneyat2003@yahoo.fr', sector: 'Tech', description: 'Solutions innovantes.' }
        ];
        demoEmployers.forEach(demoEmp => {
            if (!users.find((u: any) => u.id === demoEmp.id)) { users.push(demoEmp); }
        });

        const demoCandidates = [
            { id: 'user_kankoujsmom', role: 'candidate', firstName: 'Kankou', lastName: 'Diallo', email: 'kankoujsmom@gmail.com', specialty: 'Développeur Web', bio: 'Passionné par le code.' }
        ];
        demoCandidates.forEach(demoCand => {
             if (!users.find((u: any) => u.id === demoCand.id)) { users.push(demoCand); }
        });
        
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("demoEmployersInitialized", "true");
    }

    const signedIn = localStorage.getItem("isSignedIn") === "true";
    const currentUserData = localStorage.getItem("currentUser");
    
    if (!signedIn || !currentUserData) {
      router.push("/login"); return;
    }
    
    const currentUser = JSON.parse(currentUserData);
    if (currentUser.role !== 'employer') {
        router.push("/profile"); return;
    }
    
    setUser(currentUser);
    
    const allOffers = JSON.parse(localStorage.getItem("jobOffers") || "[]");
    const myOffers = allOffers.filter((offer: any) => offer.employerId === currentUser.id);
    setJobOffers(myOffers.reverse());
    
    const allApplications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const candidateUsers = allUsers.filter((u: any) => u.role === 'candidate');

    const myApplications = allApplications.filter((app: any) => app.job.employerId === currentUser.id);
    
    const applicationsWithData = myApplications.map((app: any) => ({
        ...app,
        applicant: candidateUsers.find((u: Candidate) => u.id === app.applicantId) || candidateUsers[0],
    })).reverse();

    setApplications(applicationsWithData);

    const stats = myOffers.map(offer => ({
        jobTitle: offer.title,
        applications: myApplications.filter(app => app.job.id === offer.id).length,
    }));
    setStatsData(stats);


  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    router.push("/");
    router.refresh();
  };
  
  const handleEditProfile = () => {
    alert("La modification du profil employeur sera bientôt disponible !");
  }

  const handleAddOfferSubmit = (data: z.infer<typeof jobFormSchema>) => {
    if (!user) return;
    
    const newOffer: JobCardProps = {
      id: `job_${Date.now()}`,
      employerId: user.id,
      company: user.companyName,
      imageUrl: "/logo.png",
      dataAiHint: "new job",
      ...data,
    };
    
    const allOffers = JSON.parse(localStorage.getItem("jobOffers") || "[]");
    allOffers.push(newOffer);
    localStorage.setItem("jobOffers", JSON.stringify(allOffers));
    
    setJobOffers(prev => [newOffer, ...prev]);
    setIsAddOfferOpen(false);
    toast({
      title: "Offre d'emploi ajoutée !",
      description: "Votre nouvelle offre est maintenant visible pour les candidats.",
    });
  };

  const handleReplyToCandidate = (applicantId: string, content: string) => {
    if (!user) return;
    const newMessage: Message = {
        senderId: user.id,
        receiverId: applicantId,
        content: content,
        sentAt: new Date().toISOString(),
    };

    const allApplications = JSON.parse(localStorage.getItem("jobApplications") || '[]');
    // Find the relevant application and add the message
    const updatedApplications = allApplications.map((app: any) => {
        if (app.applicantId === applicantId && app.job.employerId === user.id) {
            const messages = app.messages || [];
            messages.push(newMessage);
            return { ...app, messages };
        }
        return app;
    });

    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
    
    // Update component state to re-render
    const myApplications = updatedApplications.filter((app: any) => app.job.employerId === user.id);
    const candidateUsers = JSON.parse(localStorage.getItem("users") || "[]").filter((u: any) => u.role === 'candidate');
    const applicationsWithData = myApplications.map((app: any) => ({
        ...app,
        applicant: candidateUsers.find((u: Candidate) => u.id === app.applicantId) || candidateUsers[0],
    })).reverse();
    setApplications(applicationsWithData);

    toast({
        title: "Message envoyé !",
        description: "Votre réponse a été envoyée au candidat.",
    });
  };


  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
                 <Card className="w-full text-center p-6">
                    <div className="relative mx-auto mb-4 w-32 h-32">
                        <Image 
                            src="/logo.png" 
                            alt={`${user.companyName} logo`}
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-primary object-contain"
                         />
                         <Button size="icon" className="absolute bottom-0 right-0 rounded-full" variant="secondary" onClick={() => alert("Fonctionnalité de modification de photo à venir.")}>
                            <Edit className="h-4 w-4" />
                         </Button>
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
                        <Button variant="outline" className="w-full" onClick={handleEditProfile}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier les infos
                        </Button>
                    </CardFooter>
                 </Card>
            </aside>
            <main className="md:col-span-3">
                 <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="overflow-x-auto">
                            <TabsList className="grid w-full grid-cols-3 min-w-[320px]">
                                <TabsTrigger value="offers"><Briefcase className="mr-2 h-4 w-4" />Offres</TabsTrigger>
                                <TabsTrigger value="applications"><Inbox className="mr-2 h-4 w-4" />Candidatures</TabsTrigger>
                                <TabsTrigger value="stats"><BarChart className="mr-2 h-4 w-4" />Stats</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="offers" className="mt-6">
                           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                             <h2 className="text-2xl font-headline text-primary">Mes Offres Publiées</h2>
                             <DialogTrigger asChild>
                                <Button variant="gradient" className="w-full sm:w-auto">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Ajouter une offre
                                </Button>
                             </DialogTrigger>
                           </div>
                           {jobOffers.length > 0 ? (
                               <div className="space-y-4">
                                   {jobOffers.map((job) => <JobCard key={job.id} {...job} hideApplyButton={true} />)}
                               </div>
                           ) : (
                                <PlaceholderContent 
                                    title="Aucune Offre Publiée" 
                                    description="Ajoutez votre première offre d'emploi pour attirer des talents."
                                    icon={Briefcase}
                                />
                           )}
                        </TabsContent>
                        <TabsContent value="applications" className="mt-6">
                           {applications.length > 0 ? (
                               <div className="space-y-6">
                                   {applications.map((app, index) => (
                                       <ApplicationReceivedCard key={index} application={app} onReply={handleReplyToCandidate} />
                                   ))}
                               </div>
                           ) : (
                                 <PlaceholderContent 
                                    title="Aucune Candidature Reçue" 
                                    description="Les candidatures pour vos offres d'emploi apparaîtront ici."
                                    icon={Inbox}
                                />
                           )}
                        </TabsContent>
                         <TabsContent value="stats" className="mt-6">
                            {statsData.length > 0 ? (
                                <ApplicationStats data={statsData} />
                            ) : (
                                <PlaceholderContent
                                title="Statistiques des Candidatures"
                                description="Les données sur les candidatures apparaîtront ici dès que vous en recevrez."
                                icon={BarChart}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                     <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Créer une nouvelle offre d'emploi</DialogTitle>
                        </DialogHeader>
                        <JobOfferForm onSubmit={handleAddOfferSubmit} />
                    </DialogContent>
                 </Dialog>
            </main>
        </div>
    </div>
  );
}
