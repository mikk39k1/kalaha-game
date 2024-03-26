"use client"

import { useState } from 'react';

// Represents a single pit in the game as a stack of seeds
class PitStack {
  constructor(public seeds = 0, public isKalaha = false) { }

  pushSeeds(n = 1) {
    this.seeds += n;
  }

  popAllSeeds() {
    const seeds = this.seeds;
    this.seeds = 0;
    return seeds;
  }

 
  isEmpty() {
    return this.seeds === 0;
  }
}


const initializePits = (): PitStack[] => {
  let pits = [];

  // Sætter spiller 2's Kalaha pit til index 0 med 0 kugler i
  pits.push(new PitStack(0, true));

  // Sætter spiller 1's pits med 4 kugler i hver
  for (let i = 0; i < 6; i++) {
    pits.push(new PitStack(4, false));
  }

  // Sætter spiller 1's Kalaha pit til index 7 med 0 kugler i
  pits.push(new PitStack(0, true));


  // Sætter spiller 2's pits med 4 kugler i hver
  for (let i = 0; i < 6; i++) {
    pits.push(new PitStack(4, false));
  }


  // Sætter spiller 2's Kalaha pit til index 13 med 0 kugler i
  pits.push(new PitStack(0, true));

  return pits;
};



const KalahaGame = () => {
  const [pits, setPits] = useState<PitStack[]>(initializePits());
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const distributeSeeds = (startIndex: number, seeds: number): void => {
    let index = startIndex;
    let seedsToDistribute = seeds;
    while (seedsToDistribute > 0) {
      index = (index + 1) % pits.length;

      // Skip opponent's Kalaha
      if ((currentPlayer === 1 && index === 13) || (currentPlayer === 2 && index === 0)) {
        continue;
      }
      pits[index].pushSeeds();
      seedsToDistribute -= 1;
    }

    // Check if the last seed was placed in an empty pit on the player's side
    if (!pits[index].isKalaha && pits[index].seeds === 1 && Math.floor(index / 7) === currentPlayer - 1) {
      let oppositeIndex = 12 - index;
      let capturedSeeds = pits[oppositeIndex].popAllSeeds() + pits[index].popAllSeeds(); 
      let kalahaIndex = currentPlayer === 1 ? 6 : 13;
      pits[kalahaIndex].pushSeeds(capturedSeeds);
    }

    // Switch player if the last seed was not placed in the player's Kalaha
    if (!((currentPlayer === 1 && index === 6) || (currentPlayer === 2 && index === 13))) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    setPits([...pits]);
  };

  const handlePitClick = (index: number) => {
    if (pits[index].isKalaha || pits[index].isEmpty()) {
      return;
    }

    // Check if the player is trying to move the opponent's seeds
    if ((currentPlayer === 1 && (index > 6)) || (currentPlayer === 2 && (index < 7))) {
      return;
    }

    const seedsToDistribute = pits[index].popAllSeeds();
    distributeSeeds(index, seedsToDistribute);
  };


  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-lg font-semibold mb-4">Current Player: Player {currentPlayer}</h2>
      <div className="flex items-center">

        {/* Spiller 2's Kalaha pit på venstre side (Blå) */}
        <div className="w-24 h-48 md:w-32 md:h-64 bg-blue-200 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(13)}>
          {pits[14].seeds}
        </div>

        <div className='flex flex-col items-center'>

          {/* Spiller 2's pits på øverste række */}
          <div className="flex flex-row-reverse">
            {pits.slice(8, 14).map((pit, index) => (
              <div key={index} className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(index + 8)}>
                {pit.seeds}
              </div>
            ))}
          </div>

      
          <div className="w-4 h-4 mx-6"></div>

          {/* Spiller 1's pits På nederste række */}
          <div className="flex flex-row">
            {pits.slice(1, 7).map((pit, index) => (
              <div key={index} className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(index + 1)}>
                {pit.seeds}
              </div>
            ))}
          </div>

        </div>
        {/* Spiller 1's Kalaha pit til højre (Rød) */}
        <div className="w-24 h-48 md:w-32 md:h-64 bg-red-200 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer m-1" onClick={() => handlePitClick(7)}>
          {pits[7].seeds}
        </div>
      </div>
    </div>
  );
};
export default KalahaGame;
