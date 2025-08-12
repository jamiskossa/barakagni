
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, User, Briefcase, MessageSquare, Edit, Link as LinkIcon, Download, GraduationCap, Mail } from "lucide-react";
import { JobCard, type JobCardProps } from "@/components/job-card";
import { CourseCard, type CourseCardProps } from "@/components/course-card";
import { useToast } from "@/hooks/use-toast";
import { EditCandidateForm, editCandidateSchema } from "@/components/edit-candidate-form";
import { z } from "zod";


type UserProfile = {
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
  profilePicture?: string;
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
    messages?: Message[];
};

type Registration = {
    course: CourseCardProps;
    motivation: string;
    registeredAt: string;
};

function ProfileDetails({ user, onProfileUpdate }: { user: UserProfile, onProfileUpdate: () => void }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { toast } = useToast();

  const handleProfileSubmit = (data: z.infer<typeof editCandidateSchema>) => {
    
    const processUpdate = (cvData?: { cvDataUri: string, cvFileName: string }) => {
        const updatedUser = { 
            ...user, 
            ...data,
            ...cvData
        };

        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = allUsers.map((u: any) => (u.id === user.id ? updatedUser : u));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        toast({
          title: "Profil mis à jour !",
          description: "Vos informations ont été modifiées avec succès.",
        });

        setIsEditOpen(false);
        onProfileUpdate();
    }

    const cvFile = data.cvFile?.[0];
    if (cvFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const cvDataUri = e.target?.result as string;
            processUpdate({ cvDataUri, cvFileName: cvFile.name });
        };
        reader.readAsDataURL(cvFile);
    } else {
        processUpdate();
    }
  };


  return (
     <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier le profil
                        </Button>
                    </DialogTrigger>
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
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Modifier mon profil</DialogTitle>
            </DialogHeader>
            <EditCandidateForm user={user} onSubmit={handleProfileSubmit} />
        </DialogContent>
     </Dialog>
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

function SentMessageCard({ from, to, subject, message, date, messages = [], currentUserId }: { from: string, to: string, subject: string, message: string, date: string, messages: Message[], currentUserId: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-primary" />
                    {subject}
                </CardTitle>
                <CardDescription>
                    Conversation avec : {to} - Démarrée le {new Date(date).toLocaleDateString("fr-FR")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 p-4 bg-muted/50 rounded-md text-sm max-h-60 overflow-y-auto">
                    <div className="text-muted-foreground">
                        <p className="font-bold">Votre message initial :</p>
                        <p className="whitespace-pre-wrap">{message}</p>
                    </div>
                     {messages.map((msg, index) => (
                        <div key={index} className={`p-2 rounded-lg ${msg.senderId === currentUserId ? 'bg-primary/10 text-right' : 'bg-background'}`}>
                            <p className="text-xs text-muted-foreground">{msg.senderId === currentUserId ? 'Vous' : to}, le {new Date(msg.sentAt).toLocaleDateString('fr-FR')}</p>
                            <p>{msg.content}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const loadUserData = () => {
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    if (!signedIn) {
      router.push("/login"); return;
    }
    
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
       if (currentUser.role === 'employer') {
            router.push('/dashboard/employer'); return;
        }
      setUser(currentUser);
      
      const storedApplications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
      const myApplications = storedApplications.filter((app: any) => app.applicantId === currentUser.id);
      
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const employers = allUsers.filter((u: any) => u.role === 'employer');
      
      const applicationsWithEmployer = myApplications.map(app => {
          const employer = employers.find(e => e.id === app.job.employerId);
          return {
              ...app,
              job: {
                  ...app.job,
                  company: employer?.companyName || app.job.company,
              }
          };
      });

      setApplications(applicationsWithEmployer.reverse());
      
      const storedRegistrations = JSON.parse(localStorage.getItem("courseRegistrations") || "[]");
      const myRegistrations = storedRegistrations.filter((reg: any) => reg.applicantId === currentUser.id);
      setRegistrations(myRegistrations.reverse());

    } else {
        router.push("/login"); return;
    }
  }

  useEffect(() => {
    loadUserData();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    router.push("/");
    router.refresh(); 
  };
  
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        
        const updatedUser = { ...user, profilePicture: dataUri };
        
        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = allUsers.map((u: any) => (u.id === user.id ? updatedUser : u));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        setUser(updatedUser);
        
        toast({
          title: "Photo de profil mise à jour !",
        });
      };
      reader.readAsDataURL(file);
    }
  };


  if (!user) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">Chargement du profil...</div>;
  }

  const allSentMessages = [...applications, ...registrations].sort((a, b) => new Date((b as any).appliedAt || (b as any).registeredAt).getTime() - new Date((a as any).appliedAt || (a as any).registeredAt).getTime());


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
                 <Card className="w-full text-center p-6">
                    <div className="relative mx-auto mb-4 w-32 h-32">
                        <Image 
                            src={user.profilePicture || "/logo.png"}
                            alt="User profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-primary mx-auto object-cover w-32 h-32"
                        />
                         <Button size="icon" className="absolute bottom-0 right-0 rounded-full" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                            <Edit className="h-4 w-4" />
                         </Button>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif"
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
                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                     <div className="overflow-x-auto">
                        <TabsList className="grid w-full grid-cols-4 min-w-[400px]">
                            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profil</TabsTrigger>
                            <TabsTrigger value="applications"><Briefcase className="mr-2 h-4 w-4" />Candidatures</TabsTrigger>
                            <TabsTrigger value="courses"><GraduationCap className="mr-2 h-4 w-4" />Formations</TabsTrigger>
                            <TabsTrigger value="messages"><MessageSquare className="mr-2 h-4 w-4" />Messages</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="profile" className="mt-6">
                        <ProfileDetails user={user} onProfileUpdate={loadUserData} />
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
                                        from={`${user.firstName} ${user.lastName}`}
                                        to={app.job.company}
                                        subject={`Candidature: ${app.job.title}`}
                                        message={app.coverLetter}
                                        date={app.appliedAt}
                                        messages={app.messages || []}
                                        currentUserId={user.id}
                                    />
                                ))}
                                {registrations.map((reg, index) => (
                                    <SentMessageCard 
                                        key={`reg-msg-${index}`}
                                        from={`${user.firstName} ${user.lastName}`}
                                        to={reg.course.provider}
                                        subject={`Inscription: ${reg.course.title}`}
                                        message={reg.motivation}
                                        date={reg.registeredAt}
                                        messages={[]} // Assuming no messaging for courses for now
                                        currentUserId={user.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <PlaceholderContent 
                                title="Mes Messages Envoyés" 
                                description="Vos lettres de motivation et réponses apparaîtront ici."
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

    