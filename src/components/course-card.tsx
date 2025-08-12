"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type CourseCardProps = {
  title: string;
  category: string;
  duration: string;
  certification: boolean;
  provider: string;
  imageUrl: string;
  dataAiHint?: string;
};

export function CourseCard({ title, category, duration, certification, provider, imageUrl, dataAiHint }: CourseCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = () => {
    if (localStorage.getItem("isSignedIn") !== "true") {
      router.push("/login");
    } else {
      toast({
        title: "Inscription réussie !",
        description: `Vous avez été inscrit au cours : ${title}`,
        variant: "default",
      });
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={title}
            width={150}
            height={150}
            className="object-contain"
            data-ai-hint={dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{category}</Badge>
        <CardTitle className="font-headline text-lg mb-2 leading-tight">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{provider}</p>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          {certification && (
            <div className="flex items-center gap-2 text-accent font-medium">
              <Award className="h-4 w-4" />
              <span>Certification incluse</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Button onClick={handleRegister} className="w-full" variant="gradient">S'inscrire</Button>
      </CardFooter>
    </Card>
  );
}
