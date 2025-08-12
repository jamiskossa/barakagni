"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  coverLetter: z.string().min(10, {
    message: "Votre lettre de motivation doit contenir au moins 10 caractères.",
  }),
});

type ApplicationFormProps = {
    onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverLetter: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lettre de motivation</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Rédigez un court message pour l'employeur expliquant pourquoi vous êtes le bon candidat."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="gradient">Envoyer ma candidature</Button>
      </form>
    </Form>
  );
}
