"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ApplicationForm } from "./application-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";

export type JobCardProps = {
  id: string;
  employerId: string;
  title: string;
  category: string;
  location: string;
  type: string;
  company: string;
  imageUrl: string;
  dataAiHint?: string;
  hideApplyButton?: boolean;
};

const formSchema = z.object({
  coverLetter: z.string().min(10, {
    message: "Votre lettre de motivation doit contenir au moins 10 caractères.",
  }),
   cvFile: z.any().optional(),
});


export function JobCard({ id, employerId, title, category, location, type, company, imageUrl, dataAiHint, hideApplyButton = false }: JobCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApplyClick = () => {
    const isSignedIn = localStorage.getItem("isSignedIn") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    if (!isSignedIn) {
      router.push("/login");
    } else if (currentUser.role === 'employer') {
        toast({
            title: "Action non autorisée",
            description: "Les employeurs ne peuvent pas postuler à des offres.",
            variant: "destructive"
        })
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleApplicationSubmit = (formData: z.infer<typeof formSchema>) => {
    const cvFile = formData.cvFile?.[0];
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const applicationData = {
        job: { id, employerId, title, category, location, type, company, imageUrl, dataAiHint },
        applicantId: currentUser.id,
        coverLetter: formData.coverLetter,
        cvFileName: cvFile ? cvFile.name : "Using profile CV",
        appliedAt: new Date().toISOString(),
    };
    
    // In a real app, this would be an API call.
    // We simulate by saving to localStorage.
    const applications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    applications.push(applicationData);
    localStorage.setItem("jobApplications", JSON.stringify(applications));
    
    setIsDialogOpen(false);
    toast({
      title: "Candidature envoyée !",
      description: `Votre candidature pour le poste de ${title} a bien été prise en compte.`,
      variant: "default",
    });
     router.refresh();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full bg-muted flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={title}
              width={150}
              height={150}
              className="object-contain"
              data-ai-hint={dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{category}</Badge>
          <CardTitle className="font-headline text-lg mb-2 leading-tight">{title}</CardTitle>
          <p className="text-sm text-muted-foreground mb-4">{company}</p>
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{type}</span>
            </div>
          </div>
        </CardContent>
        {!hideApplyButton && (
            <CardFooter className="p-4 mt-auto">
              <DialogTrigger asChild>
                <Button onClick={handleApplyClick} className="w-full" variant="gradient">Postuler</Button>
              </DialogTrigger>
            </CardFooter>
        )}
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Postuler pour : {title}</DialogTitle>
        </DialogHeader>
        <ApplicationForm onSubmit={handleApplicationSubmit} />
      </DialogContent>
    </Dialog>
  );
}
