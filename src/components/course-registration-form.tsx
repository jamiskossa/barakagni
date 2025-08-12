"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  motivation: z.string().min(10, {
    message: "Votre message de motivation doit contenir au moins 10 caractères.",
  }),
  diplomaFile: z.any().optional(),
});

type CourseRegistrationFormProps = {
    onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export function CourseRegistrationForm({ onSubmit }: CourseRegistrationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivation: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message de motivation (facultatif)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Expliquez brièvement pourquoi vous souhaitez suivre cette formation."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diplomaFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joindre votre diplôme ou attestation (facultatif)</FormLabel>
              <FormControl>
                 <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    {...form.register("diplomaFile")}
                  />
              </FormControl>
               <p className="text-xs text-muted-foreground">Formats acceptés : PDF, DOC, JPG, PNG.</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="gradient">Envoyer ma demande d'inscription</Button>
      </form>
    </Form>
  );
}
