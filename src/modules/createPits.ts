import { Pit, createPit } from "@/modules/pit";

export const createPits = (): Pit[] => {
    let pits: Pit[] = [];
  
    // Sætter spiller 1's pits med 4 kugler i hver
    for (let i = 0; i < 6; i++) {
      pits.push(createPit({debugName: "player 1 pit: " + i, index: i }));
    }
    
    // Sætter spiller 1's Kalaha pit til index 7 med 0 kugler i
    pits.push(createPit({ isKalaha: true, debugName: "player 1", index: 6 }));

  
    // Sætter spiller 2's pits med 4 kugler i hver
    for (let i = 0; i < 6; i++) {
      pits.push(createPit({debugName: "player 2 pit: " + i, index: i + 7 }));
    }
  
    // Sætter spiller 2's Kalaha pit til index 0 med 0 kugler i
    pits.push(createPit({ isKalaha: true, debugName: "Player 2", index: 13 }));
  
    return pits;
  };