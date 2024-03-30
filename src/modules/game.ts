import { createPits } from "./createPits";
import { Pit, isEmpty, popAllSeeds, pushSeeds } from "./pit";


interface Game {
    currentPlayer: 1 | 2;
    pits: Pit[];
}

export const createGame = (): Game => {
    const game: Game =
    {
        pits: createPits(),
        currentPlayer: 1,
    };

    return game;
}

export const makeMove = (game: Game, pit: Pit, initialMove: boolean = true) => {
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
    distributeSeeds(game, index, seedsToDistribute);
}

const distributeSeeds = (game: Game, startIndex: number, seeds: number): void => {

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
    }

    const endPit = pits[index];


    if (endPit.seeds > 1 && !endPit.isKalaha) makeMove(game, endPit, false);
    else game.currentPlayer = currentPlayer === 1 ? 2 : 1;
};