import { CourseCard } from "@/components/course-card";

const courseData = [
  {
    title: "Advanced Electrical Wiring",
    category: "Electricity",
    duration: "6 Weeks",
    certification: true,
    provider: "West Africa Technical Institute",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "electrical classroom",
  },
  {
    title: "Modern Plumbing Techniques",
    category: "Plumbing",
    duration: "4 Weeks",
    certification: true,
    provider: "Dakar Vocational School",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "plumbing class",
  },
  {
    title: "Professional Carpentry & Woodworking",
    category: "Carpentry",
    duration: "8 Weeks",
    certification: true,
    provider: "Abidjan Craftsmen Guild",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "woodworking class",
  },
  {
    title: "Introduction to Solar Panel Installation",
    category: "Renewable Energy",
    duration: "3 Weeks",
    certification: false,
    provider: "Sahel Solar Academy",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "solar panels",
  },
   {
    title: "Small Business Management for Artisans",
    category: "Business",
    duration: "5 Weeks",
    certification: true,
    provider: "ECOWAS Business School",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "business meeting",
  },
  {
    title: "Welding and Metal Fabrication Basics",
    category: "Welding",
    duration: "6 Weeks",
    certification: true,
    provider: "Lomé Technical College",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "welding sparks",
  },
];


export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Training Courses
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          Enhance your skills with our curated list of vocational courses.
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
