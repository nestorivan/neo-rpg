import { CharacterDetails } from "@src/modules/characters/dto/createCharacter.dto";
import { v4 as uuid } from "uuid";

export class Battle {
  battleId: string;
  private opponent1: CharacterDetails;
  private opponent2: CharacterDetails;
  private battleLog: string[] = [];

  constructor(opponent1: CharacterDetails, opponent2: CharacterDetails) {
    this.battleId = uuid();
    this.opponent1 = opponent1;
    this.opponent2 = opponent2;
  }

  get battleLogs() {
    return this.battleLog;
  }

  private writeBattleLog(battleLog: string) {
    this.battleLog.push(battleLog);
  }

  initializeBattle() {
    try {
      if (!this.checkIfCharactersIsAlive(this.opponent1)) {
        throw new Error(`Character ${this.opponent1.name} is dead`);
      }

      if (!this.checkIfCharactersIsAlive(this.opponent2)) {
        throw new Error(`Character ${this.opponent2.name} is dead`);
      }

      this.writeBattleLog(
        `Battle between ${this.opponent1.name} (${this.opponent1.job}) - ${this.opponent1.currentHp} HP and ${this.opponent2.name} (${this.opponent2.job}) - ${this.opponent2.currentHp} HP begins!`
      );

      this.battleLoop();
    } catch (error) {
      return {
        message: "Something went wrong with the battle initialization",
        data: (error as Error).message,
      };
    }
  }

  private checkIfCharactersIsAlive(character: CharacterDetails): boolean {
    if (character.currentHp <= 0) {
      return false;
    }

    return true;
  }

  private getBattleOrder(): [CharacterDetails, CharacterDetails] {
    const opponent1SpeedModifier = this.calculateCharacterSpeedModifier(
      this.opponent1
    );
    const opponent2SpeedModfier = this.calculateCharacterSpeedModifier(
      this.opponent2
    );

    let opponent1RandomSpeed = this.generateRandomSpeedModifier(
      opponent1SpeedModifier
    );
    let opponent2RandomSpeed = this.generateRandomSpeedModifier(
      opponent2SpeedModfier
    );

    // we want to reroll the speed modifier until speeds are different
    while (opponent1RandomSpeed === opponent2RandomSpeed) {
      opponent1RandomSpeed = this.generateRandomSpeedModifier(
        opponent1SpeedModifier
      );
      opponent2RandomSpeed = this.generateRandomSpeedModifier(
        opponent2SpeedModfier
      );
    }

    if (opponent1RandomSpeed > opponent2RandomSpeed) {
      this.writeBattleLog(
        `${this.opponent1.name} ${opponent1RandomSpeed} speed was faster than ${this.opponent2.name} ${opponent2RandomSpeed} speed and will begin this round.`
      );
      return [this.opponent1, this.opponent2];
    }

    this.writeBattleLog(
      `${this.opponent2.name} ${opponent2RandomSpeed} speed was faster than ${this.opponent1.name} ${opponent1RandomSpeed} speed and will begin this round.`
    );
    return [this.opponent2, this.opponent1];
  }

  private calculateCharacterSpeedModifier(character: CharacterDetails) {
    let speedModifier = 0;

    character.speedModifier.forEach((modifier) => {
      const { key, value } = modifier;
      const characterAttribute = character[key];

      const calculatedAttributeSpeedModifier =
        characterAttribute * (value / 100);

      speedModifier += calculatedAttributeSpeedModifier;
    });

    return speedModifier;
  }

  private generateRandomSpeedModifier(speedModifier: number) {
    const randomModifier = Math.floor(Math.random() * speedModifier);
    return randomModifier;
  }

  private calculateCharacterAttackModifier(character: CharacterDetails) {
    let attackModifier = 0;

    character.attackModifier.forEach((modifier) => {
      const { key, value } = modifier;
      const characterAttribute = character[key];

      const calculatedAttributeAttackModifier =
        characterAttribute * (value / 100);

      attackModifier += calculatedAttributeAttackModifier;
    });

    return attackModifier;
  }

  private battleLoop() {
    // we check each loop if any if the characters is dead
    while (
      this.checkIfCharactersIsAlive(this.opponent1) &&
      this.checkIfCharactersIsAlive(this.opponent2)
    ) {
      // we start the attack phase with the order we got from the getBattleOrder method
      const [attacker, defender] = this.getBattleOrder();
      this.attackPhase(attacker, defender);
      if (this.checkIfAnyCharacterIsDead()) {
        break;
      }
      this.attackPhase(defender, attacker);
      if (this.checkIfAnyCharacterIsDead()) {
        break;
      }
    }
  }

  private checkIfAnyCharacterIsDead() {
    if (
      !this.checkIfCharactersIsAlive(this.opponent1) ||
      !this.checkIfCharactersIsAlive(this.opponent2)
    ) {
      return true;
    }
    return false;
  }

  private attackPhase(attacker: CharacterDetails, defender: CharacterDetails) {
    this.calculeDamage(attacker, defender);
  }

  private calculateRandomDamage(attackModifier: number): number {
    return Math.floor(Math.random() * attackModifier);
  }

  private calculeDamage(
    attacker: CharacterDetails,
    defender: CharacterDetails
  ) {
    const attackerAttackModifier =
      this.calculateCharacterAttackModifier(attacker);

    const randomDamage = this.calculateRandomDamage(attackerAttackModifier);

    this.applyDamage(attacker, defender, randomDamage);
  }

  private applyDamage(
    attacker: CharacterDetails,
    defender: CharacterDetails,
    damage: number
  ) {
    const defenderHp = defender.currentHp;
    const hpPointsAfterDamage = defenderHp - damage;

    if (hpPointsAfterDamage <= 0) {
      defender.currentHp = 0;
      this.setCharacterAsDead(defender);
      this.setBattleWinner(attacker);
      return;
    }

    defender.currentHp = hpPointsAfterDamage;
    this.writeBattleLog(
      `${attacker.name} attacks ${defender.name} for ${damage}, ${defender.name} has ${hpPointsAfterDamage} HP remaining.`
    );
  }

  private setCharacterAsDead(character: CharacterDetails) {
    character.alive = false;
  }

  private setBattleWinner(character: CharacterDetails) {
    this.writeBattleLog(
      `${character.name} wins the battle! ${character.name} still has ${character.currentHp} HP remaining!`
    );
  }
}
