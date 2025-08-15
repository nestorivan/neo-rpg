import { Injectable } from "@nestjs/common";
import { CharactersService } from "@src/modules/characters/services/characters.service";
import { JobsService } from "@src/modules/jobs/services/jobs.service";
import { CreateBattle } from "../dto/battle.dto";
import { Battle } from "../models/battle";
import { CharacterDetails } from "@src/modules/characters/dto/createCharacter.dto";

@Injectable()
export class BattleService {
  private battles: Map<string, { id: string; logs: string[] }> = new Map();

  constructor(private readonly characterService: CharactersService) {}

  private recordBattle(id: string, logs: string[]) {
    this.battles.set(id, { id, logs });
  }

  private persistBattleResults(character: CharacterDetails) {
    this.characterService.update(character.id, character);
  }

  private startBattle(
    character1: CharacterDetails,
    character2: CharacterDetails
  ) {
    const battle = new Battle(character1, character2, new JobsService());
    battle.initializeBattle();

    this.recordBattle(battle.battleId, battle.battleLogs);
    return battle.battleId;
  }

  create(createBattleDto: CreateBattle) {
    const character1 = this.characterService.findOne(
      createBattleDto.characterId
    );
    const character2 = this.characterService.findOne(
      createBattleDto.opponentId
    );

    const battleId = this.startBattle(character1, character2);

    this.persistBattleResults(character1);
    this.persistBattleResults(character2);

    return this.battles.get(battleId);
  }
}
