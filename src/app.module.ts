import { Module } from "@nestjs/common";
import { CharactersModule } from "./modules/characters/characters.module";
import { JobsModule } from "./modules/jobs/jobs.module";
import { BattleModule } from "./modules/battle/battle.module";

@Module({
  imports: [CharactersModule, JobsModule, BattleModule],
})
export class AppModule {}
