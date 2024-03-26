export class PitStack {
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