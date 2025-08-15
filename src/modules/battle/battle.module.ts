import { Module } from "@nestjs/common";
import { BattleController } from "./controllers/battle.controller";
import { BattleService } from "./services/battle.service";
import { JobsModule } from "../jobs/jobs.module";
import { CharactersModule } from "../characters/characters.module";

@Module({
  controllers: [BattleController],
  providers: [BattleService],
  imports: [CharactersModule, JobsModule],
})
export class BattleModule {}
