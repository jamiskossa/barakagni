"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CourseRegistrationForm } from "./course-registration-form";
import { z } from "zod";

export type CourseCardProps = {
  title: string;
  category: string;
  duration: string;
  certification: boolean;
  provider: string;
  imageUrl: string;
  dataAiHint?: string;
  hideRegisterButton?: boolean;
};

const formSchema = z.object({
  motivation: z.string().min(10, {
    message: "Votre message de motivation doit contenir au moins 10 caractères.",
  }),
  diplomaFile: z.any().optional(),
});

export function CourseCard({ title, category, duration, certification, provider, imageUrl, dataAiHint, hideRegisterButton = false }: CourseCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRegisterClick = () => {
    const isSignedIn = localStorage.getItem("isSignedIn") === "true";

    if (!isSignedIn) {
      router.push("/login");
    } else {
      setIsDialogOpen(true);
    }
  };
  
  const handleRegistrationSubmit = (formData: z.infer<typeof formSchema>) => {
    const diplomaFile = formData.diplomaFile?.[0];
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    const registrationData = {
        course: { title, category, duration, certification, provider, imageUrl, dataAiHint },
        applicantId: currentUser.id,
        motivation: formData.motivation,
        diplomaFileName: diplomaFile ? diplomaFile.name : "No file attached",
        registeredAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call.
    // We simulate by saving to localStorage.
    const registrations = JSON.parse(localStorage.getItem("courseRegistrations") || "[]");
    registrations.push(registrationData);
    localStorage.setItem("courseRegistrations", JSON.stringify(registrations));
    
    setIsDialogOpen(false);
    toast({
      title: "Inscription réussie !",
      description: `Votre demande d'inscription pour le cours "${title}" a été envoyée.`,
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
          <p className="text-sm text-muted-foreground mb-4">{provider}</p>
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            {certification && (
              <div className="flex items-center gap-2 text-accent font-medium">
                <Award className="h-4 w-4" />
                <span>Certification incluse</span>
              </div>
            )}
          </div>
        </CardContent>
        {!hideRegisterButton && (
            <CardFooter className="p-4 mt-auto">
               <DialogTrigger asChild>
                    <Button onClick={handleRegisterClick} className="w-full" variant="gradient">S'inscrire</Button>
               </DialogTrigger>
            </CardFooter>
        )}
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>S'inscrire à : {title}</DialogTitle>
        </DialogHeader>
        <CourseRegistrationForm onSubmit={handleRegistrationSubmit} />
      </DialogContent>
    </Dialog>
  );
}
