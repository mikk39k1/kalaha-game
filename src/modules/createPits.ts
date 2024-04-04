import { Pit, createPit } from "@/modules/pit";

export const createPits = (): Pit[] => {
    let pits: Pit[] = [];
  
    // Creates player 1 pitstack with 4 balls in each
    for (let i = 0; i < 6; i++) {
      pits.push(createPit({debugName: "player 1 pit: " + i, index: i }));
    };
    
    // Creates player 1 kalaha
    pits.push(createPit({ isKalaha: true, debugName: "player 1", index: 6 }));

  
    // Creates player 2 pitstack with 4 balls in each
    for (let i = 0; i < 6; i++) {
      pits.push(createPit({debugName: "player 2 pit: " + i, index: i + 7 }));
    }
  
    // Creates player 2 kalaha
    pits.push(createPit({ isKalaha: true, debugName: "Player 2", index: 13 }));
  
    return pits;
  };