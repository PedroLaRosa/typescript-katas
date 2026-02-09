interface AccumulatedScore {
  totalCount: number;
  rollIndex: number;
}

class Game {
  private readonly maxScorePerFrame = 10;
  private rolls: number[] = [];

  constructor() {
    this.calculateScore = this.calculateScore.bind(this);
  }

  private isSpare(rollIndex: number) {
    const firstRoll = this.rolls[rollIndex] ?? 0;
    const secondRoll = this.rolls[rollIndex + 1] ?? 0;

    return firstRoll + secondRoll === this.maxScorePerFrame;
  }

  private isStrike(rollIndex: number) {
    return this.rolls[rollIndex] === this.maxScorePerFrame;
  }

  private calculateScore(accumulatedScore: AccumulatedScore) {
    if (this.isSpare(accumulatedScore.rollIndex)) {
      return {
        totalCount:
          accumulatedScore.totalCount +
          this.maxScorePerFrame +
          this.computeSpare(accumulatedScore.rollIndex),
        rollIndex: accumulatedScore.rollIndex + 2,
      };
    }

    if (this.isStrike(accumulatedScore.rollIndex)) {
      return {
        totalCount:
          accumulatedScore.totalCount +
          this.maxScorePerFrame +
          this.computeStrike(accumulatedScore.rollIndex),
        rollIndex: accumulatedScore.rollIndex + 1,
      };
    }

    return {
      totalCount:
        accumulatedScore.totalCount +
        this.sumOfBallsInFrame(accumulatedScore.rollIndex),
      rollIndex: accumulatedScore.rollIndex + 2,
    };
  }

  private computeSpare(rollIndex: number) {
    const bonusRoll = this.rolls[rollIndex + 2];
    if (bonusRoll !== undefined) return bonusRoll;

    // 10th frame spare with no bonus roll (e.g. "5/ 5/ ... 5/ 5/"): use first roll of frame as bonus
    return this.rolls[rollIndex] ?? 0;
  }

  private computeStrike(rollIndex: number) {
    const firstBonusRoll = this.rolls[rollIndex + 1] ?? 0;
    const secondBonusRoll = this.rolls[rollIndex + 2] ?? 0;

    return firstBonusRoll + secondBonusRoll;
  }

  private frames() {
    const numberOfFrames = 10;

    return Array.from({ length: numberOfFrames }).map((_, i) => i);
  }

  private sumOfBallsInFrame(rollIndex: number) {
    const firstRoll = this.rolls[rollIndex] ?? 0;
    const secondRoll = this.rolls[rollIndex + 1] ?? 0;

    return firstRoll + secondRoll;
  }

  roll(number: number) {
    this.rolls.push(number);
  }

  score(): number {
    return this.frames().reduce(this.calculateScore, {
      totalCount: 0,
      rollIndex: 0,
    }).totalCount;
  }
}

export { Game };
