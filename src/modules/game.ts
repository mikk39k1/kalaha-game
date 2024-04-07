import { Dispatch, SetStateAction } from "react";
import { createPits } from "./createPits";
import { Pit, isEmpty, popAllSeeds, pushSeeds } from "./pit";


interface Game {
    pits: Pit[];
    currentPlayer: 1 | 2;
}

export const createGame = (): Game => {
    const game: Game =
    {
        pits: createPits(),
        currentPlayer: 1,
    };

    return game;
}


export const makeMove = (game: Game, setGame: Dispatch<SetStateAction<Game>>, pit: Pit, initialMove: boolean = true) => {
    if (pit.isKalaha || isEmpty(pit)) {
        alert("stop med at klikke på tomt felt")
        return;
    }

    if ((game.currentPlayer === 1 && pit.index > 6) || (game.currentPlayer === 2 && pit.index < 7)) {
        console.log(`It's not Player ${game.currentPlayer}'s turn.`);
        return;
    }

    const { currentPlayer } = game;
    const { index } = pit;

    // Check if the player is trying to move the opponent's seeds
    if (initialMove && ((currentPlayer === 1 && (index > 6)) || (currentPlayer === 2 && (index < 7)))) {
        alert("stop med at klikke den anden spillers felter")
        return;
    }

    const seedsToDistribute = popAllSeeds(pit);
    
    distributeSeeds(game, setGame, index, seedsToDistribute);
    setGame(game => ({...game, pits: [...game.pits]}));

}

export function cloneGame(game: Game) {
    return {
      ...game,
      pits: game.pits.map(pit => ({...pit})),
    };
  }

  export function evaluateGameState(game: Game) {
    // AI Is player 2
    const playerKalaha = game.pits[6].seeds;
    const aiKalaha = game.pits[13].seeds;
    
    return aiKalaha - playerKalaha;
  }


  export function getPossibleMoves(game: Game, currentPlayer: number) {
    // Assuming player 1's pits are 0-5 and player 2's are 7-12
    const startIdx = currentPlayer === 1 ? 0 : 7;
    const endIdx = currentPlayer === 1 ? 6 : 13;
  
    return game.pits
      .filter((pit, idx) => idx >= startIdx && idx < endIdx && pit.seeds > 0)
      .map(pit => pit.index);
  }

  export function simulateMove(game: Game, pitIndex: number): Game {
    let clonedGame = cloneGame(game); // Ensure we're working with a clone to not affect actual game state
    let pit = clonedGame.pits[pitIndex];

    // Remove all seeds from the selected pit
    let seedsToDistribute = pit.seeds;
    pit.seeds = 0; 

    let currentIndex = pitIndex;
    while (seedsToDistribute > 0) {
        currentIndex = (currentIndex + 1) % clonedGame.pits.length;

        // Skip opponent's Kalaha based on currentPlayer
        if ((clonedGame.currentPlayer === 1 && currentIndex === 13) ||
            (clonedGame.currentPlayer === 2 && currentIndex === 6)) {
            continue;
        }

        clonedGame.pits[currentIndex].seeds += 1;
        seedsToDistribute -= 1;
    }

    // Switch player if the last seed did not land in the current player's Kalaha
    if (!((clonedGame.currentPlayer === 1 && currentIndex === 6) ||
        (clonedGame.currentPlayer === 2 && currentIndex === 13))) {
        clonedGame.currentPlayer = clonedGame.currentPlayer === 1 ? 2 : 1;
    }

    return clonedGame; // Return the modified state
}



  export function alphaBeta(game: Game, depth: number, alpha: number, beta: number, isMaximizingPlayer: boolean) {
    if (depth === 0) {
      return evaluateGameState(game);
    }
  
    const moves = getPossibleMoves(game, isMaximizingPlayer ? 2 : 1);
  
    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        const newGame = simulateMove(cloneGame(game), move);
        const evaluation = alphaBeta(newGame, depth - 1, alpha, beta, false);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Alpha cut-off
      }
      return maxEval;

    } else {
      let minEval = Infinity;
      for (const move of moves) {
        const newGame = simulateMove(cloneGame(game), move);
        const evaluation = alphaBeta(newGame, depth - 1, alpha, beta, true);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Beta cut-off
      }
      return minEval;
    }
  }

const distributeSeeds = (game: Game, setGame: Dispatch<SetStateAction<Game>>, startIndex: number, seeds: number): void => {

    let index = startIndex;
    let seedsToDistribute = seeds;

    const { currentPlayer, pits } = game;

    while (seedsToDistribute > 0) {
        index = (index + 1) % game.pits.length;
       
        // Skip opponent's Kalaha
        if ((currentPlayer === 1 && index === 13) || (currentPlayer === 2 && index === 6)) {
            continue;
        }

        pushSeeds(pits[index]);
        seedsToDistribute -= 1;
        
        setGame(game => ({...game, pits: [...game.pits]}));
       
    }

    const endPit = pits[index];


    if (endPit.seeds > 1 && !endPit.isKalaha) {
       
        makeMove(game, setGame, endPit, false); 
       
    } else {
    
        setGame(game => ({...game, currentPlayer: game.currentPlayer = currentPlayer === 1 ? 2 : 1}));
        
    }
};