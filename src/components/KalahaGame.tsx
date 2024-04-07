"use client"

import { alphaBeta, cloneGame, createGame, getPossibleMoves, makeMove, simulateMove } from '@/modules/game';
import { Pit } from '@/modules/pit';
import { useEffect, useState } from 'react';

const KalahaGame = () => {
  const [game, setGame] = useState(() => createGame());
  const { pits } = game;


  const handlePitClick = (pit: Pit) => {
    makeMove(game, setGame, pit);
    // setGame(game => ({...game, pits: [...game.pits]}));
  };

  console.log("Currentplayer: ", game.currentPlayer)

  const handleComputerMove = () => {
    if (game.currentPlayer === 2) { //Player 2 is the computer
      let bestScore = -Infinity;
      let bestMove = null;
      const possibleMoves = getPossibleMoves(game, 2);

      possibleMoves.forEach((move) => {
        const clonedGame = simulateMove(cloneGame(game), move);
        const score = alphaBeta(clonedGame, 3, -Infinity, Infinity, false); // Adjust depth based on performance
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      });

      if (bestMove !== null) {
        // Apply the best move
        makeMove(game, setGame, game.pits[bestMove], true);
      }
    }
  };


  // This only runs when it's the computers turn
  useEffect(() => {
    // Check if it's the computer's turn
    if (game.currentPlayer === 2) {
    
      // Timeout to make it possible to see the computers move
      setTimeout(() => {
        handleComputerMove();
      }, 4000); 

    }

  }, [game]);

  const player1 = pits.slice(6, 7);
  const player1Pits = pits.slice(0, 6).toReversed();

  const player2 = pits.slice(13);
  const player2Pits = pits.slice(7, 13);

  const uiArray = [...player1, ...player1Pits, ...player2, ...player2Pits];


  return (
    <div className="flex flex-col items-center my-8">
      <h2 className={`text-lg font-semibold mb-4 ${game.currentPlayer === 1 ? "text-red-400" : "text-blue-400"}`}>Current Player: Player {game.currentPlayer}</h2>
      <div className="flex items-center">


        {/* Spiller 2's pits på øverste række */}
        <div className="grid grid-cols-8 gap-1">
          {uiArray.map((pit, index) => {

            const player1Style = "row-span-2 w-24 h-48 md:w-32 md:h-64 bg-red-400 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1";
            const player2Style = "row-span-2 w-24 h-48 md:w-32 md:h-64 bg-blue-400 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1";
            const pit1Style = "w-16 h-16 md:w-24 md:h-24 bg-red-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1";
            const pit2Style = "w-16 h-16 md:w-24 md:h-24 bg-blue-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1";

            let color: string;
            if (index === 0) color = player1Style;
            else if (index > 0 && index < 7) color = pit1Style;
            else if (index === 7) color = player2Style;
            else color = pit2Style;


            return (
              <div key={index} className={color}
                onClick={() => handlePitClick(pit)}>
                {pit.seeds}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};
export default KalahaGame;
