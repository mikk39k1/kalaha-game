"use client"

import { useState } from 'react';

type Pit = {
  seeds: number;
  isKalaha: boolean;
};


const initializePits = (): Pit[] => {
  let pits: Pit[] = [];
  
  for (let i = 0; i < 14; i++) {
    pits.push({ seeds: i % 7 === 0 ? 0 : 4, isKalaha: i % 7 === 0 });
  }
  return pits;
};

const KalahaGame = () => {
  const [pits, setPits] = useState<Pit[]>(initializePits());
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const distributeSeeds = (startIndex: number, seeds: number): void => {
    let index = startIndex;
    let seedsToDistribute = seeds;
    while (seedsToDistribute > 0) {
      index = (index + 1) % pits.length;

      if ((currentPlayer === 1 && index === 7) || (currentPlayer === 2 && index === 0)) {
        continue;
      }
      pits[index].seeds += 1;
      seedsToDistribute -= 1;
    }


    if (!pits[index].isKalaha && pits[index].seeds === 1 && Math.floor(index / 7) === currentPlayer - 1) {
      let oppositeIndex = 12 - index;
      let capturedSeeds = pits[oppositeIndex].seeds + 1; 
      pits[oppositeIndex].seeds = 0;
      pits[index].seeds = 0; 
      let kalahaIndex = currentPlayer === 1 ? 6 : 13;
      pits[kalahaIndex].seeds += capturedSeeds;
    }

 
    if (!((currentPlayer === 1 && index === 6) || (currentPlayer === 2 && index === 13))) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
    
    setPits([...pits]);
  };

  const handlePitClick = (index: number) => {
    if (pits[index].isKalaha || pits[index].seeds === 0) {
      return;
    }
 
    if ((currentPlayer === 1 && index >= 7) || (currentPlayer === 2 && index < 7)) {
      return;
    }

    const seedsToDistribute = pits[index].seeds;
    pits[index].seeds = 0;
    distributeSeeds(index, seedsToDistribute);
  };

  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-lg font-semibold mb-4">Current Player: Player {currentPlayer}</h2>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center mr-8">
          <span className="text-sm font-medium mb-2">Player 2's Pits</span>
          {pits.slice(1, 7).map((pit, index) => (
            <div key={index} className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(index + 1)}>
              {pit.seeds}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-col items-center mr-2">
            <span className="text-sm font-medium mb-2">Player 2's Kalaha</span>
            <div className="w-24 h-48 md:w-32 md:h-64 bg-blue-200 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(0)}>
              {pits[0].seeds}
            </div>
          </div>
          <div className="flex flex-col items-center ml-2">
            <span className="text-sm font-medium mb-2">Player 1's Kalaha</span>
            <div className="w-24 h-48 md:w-32 md:h-64 bg-red-200 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(7)}>
              {pits[7].seeds}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ml-8">
          <span className="text-sm font-medium mb-2">Player 1's Pits</span>
          {pits.slice(8, 14).map((pit, index) => (
            <div key={index} className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(index + 8)}>
              {pit.seeds}
            </div>
          )).reverse()}
        </div>
      </div>
    </div>
  );
};
export default KalahaGame;
