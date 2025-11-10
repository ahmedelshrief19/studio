'use client';

import { getProjectSummary } from '@/app/actions';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const projectImage = PlaceHolderImages.find((img) => img.id === project.image);

  const handleSummarize = async () => {
    // If summary is already loaded, don't re-fetch
    if (summary) return;

    setIsLoading(true);
    setError('');
    const result = await getProjectSummary(project.description);
    if (result.success) {
      setSummary(result.summary!);
    } else {
      setError(result.error!);
    }
    setIsLoading(false);
  };

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
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex space-x-2">
            <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={handleSummarize}>
                <Sparkles className="mr-2 h-4 w-4" />
                AI Summary
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>AI Project Summary</DialogTitle>
                </DialogHeader>
                {isLoading && <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>}
                {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                {summary && <DialogDescription className="text-base">{summary}</DialogDescription>}
            </DialogContent>
            </Dialog>
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                <Github />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live project link">
                <ExternalLink />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
