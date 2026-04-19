'use client';

import { skills } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Skills() {
  return (
    <section id="skills" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          Technical Skills
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TooltipProvider>
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <Card key={skill.name} className="bg-background/50 hover:border-accent transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">{skill.name}</h3>
                      <div className="w-full">
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Progress value={skill.level} className="h-2 [&>div]:bg-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{skill.level}% Proficient</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}