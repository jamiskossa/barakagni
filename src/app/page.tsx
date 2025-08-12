import { RecommendationEngine } from "@/components/recommendation-engine";
import { Lightbulb, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
          Trouvez Votre Voie en Guinée
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          BARA Connect vous aide à découvrir des opportunités d'emploi et des formations adaptées à vos compétences en Guinée.
          Dites à notre assistant IA ce que vous recherchez pour commencer.
        </p>
      </section>

      <section className="mt-12">
        <RecommendationEngine />
      </section>

      <section className="mt-20 text-center">
         <h2 className="font-headline text-3xl font-bold text-primary">Comment Ça Marche</h2>
         <div className="mt-8 grid gap-8 md:grid-cols-3">
           <Card className="text-center">
             <CardHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                 <Lightbulb className="h-6 w-6 text-accent" />
               </div>
               <CardTitle className="font-headline mt-4 text-xl">1. Décrivez Votre Objectif</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground/70">
                 Indiquez simplement le type d'emploi ou de compétence qui vous intéresse.
               </p>
             </CardContent>
           </Card>
           <Card className="text-center">
             <CardHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                 <Briefcase className="h-6 w-6 text-accent" />
               </div>
               <CardTitle className="font-headline mt-4 text-xl">2. Obtenez des Offres d'Emploi</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground/70">
                 Notre IA analyse votre demande et suggère des offres d'emploi pertinentes.
               </p>
             </CardContent>
           </Card>
           <Card className="text-center">
             <CardHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                 <GraduationCap className="h-6 w-6 text-accent" />
               </div>
               <CardTitle className="font-headline mt-4 text-xl">3. Trouvez des Formations</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground/70">
                 Découvrez des cours pour améliorer vos compétences et faire avancer votre carrière.
               </p>
             </CardContent>
           </Card>
         </div>
       </section>
    </div>
  );
}
