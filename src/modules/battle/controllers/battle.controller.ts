import { Body, Controller, Post } from "@nestjs/common";
import { BattleService } from "../services/battle.service";
import { CreateBattleDto } from "../dto/battle.dto";
import { LogMethod } from "@src/common/decorators/logMethod.decorator";

@Controller("battle")
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  @LogMethod()
  create(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }
}
