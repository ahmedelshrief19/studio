'use client';

import { useState, useMemo, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function ChessGame() {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());
  const [status, setStatus] = useState('White to move');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    updateStatus();
  }, [fen]);

  function updateStatus() {
    if (game.isCheckmate()) {
      setStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`);
      setGameOver(true);
    } else if (game.isDraw()) {
      setStatus('Draw!');
      setGameOver(true);
    } else {
      setStatus(`${game.turn() === 'w' ? 'White' : 'Black'} to move`);
      if(game.isCheck()){
          setStatus(prev => prev + ' (in check)');
      }
    }
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    let move = null;
    try {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for simplicity
      });
    } catch (error) {
        return false;
    }
    
    // illegal move
    if (move === null) return false;

    setFen(game.fen());
    return true;
  }

  function handleRestart() {
    game.reset();
    setFen(game.fen());
    setGameOver(false);
    updateStatus();
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
       <Card className="w-full max-w-md mx-auto bg-card border-none shadow-none">
            <CardHeader className="text-center p-2">
                <CardTitle>Chess</CardTitle>
                <CardDescription className="text-lg font-semibold h-6">{status}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <Chessboard
                        position={fen}
                        onPieceDrop={onDrop}
                        boardWidth={Math.min(400, window.innerWidth - 60)}
                    />
                </div>
            </CardContent>
       </Card>
       {(gameOver) && (
        <Button onClick={handleRestart} className="mt-4">
          Play Again
        </Button>
      )}
    </div>
  );
}
