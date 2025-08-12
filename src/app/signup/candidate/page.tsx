"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères."),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  specialty: z.string().min(2, "La spécialité doit contenir au moins 2 caractères."),
  bio: z.string().min(10, "La biographie doit contenir au moins 10 caractères."),
  portfolioUrl: z.string().url("Veuillez entrer une URL valide.").optional().or(z.literal('')),
  cvFile: z.any()
    .refine((files) => files?.length <= 1, "Un seul fichier est autorisé.")
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5 Mo.`)
    .refine((files) => !files || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Formats de fichier acceptés : .pdf, .doc, .docx")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CandidateSignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      specialty: "",
      bio: "",
      portfolioUrl: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const cvFile = data.cvFile?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const cvDataUri = e.target?.result as string;

        const newUser = {
          id: `user_${Date.now()}`,
          role: "candidate",
          ...data,
          cvDataUri: cvFile ? cvDataUri : undefined,
          cvFileName: cvFile ? cvFile.name : undefined,
        };
        
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        toast({
          title: "Compte créé !",
          description: "Votre profil artisan a été créé avec succès.",
        });
        router.push("/profile");
    };

    if (cvFile) {
        reader.readAsDataURL(cvFile);
    } else {
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><Label>Prénom</Label><FormControl><Input placeholder="Ousmane" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem><Label>Nom</Label><FormControl><Input placeholder="Yattara" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                 <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><Label>Email</Label><FormControl><Input type="email" placeholder="ousmane@exemple.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                 <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem><Label>Mot de passe</Label><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                 <FormField control={form.control} name="specialty" render={({ field }) => (
                    <FormItem><Label>Spécialité / Métier</Label><FormControl><Input placeholder="Ex: Électricien, Menuisier" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                 <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem><Label>Biographie</Label><FormControl><Textarea placeholder="Décrivez votre expérience..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                <FormField control={form.control} name="portfolioUrl" render={({ field }) => (
                    <FormItem><Label>Lien Portfolio (facultatif)</Label><FormControl><Input placeholder="https://mon-portfolio.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                <FormField control={form.control} name="cvFile" render={({ field }) => (
                    <FormItem><Label>Téléverser votre CV</Label><FormControl><Input type="file" accept=".pdf,.doc,.docx" {...form.register("cvFile")} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" variant="gradient" size="lg">
                    Créer mon compte
                </Button>
              </form>
            </Form>
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
    