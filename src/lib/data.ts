import type React from "react";
import { BrainCircuit, Code, Database, Server } from 'lucide-react';

export const skills = [
  { name: 'Python', level: 90, icon: BrainCircuit },
  { name: 'JavaScript / TypeScript', level: 85, icon: Code },
  { name: 'React / Next.js', level: 80, icon: Code },
  { name: 'PyTorch / TensorFlow', level: 75, icon: BrainCircuit },
  { name: 'SQL / NoSQL', level: 85, icon: Database },
  { name: 'Docker', level: 70, icon: Server },
];

export const projects = [
  {
    id: '1',
    title: 'AI-Powered Financial Advisor',
    description: 'A web application that uses machine learning to provide personalized financial advice. It analyzes user spending habits and market trends to suggest investment strategies. The project involved building a predictive model and a user-friendly interface.',
    image: 'project1',
    tags: ['Next.js', 'Python', 'PyTorch', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'Nubian Heritage Mobile Guide',
    description: 'A mobile app that serves as an interactive guide to Aswan\'s Nubian heritage. It features historical information, 3D models of artifacts, and a location-based tour guide. The goal was to preserve and promote local culture through technology.',
    image: 'project2',
    tags: ['React Native', 'Firebase', 'Three.js'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Code Review Automation Tool',
    description: 'A developer tool that integrates with GitHub to automatically review pull requests for common errors and style inconsistencies. It uses a custom-trained language model to understand code context and provide meaningful suggestions, improving code quality and team productivity.',
    image: 'project3',
    tags: ['Node.js', 'TypeScript', 'GitHub API', 'LLM'],
    liveUrl: '#',
    githubUrl: '#',
  },
];
