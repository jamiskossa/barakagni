
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { keywordExtractionRecommendations, type JobRecommendation, type CourseRecommendation } from "@/ai/flows/keyword-extraction-recommendations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Briefcase, GraduationCap, Loader2, ServerCrash, ExternalLink } from "lucide-react";
import Link from "next/link";
import { JobCard } from "./job-card";
import { CourseCard } from "./course-card";
import type { JobCardProps } from "./job-card";
import type { CourseCardProps } from "./course-card";

type RecommendationState = {
  keywords?: string[];
  jobRecommendations?: JobRecommendation[];
  courseRecommendations?: CourseRecommendation[];
  error?: string;
} | null;

const initialState: RecommendationState = null;

// Mock data for initial load. In a real app, this would come from a database.
const initialJobData: JobCardProps[] = [
  { id: "job_1", employerId: "emp_1722020000001", title: "Électricien Agréé pour Projets Résidentiels", category: "Électricité", location: "Conakry, Guinée", type: "Temps plein", company: "Conakry Constructions Co.", imageUrl: "/logo.png", dataAiHint: "electrician working" },
  { id: "job_2", employerId: "emp_1722020000002", title: "Technicien en Plomberie", category: "Plomberie", location: "Kindia, Guinée", type: "Contrat", company: "Services des Eaux de Kindia", imageUrl: "/logo.png", dataAiHint: "plumber pipes" },
  { id: "job_3", employerId: "emp_1722020000001", title: "Spécialiste en Installation de CVC", category: "CVC", location: "Labé, Guinée", type: "Temps plein", company: "Fouta Climate Control", imageUrl: "/logo.png", dataAiHint: "hvac system" },
  { id: "job_4", employerId: "emp_1722020000002", title: "Menuisier pour la Fabrication de Meubles", category: "Menuiserie", location: "Nzérékoré, Guinée", type: "Temps partiel", company: "Forêt Fine Woods", imageUrl: "/logo.png", dataAiHint: "carpenter workshop" },
  { id: "job_5", employerId: "emp_1722020000002", title: "Maçon pour Fondations de Bâtiments", category: "Maçonnerie", location: "Kankan, Guinée", type: "Temps plein", company: "Groupe de Construction Mandingue", imageUrl: "/logo.png", dataAiHint: "masonry construction" },
  { id: "job_6", employerId: "emp_1722020000001", title: "Mécanicien Automobile", category: "Mécanique", location: "Boké, Guinée", type: "Temps plein", company: "Boké Auto Repair", imageUrl: "/logo.png", dataAiHint: "auto mechanic" },
];

const initialCourseData: CourseCardProps[] = [
    { title: "Câblage Électrique Avancé", category: "Électricité", duration: "6 semaines", certification: true, provider: "Institut Technique de Conakry", imageUrl: "/logo.png", dataAiHint: "electrical classroom" },
    { title: "Techniques Modernes de Plomberie", category: "Plomberie", duration: "4 semaines", certification: true, provider: "École Professionnelle de Kindia", imageUrl: "/logo.png", dataAiHint: "plumbing class" },
    { title: "Menuiserie et Ébénisterie Professionnelles", category: "Menuiserie", duration: "8 semaines", certification: true, provider: "Artisans de Guinée, Labé", imageUrl: "/logo.png", dataAiHint: "woodworking class" },
    { title: "Introduction à l'Installation de Panneaux Solaires", category: "Énergie renouvelable", duration: "3 semaines", certification: false, provider: "Académie Solaire de Boké", imageUrl: "/logo.png", dataAiHint: "solar panels" },
    { title: "Gestion de Petites Entreprises pour Artisans", category: "Entreprise", duration: "5 semaines", certification: true, provider: "École de Commerce de Conakry", imageUrl: "/logo.png", dataAiHint: "business meeting" },
    { title: "Bases de la Soudure et de la Fabrication Métallique", category: "Soudure", duration: "6 semaines", certification: true, provider: "Collège Technique de Kankan", imageUrl: "/logo.png", dataAiHint: "welding sparks" },
];


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto" variant="gradient">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Obtenir des Recommandations
    </Button>
  );
}

export function RecommendationEngine() {
  // Hold all available jobs and courses in state, loaded from localStorage or initial data
  const [availableJobs, setAvailableJobs] = useState<JobCardProps[]>([]);
  const [availableCourses, setAvailableCourses] = useState<CourseCardProps[]>(initialCourseData);

  useEffect(() => {
    // This effect runs on the client to load data from localStorage
    if (typeof window !== "undefined") {
      // Load jobs, and initialize if they don't exist
      const storedJobsRaw = localStorage.getItem("jobOffers");
      if (storedJobsRaw) {
          setAvailableJobs(JSON.parse(storedJobsRaw));
      } else {
          localStorage.setItem("jobOffers", JSON.stringify(initialJobData));
          setAvailableJobs(initialJobData);
      }
      
      // We can do the same for courses if they become dynamic later
    }
  }, []);

  const [state, formAction] = useActionState(
    async (
      prevState: RecommendationState,
      formData: FormData
    ): Promise<RecommendationState> => {
      const query = formData.get("query") as string;
      if (!query?.trim()) {
        return { error: "Veuillez saisir une demande pour obtenir des recommandations." };
      }
      try {
        const result = await keywordExtractionRecommendations({
          query,
          availableJobs,
          availableCourses,
        });

        if (!result.keywords?.length && !result.jobRecommendations?.length && !result.courseRecommendations?.length) {
          return { error: "Nous n'avons pas trouvé de recommandations spécifiques pour votre demande. Veuillez essayer de la reformuler." };
        }
        return result;
      } catch (error) {
        console.error(error);
        return { error: "Une erreur de l'IA est survenue. Veuillez réessayer plus tard." };
      }
    },
    initialState
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-2 border-primary/10">
      <CardContent className="p-6 md:p-8">
        <form action={formAction} className="space-y-4">
          <Textarea
            name="query"
            placeholder="Ex: 'Je cherche des missions d'électricité à Conakry' ou 'cours de plomberie de base'"
            className="min-h-[100px] text-base"
            required
          />
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>

        {state && (
          <div className="mt-8 space-y-8 animate-in fade-in duration-500">
            {state.error && (
              <Card className="bg-destructive/10 border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-destructive text-lg font-headline">
                    <ServerCrash className="mr-2 h-5 w-5" />
                    Désolé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{state.error}</p>
                </CardContent>
              </Card>
            )}

            {state.keywords && state.keywords.length > 0 && (
              <div>
                <h3 className="font-headline text-xl font-semibold text-primary mb-4">Mots-clés identifiés</h3>
                <div className="flex flex-wrap gap-2">
                  {state.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8">
              {state.jobRecommendations && state.jobRecommendations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline text-xl font-semibold text-primary flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Recommandations d'emploi
                    </h3>
                    <Button variant="link" asChild className="text-accent hover:text-accent/80">
                      <Link href="/jobs">
                        Voir toutes les offres <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {state.jobRecommendations.map((job, index) => (
                      <JobCard key={index} {...job} />
                    ))}
                  </div>
                </div>
              )}

              {state.courseRecommendations && state.courseRecommendations.length > 0 && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-headline text-xl font-semibold text-primary flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5" />
                        Recommandations de cours
                      </h3>
                       <Button variant="link" asChild className="text-accent hover:text-accent/80">
                        <Link href="/courses">
                          Voir tous les cours <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {state.courseRecommendations.map((course, index) => (
                          <CourseCard key={index} {...course} />
                        ))}
                    </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    