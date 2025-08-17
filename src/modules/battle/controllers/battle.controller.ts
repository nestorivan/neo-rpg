import { Body, Controller, Post } from "@nestjs/common";
import { BattleService } from "../services/battle.service";
import { CreateBattleDto } from "../dto/battle.dto";
import { LogMethod } from "@src/common/decorators/logMethod.decorator";
import { ApiBody, ApiOperation } from "@nestjs/swagger";

@Controller("battle")
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new battle",
    description:
      "Starts a new battle between two characters based on the provided details. Requires both character IDs in the request body.",
  })
  @ApiBody({ type: CreateBattleDto })
  @LogMethod()
  create(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }
}
