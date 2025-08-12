
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export const editCandidateSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères."),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  specialty: z.string().min(2, "La spécialité doit contenir au moins 2 caractères."),
  bio: z.string().min(10, "La biographie doit contenir au moins 10 caractères."),
  portfolioUrl: z.string().url("Veuillez entrer une URL valide.").optional().or(z.literal('')),
  cvFile: z.any()
    .refine((files) => files?.length <= 1, "Un seul fichier est autorisé.")
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5 Mo.`)
    .refine((files) => !files || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Formats de fichier acceptés : .pdf, .doc, .docx")
    .optional(),
});


type EditCandidateFormProps = {
    user: {
        firstName?: string;
        lastName?: string;
        specialty?: string;
        bio?: string;
        portfolioUrl?: string;
    };
    onSubmit: (data: z.infer<typeof editCandidateSchema>) => void;
};

export function EditCandidateForm({ user, onSubmit }: EditCandidateFormProps) {
  const form = useForm<z.infer<typeof editCandidateSchema>>({
    resolver: zodResolver(editCandidateSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      specialty: user.specialty || "",
      bio: user.bio || "",
      portfolioUrl: user.portfolioUrl || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                    <Input placeholder="Ousmane" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                    <Input placeholder="Yattara" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spécialité / Métier</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Électricien, Menuisier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biographie</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre expérience..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="portfolioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien Portfolio (facultatif)</FormLabel>
              <FormControl>
                <Input placeholder="https://mon-portfolio.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="cvFile" render={({ field }) => (
            <FormItem>
                <FormLabel>Mettre à jour le CV (facultatif)</FormLabel>
                <FormControl><Input type="file" accept=".pdf,.doc,.docx" {...form.register("cvFile")} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <Button type="submit" className="w-full" variant="gradient">Enregistrer les modifications</Button>
      </form>
    </Form>
  );
}

    