"use client";

import { useEffect, useState } from 'react';
import { JobCard, type JobCardProps } from "@/components/job-card";

// Données initiales pour peupler le site la première fois.
const initialJobData = [
  {
    id: "job_1",
    employerId: "emp_1722020000001",
    title: "Électricien Agréé pour Projets Résidentiels",
    category: "Électricité",
    location: "Conakry, Guinée",
    type: "Temps plein",
    company: "Conakry Constructions Co.",
    imageUrl: "/logo.png",
    dataAiHint: "electrician working",
  },
  {
    id: "job_2",
    employerId: "emp_1722020000002",
    title: "Technicien en Plomberie",
    category: "Plomberie",
    location: "Kindia, Guinée",
    type: "Contrat",
    company: "Services des Eaux de Kindia",
    imageUrl: "/logo.png",
    dataAiHint: "plumber pipes",
  },
  {
    id: "job_3",
    employerId: "emp_1722020000001",
    title: "Spécialiste en Installation de CVC",
    category: "CVC",
    location: "Labé, Guinée",
    type: "Temps plein",
    company: "Fouta Climate Control",
    imageUrl: "/logo.png",
    dataAiHint: "hvac system",
  },
  {
    id: "job_4",
    employerId: "emp_1722020000002",
    title: "Menuisier pour la Fabrication de Meubles",
    category: "Menuiserie",
    location: "Nzérékoré, Guinée",
    type: "Temps partiel",
    company: "Forêt Fine Woods",
    imageUrl: "/logo.png",
    dataAiHint: "carpenter workshop",
  },
   {
    id: "job_5",
    employerId: "emp_1722020000002",
    title: "Maçon pour Fondations de Bâtiments",
    category: "Maçonnerie",
    location: "Kankan, Guinée",
    type: "Temps plein",
    company: "Groupe de Construction Mandingue",
    imageUrl: "/logo.png",
    dataAiHint: "masonry construction",
  },
  {
    id: "job_6",
    employerId: "emp_1722020000001",
    title: "Mécanicien Automobile",
    category: "Mécanique",
    location: "Boké, Guinée",
    type: "Temps plein",
    company: "Boké Auto Repair",
    imageUrl: "/logo.png",
    dataAiHint: "auto mechanic",
  },
];

export default function JobsPage() {
  const [jobData, setJobData] = useState<JobCardProps[]>([]);

  useEffect(() => {
    // Cette opération garantit que les données de démonstration sont là au premier chargement.
    if (localStorage.getItem("jobOffersInitialized") !== "true") {
      localStorage.setItem("jobOffers", JSON.stringify(initialJobData));
      localStorage.setItem("jobOffersInitialized", "true");
    }
    
    // On charge ensuite TOUTES les offres depuis le localStorage.
    // Cela inclut les offres initiales et celles ajoutées par les employeurs.
    const storedOffers = JSON.parse(localStorage.getItem("jobOffers") || "[]");
    setJobData(storedOffers.reverse()); // On inverse pour afficher les plus récentes en premier
  }, []);


  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Opportunités d'Emploi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          Découvrez les dernières offres d'emploi pour les artisans qualifiés en Guinée.
        </p>
      </section>
      <section className="mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {jobData.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </section>
    </div>
  );
}
