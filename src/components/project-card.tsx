'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import { TicTacToe } from './tic-tac-toe';
import { Calculator } from './calculator';
import { GuessTheNumber } from './guess-the-number';
import { QuranPlayer } from './quran-player';
import { ChessGame } from './chess-game';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  projectComponent?: 'TicTacToe' | 'Calculator' | 'GuessTheNumber' | 'QuranPlayer' | 'ChessGame';
};

type ProjectCardProps = {
  project: Project;
};

const ProjectComponent = ({ name }: { name: Project['projectComponent'] }) => {
  if (name === 'TicTacToe') {
    return <TicTacToe />;
  }
  if (name === 'Calculator') {
    return <Calculator />;
  }
  if (name === 'GuessTheNumber') {
    return <GuessTheNumber />;
  }
  if (name === 'QuranPlayer') {
    return <QuranPlayer />;
  }
  if (name === 'ChessGame') {
    return <ChessGame />;
  }
  return null;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectImage = PlaceHolderImages.find((img) => img.id === project.image);

  return (
    <Card className="flex flex-col overflow-hidden h-full bg-secondary/50 hover:border-accent transition-colors">
      <div className="relative aspect-video w-full">
        {projectImage && (
          <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={projectImage.imageHint}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-accent text-accent">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{project.description}</CardDescription>
      </CardContent>
      <CardFooter>
        {project.projectComponent && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Launch Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-max">
              <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
              </DialogHeader>
              <ProjectComponent name={project.projectComponent} />
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
