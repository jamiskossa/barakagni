
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  companyName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères."),
  sector: z.string().min(2, "Le secteur d'activité est requis."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  website: z.string().url("Veuillez entrer une URL valide.").optional().or(z.literal('')),
});

type EditEmployerFormProps = {
    user: {
        companyName?: string;
        sector?: string;
        description?: string;
        website?: string;
    };
    onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export function EditEmployerForm({ user, onSubmit }: EditEmployerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: user.companyName || "",
      sector: user.sector || "",
      description: user.description || "",
      website: user.website || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Guinée Construction SARL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secteur d'activité</FormLabel>
              <FormControl>
                <Input placeholder="BTP, Énergie, Services..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de l'entreprise</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre entreprise et votre mission."
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
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Web (facultatif)</FormLabel>
              <FormControl>
                <Input placeholder="https://votre-entreprise.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="gradient">Enregistrer les modifications</Button>
      </form>
    </Form>
  );
}
