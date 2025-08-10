"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { keywordExtractionRecommendations } from "@/ai/flows/keyword-extraction-recommendations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Briefcase, GraduationCap, Loader2, ServerCrash, ExternalLink } from "lucide-react";
import Link from "next/link";

type RecommendationState = {
  keywords?: string[];
  jobRecommendations?: string[];
  courseRecommendations?: string[];
  error?: string;
} | null;

const initialState: RecommendationState = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Get Recommendations
    </Button>
  );
}

export function RecommendationEngine() {
  const [state, formAction] = useActionState(
    async (
      prevState: RecommendationState,
      formData: FormData
    ): Promise<RecommendationState> => {
      const query = formData.get("query") as string;
      if (!query?.trim()) {
        return { error: "Please enter a query to get recommendations." };
      }
      try {
        const result = await keywordExtractionRecommendations({ query });
        if (!result.keywords?.length && !result.jobRecommendations?.length && !result.courseRecommendations?.length) {
          return { error: "We couldn't find specific recommendations for your query. Please try rephrasing it." };
        }
        return result;
      } catch (error) {
        console.error(error);
        return { error: "An AI error occurred. Please try again later." };
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
            placeholder="e.g., 'Je cherche des missions d'électricité à Conakry' or 'basic plumbing courses'"
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
                    Apologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{state.error}</p>
                </CardContent>
              </Card>
            )}

            {state.keywords && state.keywords.length > 0 && (
              <div>
                <h3 className="font-headline text-xl font-semibold text-primary mb-4">Identified Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {state.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-8 md:grid-cols-2">
              {state.jobRecommendations && state.jobRecommendations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-semibold text-primary flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Job Recommendations
                  </h3>
                  <ul className="space-y-3 pl-1">
                    {state.jobRecommendations.map((job, index) => (
                      <li key={index} className="flex items-start">
                        <Briefcase className="h-4 w-4 mr-3 mt-1 text-accent flex-shrink-0" />
                        <span>{job}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" asChild className="text-accent hover:text-accent/80">
                    <Link href="/jobs">
                      View all jobs <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}

              {state.courseRecommendations && state.courseRecommendations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-semibold text-primary flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Course Recommendations
                  </h3>
                  <ul className="space-y-3 pl-1">
                    {state.courseRecommendations.map((course, index) => (
                      <li key={index} className="flex items-start">
                         <GraduationCap className="h-4 w-4 mr-3 mt-1 text-accent flex-shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                   <Button variant="link" asChild className="text-accent hover:text-accent/80">
                    <Link href="/courses">
                      View all courses <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
