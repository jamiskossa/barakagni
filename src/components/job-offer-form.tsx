"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères." }),
  category: z.string().min(2, { message: "La catégorie est requise." }),
  location: z.string().min(2, { message: "Le lieu est requis." }),
  type: z.string().min(2, { message: "Le type de contrat est requis." }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
});

type JobOfferFormProps = {
    onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export function JobOfferForm({ onSubmit }: JobOfferFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      location: "Conakry, Guinée",
      type: "Temps plein",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du poste</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Électricien en bâtiment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Électricité" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Conakry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de contrat</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Temps plein, Contrat" {...field} />
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
              <FormLabel>Description du poste</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez les missions, les compétences requises, etc."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="gradient">Publier l'offre</Button>
      </form>
    </Form>
  );
}
