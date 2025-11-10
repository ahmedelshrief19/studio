'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SmoothScrollLink } from "./smooth-scroll-link";

const profileImages = PlaceHolderImages.filter(p => p.id.startsWith('ahmed-profile')).map(p => p.imageUrl);

export function Hero() {
  const [aboutMe, setAboutMe] = useState("I am an aspiring AI Engineer and Developer from Aswan, currently studying Computer Science and AI. I am passionate about building intelligent applications that solve real-world problems.");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-20 md:py-32 min-h-[calc(100vh-56px)]">
      <div className="flex-shrink-0">
        <Avatar className="h-64 w-64 md:h-80 md:w-80 border-4 border-accent shadow-lg">
          <AvatarImage src={profileImages[currentImageIndex]} alt="Profile Picture" />
          <AvatarFallback className="text-6xl font-headline bg-primary text-primary-foreground">AE</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full max-w-2xl text-center md:text-left">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Aspiring AI Engineer & Developer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          {aboutMe}
        </p>
        <div className="flex justify-center md:justify-start">
            <Button size="lg" asChild>
                <SmoothScrollLink href="#projects">
                    View My Work <ArrowRight className="ml-2 h-5 w-5"/>
                </SmoothScrollLink>
            </Button>
        </div>
      </div>
    </section>
  );
}
