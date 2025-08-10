import { JobCard } from "@/components/job-card";

const jobData = [
  {
    title: "Électricien Agréé pour Projets Résidentiels",
    category: "Électricité",
    location: "Conakry, Guinée",
    type: "Temps plein",
    company: "Conakry Constructions Co.",
    imageUrl: "/logo.png",
    dataAiHint: "electrician working",
  },
  {
    title: "Technicien en Plomberie",
    category: "Plomberie",
    location: "Dakar, Sénégal",
    type: "Contrat",
    company: "Services des Eaux de Dakar",
    imageUrl: "/logo.png",
    dataAiHint: "plumber pipes",
  },
  {
    title: "Spécialiste en Installation de CVC",
    category: "CVC",
    location: "Abidjan, Côte d'Ivoire",
    type: "Temps plein",
    company: "Ivoire Climate Control",
    imageUrl: "/logo.png",
    dataAiHint: "hvac system",
  },
  {
    title: "Menuisier pour la Fabrication de Meubles",
    category: "Menuiserie",
    location: "Lomé, Togo",
    type: "Temps partiel",
    company: "Togo Fine Woods",
    imageUrl: "/logo.png",
    dataAiHint: "carpenter workshop",
  },
   {
    title: "Maçon pour Fondations de Bâtiments",
    category: "Maçonnerie",
    location: "Bamako, Mali",
    type: "Temps plein",
    company: "Groupe de Construction du Mali",
    imageUrl: "/logo.png",
    dataAiHint: "masonry construction",
  },
  {
    title: "Mécanicien Automobile",
    category: "Mécanique",
    location: "Ouagadougou, Burkina Faso",
    type: "Temps plein",
    company: "Burkina Auto Repair",
    imageUrl: "/logo.png",
    dataAiHint: "auto mechanic",
  },
];

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Opportunités d'Emploi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          Découvrez les dernières offres d'emploi pour les artisans qualifiés en Afrique de l'Ouest.
        </p>
      </section>
      <section className="mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {jobData.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </section>
    </div>
  );
}
