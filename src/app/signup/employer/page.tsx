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

const formSchema = z.object({
  companyName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  sector: z.string().min(2, "Le secteur d'activité est requis."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  website: z.string().url("Veuillez entrer une URL valide.").optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmployerSignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      sector: "",
      description: "",
      website: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newUser = {
      id: `emp_${Date.now()}`,
      role: "employer",
      ...data,
    };
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast({
      title: "Compte Employeur Créé !",
      description: `Bienvenue, ${data.companyName}.`,
    });
    router.push("/dashboard/employer");
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-headline">Créez Votre Compte Employeur</CardTitle>
              <CardDescription>
                Rejoignez BARA pour trouver les meilleurs talents en Guinée.
              </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem><Label>Nom de l'entreprise</Label><FormControl><Input placeholder="Guinée Construction SARL" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><Label>Email de contact</Label><FormControl><Input type="email" placeholder="contact@exemple.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><Label>Mot de passe</Label><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="sector" render={({ field }) => (
                  <FormItem><Label>Secteur d'activité</Label><FormControl><Input placeholder="BTP, Énergie, Services..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><Label>Description de l'entreprise</Label><FormControl><Textarea placeholder="Décrivez votre entreprise et votre mission." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="website" render={({ field }) => (
                  <FormItem><Label>Site Web (facultatif)</Label><FormControl><Input placeholder="https://votre-entreprise.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" variant="gradient" size="lg">
                    Créer le compte employeur
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
    