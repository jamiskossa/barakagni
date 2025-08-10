import { JobCard } from "@/components/job-card";

const jobData = [
  {
    title: "Licensed Electrician for Residential Projects",
    category: "Electricity",
    location: "Conakry, Guinea",
    type: "Full-time",
    company: "Conakry Constructions Co.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "electrician working",
  },
  {
    title: "Plumbing Technician",
    category: "Plumbing",
    location: "Dakar, Senegal",
    type: "Contract",
    company: "Dakar Water Services",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "plumber pipes",
  },
  {
    title: "HVAC Installation Specialist",
    category: "HVAC",
    location: "Abidjan, Côte d'Ivoire",
    type: "Full-time",
    company: "Ivoire Climate Control",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "hvac system",
  },
  {
    title: "Carpenter for Furniture Making",
    category: "Carpentry",
    location: "Lomé, Togo",
    type: "Part-time",
    company: "Togo Fine Woods",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "carpenter workshop",
  },
   {
    title: "Mason for Building Foundations",
    category: "Masonry",
    location: "Bamako, Mali",
    type: "Full-time",
    company: "Mali Building Group",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "masonry construction",
  },
  {
    title: "Automotive Mechanic",
    category: "Mechanics",
    location: "Ouagadougou, Burkina Faso",
    type: "Full-time",
    company: "Burkina Auto Repair",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "auto mechanic",
  },
];

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Job Opportunities
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          Explore the latest job openings for skilled artisans in West Africa.
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
