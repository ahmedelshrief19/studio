'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SmoothScrollLink } from "./smooth-scroll-link";

const profileImage = "https://scontent.faly8-2.fna.fbcdn.net/v/t39.30808-6/480531708_1614012409231369_2408768213142273047_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeGmNd-kM_hGVX-JXz08-DtjGgzdsYvO6OsaDN2xi87o6ydzQpA6s63A5up_VKRUSPkXiph8TQQyJCbNjamPdD5F&_nc_ohc=QTMKcak7yeoQ7kNvwGpfZIb&_nc_oc=Adnog0ARzsmfQg6Hxnp-DLXq7End76McwhG6MCxbco2lNzGqGe86m8ydoXsZhHFGJKw&_nc_zt=23&_nc_ht=scontent.faly8-2.fna&_nc_gid=AdyLRQditI-I5WRqhfvxTQ&oh=00_AfnP9H4Rjle4WB9etkuvnBeKssX6vfraNPRDcVY8FtXqHA&oe=69425E68";

export function Hero() {
  return (
    <section id="about" className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-20 md:py-32 min-h-[calc(100vh-56px)]">
      <div className="flex-shrink-0">
        <Avatar className="h-64 w-64 md:h-80 md:w-80 border-4 border-accent shadow-lg">
          <AvatarImage src={profileImage} alt="Profile Picture" />
          <AvatarFallback className="text-6xl font-headline bg-primary text-primary-foreground">AE</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full max-w-2xl text-center md:text-left">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Aspiring AI Engineer & Developer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          I am an aspiring AI Engineer and Developer from Aswan, currently studying Computer Science and AI. I am passionate about building intelligent applications that solve real-world problems.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
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