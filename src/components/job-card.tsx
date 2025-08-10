import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

type JobCardProps = {
  title: string;
  category: string;
  location: string;
  type: string;
  company: string;
  imageUrl: string;
  dataAiHint?: string;
};

export function JobCard({ title, category, location, type, company, imageUrl, dataAiHint }: JobCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="outline" className="mb-2">{category}</Badge>
        <CardTitle className="font-headline text-lg mb-2 leading-tight">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{company}</p>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
