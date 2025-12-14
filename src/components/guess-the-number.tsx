'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

export function GuessTheNumber() {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('Guess a number between 1 and 100');
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    setSecretNumber(generateRandomNumber());
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setGuessCount(prev => prev + 1);

    if (numGuess === secretNumber) {
      setFeedback(`You got it in ${guessCount + 1} guesses!`);
      setGameOver(true);
    } else if (numGuess < secretNumber) {
      setFeedback('Too low! Try again.');
    } else {
      setFeedback('Too high! Try again.');
    }
    setGuess('');
  };

  const handleRestart = () => {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setFeedback('Guess a number between 1 and 100');
    setGuessCount(0);
    setGameOver(false);
  };
  
  const getFeedbackColor = () => {
    if (gameOver) return 'text-green-500';
    if (feedback.includes('low') || feedback.includes('high')) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card">
      <CardHeader>
        <CardTitle>Guess the Number!</CardTitle>
        <CardDescription>I'm thinking of a number between 1 and 100.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <p className={cn("text-lg font-semibold h-6", getFeedbackColor())}>
          {feedback}
        </p>
        {!gameOver ? (
          <form onSubmit={handleGuess} className="flex w-full items-center space-x-2">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Your guess"
              className="text-center text-lg"
              autoFocus
            />
            <Button type="submit">Guess</Button>
          </form>
        ) : (
          <Button onClick={handleRestart} className="mt-4">
            Play Again
          </Button>
        )}
        <p className="text-sm text-muted-foreground">
          Guesses: {guessCount}
        </