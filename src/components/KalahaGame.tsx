"use client"

import { createGame, makeMove } from '@/modules/game';
import { Pit } from '@/modules/pit';
import { useState } from 'react';

const KalahaGame = () => {
  const [game, setgame] = useState(() => createGame());
  const { pits } = game;
  

  const handlePitClick = (pit: Pit) => {
    makeMove(game, pit);
    setgame(game => ({...game, pits: [...game.pits]}));

  };

  const player1 = pits.slice(6, 7);
  const player1Pits = pits.slice(0, 6).toReversed();

  const player2 = pits.slice(13);
  const player2Pits = pits.slice(7, 13);

  const uiArray =[...player1, ...player1Pits, ...player2, ...player2Pits];


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
            if(index === 0) color = player1Style;
            else if(index > 0 && index < 7) color = pit1Style;
            else if(index === 7) color = player2Style;
            else color = pit2Style;


            return (
              <div key={index} className={color }
                onClick={() => handlePitClick(pit)}>
                {pit.seeds}
              </div>
            )
          })}
        </div>

        {/* Spiller 2's Kalaha pit på venstre side (Blå) */}
        {/* <div className="w-24 h-48 md:w-32 md:h-64 bg-blue-200 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(13)}>
          {pits[14].seeds}
        </div> */}

        {/* <div className='flex flex-col items-center'> */}

        {/* Spiller 2's pits på øverste række */}
        {/* <div className="flex flex-row-reverse">
            {pits.slice(8, 14).map((pit, index) => (
              <div key={index} className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(index + 8)}>
                {pit.seeds}
              </div>
            ))}
          </div> */}


        {/* <div className="w-4 h-4 mx-6"></div> */}

        {/* Spiller 1's pits På nederste række */}
        {/* <div className="flex flex-row">
            {pits.slice(1, 7).map((pit, index) => (
              <div key={index} className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(index + 1)}>
                {pit.seeds}
              </div>
            ))}
          </div> */}

        {/* </div> */}
        {/* Spiller 1's Kalaha pit til højre (Rød) */}
        {/* <div className="w-24 h-48 md:w-32 md:h-64 bg-red-200 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(7)}>
          {pits[7].seeds}
        </div> */}
      </div>
    </div>
  );
};
export default KalahaGame;
