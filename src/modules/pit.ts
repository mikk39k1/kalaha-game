export interface Pit {
  seeds: number;
  isKalaha: boolean;  debugName?: string;
  index: number;
}

interface CreatePitProps
{
  isKalaha?: boolean
  debugName?: string;
  index: number;
}

export function createPit({ isKalaha, debugName, index }: CreatePitProps = {}): Pit {
  return {
    seeds: isKalaha ? 0 : 4,
    isKalaha: isKalaha ?? false,
    debugName,
    index
  }
}

export function pushSeeds(pitStack: Pit, n = 1) {
  pitStack.seeds += n;
}

export function popAllSeeds(pitStack: Pit) {
  const seeds = pitStack.seeds;
  pitStack.seeds = 0;
  return seeds;
}

export function isEmpty(pitStack: Pit) {
  return pitStack.seeds === 0;
}
// export class PitStack {
//   constructor(public seeds = 0, public isKalaha = false) { }

//   pushSeeds(n = 1) {
//     this.seeds += n;
//   }

//   popAllSeeds() {
//     const seeds = this.seeds;
//     this.seeds = 0;
//     return seeds;
//   }

//   isEmpty() {
//     return this.seeds === 0;
//   }
// }