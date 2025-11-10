'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { SmoothScrollLink } from "./smooth-scroll-link";
import { getAboutMe } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const profileImages = PlaceHolderImages.filter(p => p.id.startsWith('ahmed-profile')).map(p => p.imageUrl);

export function Hero() {
  const [aboutMe, setAboutMe] = useState("I am an aspiring AI Engineer and Developer from Aswan, currently studying Computer Science and AI. I am passionate about building intelligent applications that solve real-world problems.");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const { toast } = useToast();

  const fetchAboutMe = useCallback(async () => {
    setIsGenerating(true);
    try {
      const result = await getAboutMe();
      if (result.success && result.aboutMe) {
        setAboutMe(result.aboutMe);
      } else {
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: result.error || "Could not generate a new bio.",
        });
      }
    } catch (e) {
       toast({
            variant: "destructive",
            title: "Generation Failed",
            description: "An unexpected error occurred.",
        });
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAboutMe();
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [fetchAboutMe]);

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
        <p className="text-lg md:text-xl text-muted-foreground mb-8 min-h-[112px]">
          {isGenerating && !aboutMe ? 'Generating bio...' : aboutMe}
        </p>
        <div className="flex justify-center md:justify-start gap-4">
            <Button size="lg" asChild>
                <SmoothScrollLink href="#projects">
                    View My Work <ArrowRight className="ml-2 h-5 w-5"/>
                </SmoothScrollLink>
            </Button>
             <Button size="lg" variant="outline" onClick={fetchAboutMe} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Sparkles className="mr-2 h-5 w-5"/>}
                Generate New Bio
            </Button>
        </div>
      </div>
    </section>
  );
}
