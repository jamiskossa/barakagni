
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Redirect to login if not signed in
    if (localStorage.getItem("isSignedIn") !== "true") {
      router.push("/login");
      return;
    }
    
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("currentUser");
    router.push("/");
    router.refresh();
  };

  if (!user) {
    // You can show a loading spinner here
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
              <Image 
                src="/logo.png" 
                alt="User profile"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary"
              />
          </div>
          <CardTitle className="text-2xl font-headline">{user.firstName} {user.lastName}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignOut} className="w-full" variant="gradient">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
