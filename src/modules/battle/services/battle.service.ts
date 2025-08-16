import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CharactersService } from "@src/modules/characters/services/characters.service";
import { CreateBattle } from "../dto/battle.dto";
import { Battle, BattleResults } from "../models/battle";
import { CharacterDetails } from "@src/modules/characters/dto/createCharacter.dto";

@Injectable()
export class BattleService {
  private battles: Map<string, BattleResults> = new Map();

  constructor(private readonly characterService: CharactersService) {}

  private recordBattle(battleResult: BattleResults) {
    this.battles.set(battleResult.battleId, battleResult);
  }

  private persistBattleResults(character: CharacterDetails) {
    this.characterService.update(character.id, character);
  }

  private startBattle(
    character1: CharacterDetails,
    character2: CharacterDetails
  ) {
    const battle = new Battle(character1, character2);
    this.persistBattleResults(character1);
    this.persistBattleResults(character2);

    this.recordBattle(battle.battleResults);

    return battle.battleResults;
  }

  create(createBattleDto: CreateBattle) {
    try {
      const character1 = this.characterService.findOne(
        createBattleDto.characterId
      );
      const character2 = this.characterService.findOne(
        createBattleDto.opponentId
      );

      const battleResults = this.startBattle(character1, character2);

      return this.battles.get(battleResults.battleId);
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }
}
