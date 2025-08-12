import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="BARA Logo" width={80} height={80} />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          À Propos de BARA
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
          Votre passerelle vers les opportunités d'emploi et de formation pour les artisans en Guinée.
        </p>
      </section>

      <section className="mt-16 text-lg">
        <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
                <p>
                BARA est une plateforme innovante dédiée à la mise en relation des artisans qualifiés de Guinée avec des opportunités d'emploi et de formation. Notre mission est de réduire le chômage et de valoriser les compétences locales en créant un pont direct entre les talents et les entreprises qui recrutent.
                </p>
                <p className="mt-4">
                Que vous soyez un électricien, un plombier, un menuisier ou un mécanicien, BARA vous offre une visibilité exceptionnelle auprès des employeurs potentiels et vous propose des formations ciblées pour enrichir votre savoir-faire.
                </p>
            </CardContent>
        </Card>
      </section>

      <section className="mt-16 text-center">
        <h2 className="font-headline text-3xl font-bold text-primary">Notre Vision</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="font-headline mt-4 text-xl">Connecter les Talents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Faciliter la rencontre entre les artisans et les employeurs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="font-headline mt-4 text-xl">Créer des Opportunités</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Ouvrir les portes du marché du travail guinéen aux professionnels qualifiés.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="font-headline mt-4 text-xl">Renforcer les Compétences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Proposer des formations pour une montée en compétence continue.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
