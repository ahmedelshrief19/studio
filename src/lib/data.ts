import type React from "react";
import { BrainCircuit, Code, Database, Server, BookOpen } from 'lucide-react';

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
    id: '4',
    title: 'Quran Program',
    description: 'An interactive program to read the Holy Quran and daily Adhkar (remembrances). Select a Surah to read, or browse through morning and evening Adhkar.',
    image: 'project-quran',
    tags: ['React', 'API', 'Islamic'],
    projectComponent: 'QuranPlayer',
  },
  {
    id: '1',
    title: 'Tic-Tac-Toe',
    description: 'A classic game of Tic-Tac-Toe. Challenge a friend and see who can get three in a row first. This simple game is built with React state management.',
    image: 'project1',
    tags: ['React', 'Game Logic', 'UI/UX'],
    projectComponent: 'TicTacToe',
  },
  {
    id: '2',
    title: 'Calculator',
    description: 'A fully functional calculator for basic arithmetic operations. Built with React, it handles state management for a smooth user experience.',
    image: 'project-calculator',
    tags: ['React', 'State Management', 'Utility'],
    projectComponent: 'Calculator',
  },
  {
    id: '3',
    title: 'Guess the Number',
    description: 'A fun game where you try to guess a secret number between 1 and 100. The game provides feedback to help you narrow down your guess.',
    image: 'project-guess-number',
    tags: ['React', 'Game Logic', 'Fun'],
    projectComponent: 'GuessTheNumber',
  },
];
