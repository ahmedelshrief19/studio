'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      const resultString = String(parseFloat(result.toPrecision(15)));
      setDisplay(resultString);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      const resultString = String(parseFloat(result.toPrecision(15)));
      setDisplay(resultString);
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return first / second;
      default: return second;
    }
  };

  const buttons = [
    { label: 'AC', handler: clearDisplay, className: 'col-span-2 bg-muted hover:bg-muted/80' },
    { label: 'C', handler: clearDisplay, className: 'bg-muted hover:bg-muted/80' },
    { label: '/', handler: () => performOperation('/'), className: 'bg-primary hover:bg-primary/90' },

    { label: '7', handler: () => inputDigit('7') },
    { label: '8', handler: () => inputDigit('8') },
    { label: '9', handler: () => inputDigit('9') },
    { label: '*', handler: () => performOperation('*'), className: 'bg-primary hover:bg-primary/90' },

    { label: '4', handler: () => inputDigit('4') },
    { label: '5', handler: () => inputDigit('5') },
    { label: '6', handler: () => inputDigit('6') },
    { label: '-', handler: () => performOperation('-'), className: 'bg-primary hover:bg-primary/90' },

    { label: '1', handler: () => inputDigit('1') },
    { label: '2', handler: () => inputDigit('2') },
    { label: '3', handler: () => inputDigit('3') },
    { label: '+', handler: () => performOperation('+'), className: 'bg-primary hover:bg-primary/90' },
    
    { label: '0', handler: () => inputDigit('0'), className: 'col-span-2' },
    { label: '.', handler: inputDecimal },
    { label: '=', handler: handleEquals, className: 'bg-primary hover:bg-primary/90' },
  ];

  return (
    <Card className="w-full max-w-xs mx-auto bg-card border-2 border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="bg-background text-foreground text-right text-4xl font-mono p-4 mb-4 rounded-md overflow-x-auto">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
             <Button
                key={btn.label}
                onClick={btn.handler}
                className={cn(
                    "text-2xl h-16 w-full",
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    btn.className
                )}
                variant="default"
              >
                {btn.label}
              </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
