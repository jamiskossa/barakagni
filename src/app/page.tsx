import { RecommendationEngine } from "@/components/recommendation-engine";
import { Lightbulb, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
          Find Your Path in West Africa
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          BARA Connect helps you discover job opportunities and training courses tailored to your skills.
          Tell our AI assistant what you're looking for to get started.
        </p>
      </section>

      <section className="mt-12">
        <RecommendationEngine />
      </section>

      <section className="mt-20 text-center">
         <h2 className="font-headline text-3xl font-bold text-primary">How It Works</h2>
         <div className="mt-8 grid gap-8 md:grid-cols-3">
           <Card className="text-center">
             <CardHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                 <Lightbulb className="h-6 w-6 text-accent" />
               </div>
               <CardTitle className="font-headline mt-4 text-xl">1. Describe Your Goal</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground/70">
                 Simply type what kind of job or skill you're interested in.
               </p>
             </CardContent>
           </Card>
           <Card className="text-center">
             <CardHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                 <Briefcase className="h-6 w-6 text-accent" />
               </div>
               <CardTitle className="font-headline mt-4 text-xl">2. Get Job Matches</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground/70">
                 Our AI analyzes your query and suggests relevant job openings.
               </p>
             </CardContent>
           </Card>
           <Card className="text-center">
             <CardHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                 <GraduationCap className="h-6 w-6 text-accent" />
               </div>
               <CardTitle className="font-headline mt-4 text-xl">3. Find Training</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground/70">
                 Discover courses to level-up your skills and boost your career.
               </p>
             </CardContent>
           </Card>
         </div>
       </section>
    </div>
  );
}
