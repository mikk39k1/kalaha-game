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

let delay = 250;

export const makeMove = (game: Game, setGame: Dispatch<SetStateAction<Game>>, pit: Pit, initialMove: boolean = true) => {
    if (pit.isKalaha || isEmpty(pit)) {
        alert("stop med at klikke på tomt felt")
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
    setTimeout(() => {
        distributeSeeds(game, setGame, index, seedsToDistribute);
        setGame(game => ({...game, pits: [...game.pits]}));
    }, delay);
    
    // Reset delay for next round
    delay = 250;
    console.log("delay has been reset to 1000");
}

const distributeSeeds = (game: Game, setGame: Dispatch<SetStateAction<Game>>, startIndex: number, seeds: number): void => {

    let index = startIndex;
    let seedsToDistribute = seeds;

    const { currentPlayer, pits } = game;

    while (seedsToDistribute > 0) {
        index = (index + 1) % game.pits.length;
        delay += 250;
        console.log("Delay is", delay);

        // Skip opponent's Kalaha
        if ((currentPlayer === 1 && index === 13) || (currentPlayer === 2 && index === 6)) {
            continue;
        }

        pushSeeds(pits[index]);
        seedsToDistribute -= 1;
        setTimeout(() =>  {
            setGame(game => ({...game, pits: [...game.pits]}));
        }, delay);
    }

    const endPit = pits[index];
    delay += 250;

    if (endPit.seeds > 1 && !endPit.isKalaha) {
        setTimeout(() => {
            makeMove(game, setGame, endPit, false); 
        }, delay); 
    } else {
        setTimeout(()=> {
            setGame(game => ({...game, currentPlayer: game.currentPlayer = currentPlayer === 1 ? 2 : 1}));
        }, delay)
    }
};