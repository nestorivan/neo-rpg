import { JobType } from "@src/common/types/jobs";
import { PlayerAttribute } from "@src/common/types/playerAttributes";
import { Battle } from "@src/modules/battle/models/battle";
import { CharacterDetailsDto } from "@src/modules/characters/dto/createCharacter.dto";

const character1: CharacterDetailsDto = {
  id: 2,
  name: "thiefman",
  job: JobType.Thief,
  alive: true,
  hp: 15,
  currentHp: 15,
  strength: 4,
  dexterity: 10,
  intelligence: 4,
  attackModifier: [
    {
      key: PlayerAttribute.Strength,
      value: 25,
    },
    {
      key: PlayerAttribute.Dexterity,
      value: 100,
    },
    {
      key: PlayerAttribute.Intelligence,
      value: 25,
    },
  ],
  speedModifier: [
    {
      key: PlayerAttribute.Dexterity,
      value: 80,
    },
  ],
};

const character2: CharacterDetailsDto = {
  id: 3,
  name: "warriorman",
  job: JobType.Warrior,
  alive: true,
  hp: 20,
  currentHp: 20,
  strength: 10,
  dexterity: 5,
  intelligence: 5,
  attackModifier: [
    {
      key: PlayerAttribute.Strength,
      value: 80,
    },
    {
      key: PlayerAttribute.Dexterity,
      value: 20,
    },
  ],
  speedModifier: [
    {
      key: PlayerAttribute.Dexterity,
      value: 60,
    },
    {
      key: PlayerAttribute.Intelligence,
      value: 20,
    },
  ],
};

describe("Battle", () => {
  let opponent1: CharacterDetailsDto;
  let opponent2: CharacterDetailsDto;
  beforeEach(() => {
    opponent1 = { ...character1 };
    opponent2 = { ...character2 };
  });
  it("should run a fight between two characters", () => {
    const battle = new Battle(opponent1, opponent2);
    battle.initializeBattle();
    expect(battle.battleId).not.toBeNull();
    expect(battle.battleLogs).toBeInstanceOf(Array);
  });

  it("should end the battle if one of the characters is dead", () => {
    const battle = new Battle(opponent1, opponent2);
    battle.initializeBattle();

    const isAnyCharacterDead = !opponent1.alive || !opponent2.alive;
    expect(isAnyCharacterDead).toBe(true);
  });

  it("logs should container the battle winner", () => {
    const battle = new Battle(opponent1, opponent2);
    battle.initializeBattle();

    const hasWinner = battle.battleLogs.some((log) =>
      log.toLowerCase().includes("wins the battle!")
    );

    expect(hasWinner).toBe(true);
  });

  it("should include at least one round of battle", () => {
    const battle = new Battle(opponent1, opponent2);
    battle.initializeBattle();

    const hasRounds = battle.battleLogs.some((log) =>
      log.toLowerCase().includes("will begin this round.")
    );

    expect(hasRounds).toBe(true);
  });

  it("defeated character should have 0 hp remaining", () => {
    const battle = new Battle(opponent1, opponent2);
    battle.initializeBattle();

    const defeatedPlayer = !opponent1.alive ? opponent1 : opponent2;

    expect(defeatedPlayer.currentHp).toBe(0);
  });

  it("alive character should have hp remaining", () => {
    const battle = new Battle(opponent1, opponent2);
    battle.initializeBattle();

    const alivePlayer = opponent1.alive ? opponent1 : opponent2;

    expect(alivePlayer.currentHp).not.toBe(0);
  });
});
