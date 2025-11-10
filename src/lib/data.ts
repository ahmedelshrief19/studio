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
    title: 'Tic-Tac-Toe',
    description: 'A classic game of Tic-Tac-Toe. Challenge a friend and see who can get three in a row first. This simple game is built with React state management.',
    image: 'project1',
    tags: ['React', 'Game Logic', 'UI/UX'],
    gameComponent: 'TicTacToe',
  },
];
