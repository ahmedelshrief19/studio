'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type Player = 'X' | 'O';
type SquareValue = Player | null;

const Square = ({ value, onClick }: { value: SquareValue; onClick: () => void }) => (
  <button
    className={cn(
        "flex h-20 w-20 items-center justify-center border border-primary text-4xl font-bold transition-colors md:h-24 md:w-24",
        value === 'X' ? 'text-accent' : 'text-primary-foreground',
        "hover:bg-secondary/50"
    )}
    onClick={onClick}
  >
    {value}
  </button>
);

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export function TicTacToe() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i: number) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-xl font-semibold text-foreground">{status}</div>
      <div className="grid grid-cols-3 grid-rows-3 bg-card">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {(winner || isDraw) && (
        <Button onClick={handleRestart} className="mt-4">
          Play Again
        </Button>
      )}
    </div>
  );
}