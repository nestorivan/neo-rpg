import { Injectable } from "@nestjs/common";
import { JobType } from "src/common/types/jobs";
import { PlayerAttribute } from "src/common/types/playerAttributes";

interface JobDescription {
  hp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attackModifier: Map<PlayerAttribute, number>;
  speedModifier: Map<PlayerAttribute, number>;
}

@Injectable()
export class JobsService {
  // this is a representation of a db table
  private jobs: Record<JobType, JobDescription> = {
    [JobType.Warrior]: {
      hp: 20,
      strength: 10,
      dexterity: 5,
      intelligence: 5,
      attackModifier: new Map([
        [PlayerAttribute.Strength, 80],
        [PlayerAttribute.Dexterity, 20],
      ]),
      speedModifier: new Map([
        [PlayerAttribute.Dexterity, 60],
        [PlayerAttribute.Intelligence, 20],
      ]),
    },
    [JobType.Thief]: {
      hp: 15,
      strength: 4,
      dexterity: 10,
      intelligence: 4,
      attackModifier: new Map([
        [PlayerAttribute.Strength, 25],
        [PlayerAttribute.Dexterity, 100],
        [PlayerAttribute.Intelligence, 25],
      ]),
      speedModifier: new Map([[PlayerAttribute.Dexterity, 80]]),
    },
    [JobType.Mage]: {
      hp: 12,
      strength: 5,
      dexterity: 6,
      intelligence: 10,
      attackModifier: new Map([
        [PlayerAttribute.Strength, 20],
        [PlayerAttribute.Dexterity, 20],
        [PlayerAttribute.Intelligence, 120],
      ]),
      speedModifier: new Map([
        [PlayerAttribute.Dexterity, 40],
        [PlayerAttribute.Strength, 10],
      ]),
    },
  };

  getJobAttributes(job: JobType) {
    return this.jobs[job];
  }
}
