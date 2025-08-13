import { Module } from "@nestjs/common";
import { CharactersModule } from "./modules/characters/characters.module";
import { JobsModule } from "./modules/jobs/jobs.module";
import { BattleModule } from "./modules/battle/battle.module";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

@Module({
  imports: [CharactersModule, JobsModule, BattleModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
