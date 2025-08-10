import { CourseCard } from "@/components/course-card";

const courseData = [
  {
    title: "Câblage Électrique Avancé",
    category: "Électricité",
    duration: "6 semaines",
    certification: true,
    provider: "Institut Technique de l'Afrique de l'Ouest",
    imageUrl: "/logo.png",
    dataAiHint: "electrical classroom",
  },
  {
    title: "Techniques Modernes de Plomberie",
    category: "Plomberie",
    duration: "4 semaines",
    certification: true,
    provider: "École Professionnelle de Dakar",
    imageUrl: "/logo.png",
    dataAiHint: "plumbing class",
  },
  {
    title: "Menuiserie et Ébénisterie Professionnelles",
    category: "Menuiserie",
    duration: "8 semaines",
    certification: true,
    provider: "Guilde des Artisans d'Abidjan",
    imageUrl: "/logo.png",
    dataAiHint: "woodworking class",
  },
  {
    title: "Introduction à l'Installation de Panneaux Solaires",
    category: "Énergie renouvelable",
    duration: "3 semaines",
    certification: false,
    provider: "Académie Solaire du Sahel",
    imageUrl: "/logo.png",
    dataAiHint: "solar panels",
  },
   {
    title: "Gestion de Petites Entreprises pour Artisans",
    category: "Entreprise",
    duration: "5 semaines",
    certification: true,
    provider: "École de Commerce de la CEDEAO",
    imageUrl: "/logo.png",
    dataAiHint: "business meeting",
  },
  {
    title: "Bases de la Soudure et de la Fabrication Métallique",
    category: "Soudure",
    duration: "6 semaines",
    certification: true,
    provider: "Collège Technique de Lomé",
    imageUrl: "/logo.png",
    dataAiHint: "welding sparks",
  },
];


export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Formations
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          Améliorez vos compétences avec notre liste de cours professionnels.
        </p>
      </section>
      <section className="mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courseData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}
