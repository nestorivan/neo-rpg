import { Body, Controller, Post } from "@nestjs/common";
import { BattleService } from "../services/battle.service";
import { CreateBattleDto } from "../dto/battle.dto";

@Controller("battle")
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  create(@Body() createBattleDto: CreateBattleDto) {
    try {
      const result = this.battleService.create(createBattleDto);
      return {
        message: "Battle created successfully",
        data: result,
      };
    } catch (error) {
      return {
        message: error.message,
        data: null,
      };
    }
  }
}
