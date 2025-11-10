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

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gameComponent?: 'TicTacToe';
};

type GameCardProps = {
  project: Project;
};

const GameComponent = ({ name }: { name: Project['gameComponent'] }) => {
  if (name === 'TicTacToe') {
    return <TicTacToe />;
  }
  return null;
}

export function GameCard({ project }: GameCardProps) {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Play Game
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-max">
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
            </DialogHeader>
            {project.gameComponent && <GameComponent name={project.gameComponent} />}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
