import { Module } from "@nestjs/common";
import { CharactersController } from "./controllers/characters.controller";
import { CharactersService } from "./services/characters.service";
import { JobsModule } from "../jobs/jobs.module";

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
  imports: [JobsModule],
})
export class CharactersModule {}
