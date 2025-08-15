import { Body, Controller, Get, Post } from "@nestjs/common";
import { BattleService } from "../services/battle.service";
import { CreateBattleDto } from "../dto/battle.dto";

@Controller("battle")
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  create(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }
}
