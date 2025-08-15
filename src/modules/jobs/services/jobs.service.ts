import { Injectable } from "@nestjs/common";
import { JobType } from "@src/common/types/jobs";
import { JobDescription } from "../models/jobDescription";
import { JobsTable } from "../constants/jobsStats";

@Injectable()
export class JobsService {
  // this is a representation of a db table
  private jobs: Record<JobType, JobDescription> = JobsTable;

  getJobAttributes(job: JobType) {
    return this.jobs[job];
  }
}
