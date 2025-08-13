import { Module } from "@nestjs/common";
import { JobsService } from "./services/jobs.service";

@Module({
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
