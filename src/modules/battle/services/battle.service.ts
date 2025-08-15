import { Injectable } from "@nestjs/common";
import { CharactersService } from "@src/modules/characters/services/characters.service";
import { JobsService } from "@src/modules/jobs/services/jobs.service";
import { CreateBattleSchema } from "../dto/battle.dto";
import { z } from "zod";
import { Battle } from "../models/battle";

@Injectable()
export class BattleService {
  private battles: Map<string, string[]> = new Map();

  constructor(private readonly characterService: CharactersService) {}

  create(createBattleDto: z.infer<typeof CreateBattleSchema>) {
    const character1 = this.characterService.findOne(
      createBattleDto.characterId
    );
    const character2 = this.characterService.findOne(
      createBattleDto.opponentId
    );

    const jobService = new JobsService();

    const battle = new Battle(character1, character2, jobService);

    this.battles.set(battle.battleId, battle.battleLogs);

    return battle.battleLogs;
  }
}
